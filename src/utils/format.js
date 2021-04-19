import set from 'lodash.set'
import memoize from 'lodash.memoize'
import removeAccent from 'lodash.deburr'
import clone from 'lodash.clonedeep'

import { COMMON, STATS, PETS, MOUNTS } from '../constants'

import {
    isStat,
    isPassif,
    getWeaponCharacType,
    getStatSrcImg,
    getDefaultPassiveImg,
} from './stats'
import { findKey } from './select'

export const validate = (type, translationName, translationsObj = {}) => {
    if (!translationsObj[translationName]) return false
    if (translationName === findKey(type, translationsObj)) return true
    return false
}

export function replaceDeep(values, match, newValue) {
    let copy = clone(values)

    if (!(copy instanceof Object)) {
        return copy
    }

    Object.entries(values).forEach(([key, value]) => {
        if ([undefined, match].flat().includes(value)) {
            copy[key] = newValue
        } else if (value instanceof Object) {
            if (
                Object.values(value).some(
                    e => ![undefined, match].flat().includes(e)
                )
            ) {
                copy[key] = replaceDeep(value, match, newValue)
            } else {
                copy[key] = newValue
            }
        } else {
            copy[key] = value
        }
    })

    return copy
}

export const clean = memoize(
    values => replaceDeep(values, ['', null], undefined),
    values => JSON.stringify(values)
)

export const toLowerCaseNFC = memoize(string =>
    string.normalize('NFC').toLowerCase()
)

export const toURLValid = memoize(string =>
    toLowerCaseNFC(removeAccent(string).replace(/\W+/g, '-'))
)

export const translateType = (type, translations, lang) => {
    const validType = toURLValid(type)

    const found = Object.values(translations)
        .map(translation => {
            if (
                toURLValid(translation.fr) === validType ||
                toURLValid(translation.en) === validType
            ) {
                if (['fr', 'en'].includes(lang.toLowerCase()))
                    return translation[lang]
                if (toURLValid(translation.fr) === validType)
                    return translation.en
                if (toURLValid(translation.en) === validType)
                    return translation.fr
            }
        })
        .filter(e => !!e)
    if (found.length > 0) return found[0]
}

function formatCharacteristic(stat) {
    const characteristicsArray = []

    const { name, type, ...statOnly } = stat
    const [statName, value] = Object.entries(statOnly)?.[0] || []

    switch (name) {
        case '0': {
            if (statName !== 'PA') {
                console.log('Not expected', { statName }, 'instead of PA')
            }
            const costAP = value.replace(/(\d+)\s\((\d).*\)/, '$1')
            const timesPerRound = value.replace(/(\d+)\s\((\d).*\)/, '$2')
            characteristicsArray.push({
                value: parseInt(costAP, 10),
                type: STATS.getKey(STATS.WEAPONS_AP_COST),
            })
            characteristicsArray.push({
                value: parseInt(timesPerRound, 10),
                type: STATS.getKey(STATS.WEAPONS_TIMES_PER_ROUND),
            })
            break
        }
        case '1': {
            if (statName !== 'Portée') {
                console.log('Not expected', { statName }, 'instead of Portée')
            }
            characteristicsArray.push({
                value: parseInt(value, 10),
                type: STATS.getKey(STATS.WEAPONS_RANGE),
            })
            break
        }
        case '2': {
            const regex = /\d+\/(\d+)(?:\s\(\+(\d+).*\))?/
            if (statName !== 'CC') {
                console.log('Not expected', { statName }, 'instead of CC')
            }
            const rate = value.replace(regex, '$1')

            characteristicsArray.push({
                value: parseInt(rate, 10),
                type: STATS.getKey(STATS.WEAPONS_CRIT_DAMAGES),
            })

            if (value.match(regex)?.[2]) {
                const bonusDamages = value.replace(regex, '$2')
                characteristicsArray.push({
                    value: parseInt(bonusDamages, 10),
                    type: STATS.getKey(STATS.WEAPONS_CRITICAL),
                })
            }

            break
        }
        default: {
            switch (statName) {
                case 'PA':
                    return formatCharacteristic({ name: '0', ...statOnly })

                case 'Portée':
                    return formatCharacteristic({ name: '1', ...statOnly })

                case 'CC':
                    return formatCharacteristic({ name: '2', ...statOnly })

                default:
                    console.log('unexpected:', { name, statOnly })
            }
        }
    }

    return characteristicsArray
}

export const formatCharacteristics = toFormat => {
    const toReturn = toFormat

    if (toFormat?.characteristics) {
        const characteristicsArray = []

        toFormat?.characteristics?.forEach(stat =>
            characteristicsArray.push(formatCharacteristic(stat))
        )

        toReturn.characteristics = characteristicsArray.flat()
    }

    return toReturn
}

