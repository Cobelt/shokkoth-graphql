import axios from 'axios'

import { COMMON, WEAPONS, STATS } from '../../constants'
import {
    AMULET,
    BACKPACK,
    BELT,
    BOOTS,
    CLOAK,
    DOFUS,
    getKey,
    HAT,
    RING,
    SHIELD,
    TROPHY,
    PRYSMARADITE,
} from '../../constants/equipments'
import { MOUNT } from '../../constants/mounts'
import { PET, PETSMOUNT } from '../../constants/pets'
import { formatImgUrl, formatStatistics } from '../../utils'
import { setFilterType, setFilterTypes } from './static'

export const hatOnly = next => rp => next(setFilterType(rp, getKey(HAT)))
export const amuletOnly = next => rp => next(setFilterType(rp, getKey(AMULET)))
export const beltOnly = next => rp => next(setFilterType(rp, getKey(BELT)))
export const bootsOnly = next => rp => next(setFilterType(rp, getKey(BOOTS)))
export const ringOnly = next => rp => next(setFilterType(rp, getKey(RING)))
export const shieldOnly = next => rp => next(setFilterType(rp, getKey(SHIELD)))
export const cloakOnly = next => rp => next(setFilterType(rp, getKey(CLOAK)))
export const backpackOnly = next => rp =>
    next(setFilterType(rp, getKey(BACKPACK)))
export const dofusOnly = next => rp => next(setFilterType(rp, getKey(DOFUS)))
export const trophyOnly = next => rp => next(setFilterType(rp, getKey(TROPHY)))
export const petOnly = next => rp => next(setFilterType(rp, getKey(PET)))
export const petsmountOnly = next => rp =>
    next(setFilterType(rp, getKey(PETSMOUNT)))
export const mountOnly = next => rp => next(setFilterType(rp, getKey(MOUNT)))

// TODO Add Prysmaradite
export const dofusTrophiesPrysma = next => rp =>
    next(
        setFilterTypes(rp, [
            getKey(DOFUS),
            getKey(TROPHY),
            getKet(PRYSMARADITE),
        ])
    )
export const backOnly = next => rp =>
    next(setFilterTypes(rp, [getKey(CLOAK), getKey(BACKPACK)]))
export const weaponOnly = next => rp => next(setFilterTypes(rp, WEAPONS.ENUM))

export async function generateCreateOneFromDatafus(rp) {
    try {
        const { searchName } = rp?.args || {}

        const { data } = await axios.get(
            'https://lucberge.github.io/Datafus/21.01.27/fr/equipments'
        )

        if (Array.isArray(data) && data?.length > 0) {
            const found = data?.find(equip =>
                equip?.name?.match(new RegExp(searchName, 'i'))
            )
            if (!found) {
                throw new Error('No item found with this name')
            }

            const {
                id,
                img,
                type,
                set,
                effects,
                conditions,
                craft,
                ...noFormatRequired
            } = found || {}

            const statistics = []
            const otherStats = []
            const passives = []

            if (effects?.length > 0) {
                effects.forEach(effect => {
                    const match = effect?.match(
                        /^(?<min>-?\d+) (?:à (?<max>-?\d+))? ?(?<name>.+)$/
                    )

                    const { min, max = min, value = max, name } =
                        match?.groups || {}
                    const type = STATS.getKey(name)

                    if (type) {
                        statistics.push({ min, max, value, type })
                    } else if (name) {
                        otherStats.push({
                            min,
                            max,
                            value,
                            name,
                        })
                    } else {
                        passives.push({
                            min,
                            max,
                            value,
                            name: effect,
                        })
                    }
                })
            }

            const trueType = COMMON.getKey(type)
            const record = {
                ...noFormatRequired,
                ankamaId: id,
                imgUrl: img,
                statistics,
                passives,
                otherStats,
                type: trueType,
                category: COMMON.getCategory(trueType),
                typeOrder: COMMON.getOrder(trueType),
                setAnkamaId:
                    set &&
                    set.match(/panoplies\/(?<setAnkamaId>\d+)/)?.groups
                        ?.setAnkamaId,
            }

            return { record: formatImgUrl(record) }
        } else {
            console.log({ data })
            throw new Error('Data is not an array or is empty')
        }
    } catch (e) {
        console.error(e)
        return e
    }
}
