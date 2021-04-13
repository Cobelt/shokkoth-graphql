import {
    findKey,
    findOrder,
    findCategory,
    findTypesOfCategory,
    translateType,
    validate,
} from '../utils'
import * as EQUIPMENTS from './equipments'
import * as MOUNTS from './mounts'
import * as PETS from './pets'
import * as WEAPONS from './weapons'

export const translations = {
    ...EQUIPMENTS.translations,
    ...MOUNTS.translations,
    ...PETS.translations,
    ...WEAPONS.translations,
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
