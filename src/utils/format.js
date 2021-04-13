import removeAccent from 'lodash.deburr'

export const validate = (type, translationName, translationsObj = {}) => {
    if (!translationsObj[translationName]) return false
    if (translationName === findKey(type, translationsObj)) return true
    return false
}

export const toLowerCaseNFC = string => string.normalize('NFC').toLowerCase()

export const toURLValid = string =>
    toLowerCaseNFC(removeAccent(string).replace(/\W+/g, '-'))

export const translateType = (type, translations, lang) => {
    const validType = toURLValid(type)
    console.log({ validType })
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
