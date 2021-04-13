import { findKey, translateType, validate } from '../utils'

export const MALE = 'male'
export const FEMALE = 'female'

export const translations = {
    [MALE]: {
        fr: 'homme',
        en: 'male',
    },
    [FEMALE]: {
        fr: 'femme',
        en: 'female',
    },
}

export const ENUM = Object.keys(translations)
export const DEFAULT = Object.keys(translations)[0]

export const getKey = type => findKey(type, translations)
export const populate = type => translations[findKey(type, translations)]
export const translate = (type, lang) => translateType(type, translations, lang)

export const validateType = (type, translationName) =>
    validate(type, translationName, translations)