export const formatStatistics = toFormat => {
    const toReturn = toFormat
    const statisticsArray = []
    const passivesArray = []

    if (toFormat?.statistics?.length > 0) {
        toFormat.statistics.forEach((stat, index) => {
            let [name, values] = Object.entries(stat)?.[0] || []
            let value =
                typeof values === 'string'
                    ? { value: values }
                    : {
                          min: values?.min || values?.max,
                          value: values?.max || values?.min,
                          max: values?.max || values?.min,
                      }

            let type = STATS.getKey(name) || undefined
            if (!type) {
                const withoutNumbers = name?.replace(/-?\d+/, '')
                const numbers = name?.match(/(<value>-?\d+)/)?.groups?.value

                const typeWithoutNumbers = STATS.getKey(withoutNumbers)

                if (typeWithoutNumbers) {
                    type = typeWithoutNumbers
                    name = withoutNumbers
                    if (!value) {
                        value = {
                            min: parseInt(numbers, 10),
                            value: parseInt(numbers, 10),
                            max: parseInt(numbers, 10),
                        }
                    }
                }
            }

            if (name.match(/^\(.*?\)$/)) {
                const finalName = name.replace(/^\((.*?)\)$/, '$1')
                const type = getWeaponCharacType(finalName)

                if (type) {
                    toReturn?.characteristics?.push({
                        type,
                        // no "value" here, it's not a statistic
                        min: value?.min,
                        max: value?.max,
                    })
                } else if (isStat(type)) {
                    statisticsArray.push({
                        type,
                        ...value,
                    })
                } else if (isPassif(type)) {
                    passivesArray.push({
                        type,
                        name: type ? undefined : name,
                        ...value,
                    })
                }
            } else if (name !== 'Compatible avec : 0') {
                if (isStat(type)) {
                    statisticsArray.push({
                        type,
                        ...value,
                        min:
                            PETS.getKey(toReturn?.type) ||
                            MOUNTS.getKey(toReturn?.type)
                                ? 0
                                : value?.min,
                    })
                } else if (isPassif(type)) {
                    passivesArray.push({
                        type,
                        name: type ? undefined : name,
                        ...value,
                    })
                }
            }
        })
    }

    toReturn.statistics = statisticsArray
    toReturn.passives = passivesArray

    return toReturn
}

export const formatSetBonus = toFormat => {
    const toReturn = toFormat

    if (toFormat?.bonus?.length > 0) {
        toFormat.bonus.forEach((bonus, index) => {
            if (bonus?.statistics?.length > 0) {
                const statisticsArray = []
                const passivesArray = []
                bonus.statistics.forEach((stat, statIndex) => {
                    const [name, values] = Object.entries(stat)[0] || []
                    const value =
                        typeof values === 'string'
                            ? { value: values }
                            : {
                                  min: values.min || values.max,
                                  max: values.max || values.min,
                              }

                    let type = STATS.getKey(name) || undefined
                    if (!type) {
                        const withoutNumbers = name?.replace(/\d+/, '')
                        const numbers = name?.replace(/.*(\d+).*/, '$1')

                        const typeWithoutNumbers = STATS.getKey(withoutNumbers)

                        if (typeWithoutNumbers) {
                            type = typeWithoutNumbers
                            if (!value) {
                                value = {
                                    min: numbers,
                                    value: numbers,
                                    max: numbers,
                                }
                            }
                        }
                    }

                    if (name !== 'Compatible avec : 0') {
                        if (isStat(name)) {
                            statisticsArray.push({
                                type,
                                ...value,
                            })
                        } else {
                            passivesArray.push({
                                type,
                                name: type ? undefined : name,
                                imgUrl: getDefaultPassiveImg(name),
                                ...value,
                            })
                        }
                    }
                })

                set(toReturn, `bonus[${index}].statistics`, statisticsArray)
                set(toReturn, `bonus[${index}].passives`, passivesArray)
            }
        })
    }
    return toReturn
}

export const formatRecipe = toFormat => {
    const toReturn = toFormat
    if (toFormat?.recipe?.length > 0) {
        toFormat.recipe.forEach((stat, index) => {
            const statEntry = Object.entries(stat)[0]
            const { imgUrl, ...infos } = statEntry[1]
            // Todo : new model Resource and just put the _id here
            toReturn.recipe[index] = {
                name: statEntry[0],
                imgUrl: imgUrl.replace(
                    'https://s.ankama.com/www/static.ankama.com',
                    ''
                ),
                ...infos,
            }
        })
    }
    return toReturn
}

// For Equipments, Weapons, Pets, Mounts
export const formatType = toFormat => {
    const toReturn = toFormat
    if (toFormat.type === 'Montures') {
        toFormat.type = 'Monture'
    }
    toReturn.type = COMMON.getKey(toFormat.type)
    return toReturn
}
export const formatCategory = toFormat => {
    const toReturn = toFormat
    toReturn.category = COMMON.getCategory(toFormat.type)
    toReturn.typeOrder = COMMON.getOrder(toFormat.type)
    return toReturn
}

// For Resources
export const formatResourceType = toFormat => {
    const toReturn = toFormat
    toReturn.type = RESOURCES.getKey(toFormat.type)
    return toReturn
}
export const formatResourceCategory = toFormat => {
    const toReturn = toFormat
    toReturn.category = toFormat.type
    return toReturn
}

// COMMON
export const formatImgUrl = toFormat => {
    const toReturn = toFormat
    if (toFormat.imgUrl) {
        toReturn.imgUrl = toFormat.imgUrl.replace(
            'https://s.ankama.com/www/static.ankama.com',
            '//img.shokkoth.fr'
        )
    }
    return toReturn
}

export const formatSetAnkamaId = toFormat => {
    const toReturn = toFormat
    toReturn.setAnkamaId = parseInt(toFormat?.setId, 10) || null
    delete toReturn.setId
    return toReturn
}

export const removeId = toFormat => {
    const toReturn = toFormat
    delete toReturn._id
    return toReturn
}

export const formatLvlToLevel = toFormat => {
    const toReturn = toFormat
    toReturn.level = toFormat.lvl || toFormat.level
    return toReturn
}

export function formatFullEquipment(toFormat) {
    return removeId(
        formatSetAnkamaId(
            formatCategory(
                formatImgUrl(
                    formatRecipe(
                        formatStatistics(
                            formatCharacteristics(formatType(toFormat))
                        )
                    )
                )
            )
        )
    )
}

export const formatSet = toFormat =>
    removeId(formatImgUrl(formatSetBonus(formatLvlToLevel(toFormat))))

export const formatResource = toFormat =>
    removeId(
        formatResourceCategory(
            formatResourceType(formatImgUrl(formatLvlToLevel(toFormat)))
        )
    )
