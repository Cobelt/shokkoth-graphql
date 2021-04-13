import {
    findKey,
    findCategory,
    findTypesOfCategory,
    findOrder,
    translateType,
    validate,
} from '../utils'

export const SWORD = 'Épée'
export const HAMMER = 'Marteau'
export const SCYTHE = 'Faux'
export const BOW = 'Arc'
export const AXE = 'Hache'
export const DAGGER = 'Dague'
export const PICKAXE = 'Pioche'
export const WAND = 'Baguette'
export const STAFF = 'Bâton'
export const SHOVEL = 'Pelle'
export const TOOL = 'Outil'
export const SOUL_STONE = "Pierre d'âme"

export const translations = {
    SWORD: {
        order: 10,
        fr: 'épée',
        en: 'sword',
        category: 'weapon',
    },
    HAMMER: {
        order: 11,
        fr: 'marteau',
        en: 'hammer',
        category: 'weapon',
    },
    SCYTHE: {
        order: 12,
        fr: 'faux',
        en: 'scythe',
        category: 'weapon',
    },
    BOW: {
        order: 13,
        fr: 'arc',
        en: 'bow',
        category: 'weapon',
    },
    AXE: {
        order: 14,
        fr: 'hache',
        en: 'axe',
        category: 'weapon',
    },
    DAGGER: {
        order: 15,
        fr: 'dague',
        en: 'dagger',
        category: 'weapon',
    },
    PICKAXE: {
        order: 16,
        fr: 'pioche',
        en: 'pickaxe',
        category: 'weapon',
    },
    WAND: {
        order: 17,
        fr: 'baguette',
        en: 'wand',
        category: 'weapon',
    },
    STAFF: {
        order: 18,
        fr: 'bâton',
        en: 'staff',
        category: 'weapon',
    },
    SHOVEL: {
        order: 19,
        fr: 'pelle',
        en: 'shovel',
        category: 'weapon',
    },
    TOOL: {
        order: 51,
        fr: 'outil',
        en: 'tool',
    },
    SOUL_STONE: {
        order: 50,
        fr: "pierre d'âme",
        en: 'soul stone',
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
