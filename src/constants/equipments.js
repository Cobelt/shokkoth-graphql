import memoize from 'lodash.memoize'

import {
    findKey,
    findCategory,
    findTypesOfCategory,
    findOrder,
    translateType,
    validate,
} from '../utils'

export const HAT = 'Chapeau'
export const CLOAK = 'Cape'
export const AMULET = 'Amulette'
export const RING = 'Anneau'
export const BELT = 'Ceinture'
export const BOOTS = 'Bottes'
export const SHIELD = 'Bouclier'
export const DOFUS = 'Dofus'
export const TROPHY = 'Trophée'
export const PRYSMARADITE = 'Prysmaradite'
export const CEREMONIAL = "Objet d'apparat"
export const BACKPACK = 'Sac à dos'
export const LIVING_OBJECT = 'Objet vivant'

export const translations = {
    HAT: {
        order: 0,
        fr: 'chapeau',
        en: 'hat',
        category: 'hat',
    },
    CLOAK: {
        order: 1,
        fr: 'cape',
        en: 'cloak',
        category: 'cloak',
    },
    BACKPACK: {
        order: 2,
        fr: 'sac à dos',
        en: 'backpack',
        category: 'cloak',
    },
    AMULET: {
        order: 3,
        fr: 'amulette',
        en: 'amulet',
        category: 'amulet',
    },
    RING: {
        order: 4,
        fr: 'anneau',
        en: 'ring',
        category: 'ring',
    },
    BELT: {
        order: 5,
        fr: 'ceinture',
        en: 'belt',
        category: 'belt',
    },
    BOOTS: {
        order: 6,
        fr: 'bottes',
        en: 'boots',
        category: 'boots',
    },
    SHIELD: {
        order: 7,
        fr: 'bouclier',
        en: 'shield',
        category: 'shield',
    },
    DOFUS: {
        order: 20,
        fr: 'dofus',
        en: 'dofus',
        category: 'dofus',
    },
    TROPHY: {
        order: 21,
        fr: 'trophée',
        en: 'trophy',
        category: 'dofus',
    },
    PRYSMARADITE: {
        order: 22,
        fr: 'prysmaradite',
        en: 'prysmaradite',
        category: 'dofus',
    },
    LIVING_OBJECT: {
        order: 40,
        fr: 'objet vivant',
        en: 'living object',
    },
    CEREMONIAL: {
        order: 41,
        fr: "objet d'apparat",
        en: 'ceremonial',
    },
}

export const ENUM = Object.keys(translations)

export const getKey = memoize(
    type => findKey(type, translations),
    type => type
)
export const populate = type => translations[findKey(type, translations)]
export const getOrder = type => findOrder(type, translations)
export const getCategory = type => findCategory(type, translations)
export const getTypesOfCategory = category =>
    findTypesOfCategory(category, translations)

export const translate = (type, lang) => translateType(type, translations, lang)

export const validateType = (type, translationName) =>
    validate(type, translationName, translations)
