import {
    findKey,
    findCategory,
    findTypesOfCategory,
    findOrder,
    translateType,
    validate,
} from '../utils'

export const PET = 'Familier'
export const PETSMOUNT = 'Montilier'

export const translations = {
    PET: {
        order: 30,
        fr: 'familier',
        en: 'pet',
        category: 'pet',
    },
    PETSMOUNT: {
        order: 31,
        fr: 'montilier',
        en: 'petsmount',
        category: 'pet',
    },
}

export const ENUM = Object.keys(translations)

export const getKey = type => findKey(type, translations)
export const populate = type => translations[findKey(type, translations)]
export const getOrder = type => findOrder(type, translations)
export const getCategory = type => findCategory(type, translations)
export const getTypesOfCategory = category =>
    findTypesOfCategory(category, translations)

export const translate = (type, lang) => translateType(type, translations, lang)

export const validateType = (type, translationName) =>
    validate(type, translationName, translations)
