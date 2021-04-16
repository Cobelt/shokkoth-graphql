import {
    findKey,
    findCategory,
    findTypesOfCategory,
    findOrder,
    translateType,
    validate,
} from '../utils'

export const MOUNT = 'Monture'

export const translations = {
    MOUNT: {
        order: 32,
        fr: 'monture',
        en: 'mount',
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
