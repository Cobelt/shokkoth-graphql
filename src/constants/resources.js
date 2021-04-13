import { findKey, translateType, validate } from '../utils'

export const translations = {
    ALCHEMY_EQUIPMENT: {
        fr: "matériel d'alchimie",
        en: 'alchemy equipment',
    },
    ALLOY: {
        fr: 'alliage',
        en: 'alloy',
    },
    BARK: {
        fr: 'écorce',
        en: 'bark',
    },
    BOARD: {
        fr: 'planche',
        en: 'board',
    },
    BONE: {
        fr: 'os',
        en: 'bone',
    },
    BUD: {
        fr: 'bourgeon',
        en: 'bud',
    },
    CARAPACE: {
        fr: 'carapace',
        en: 'carapace',
    },
    CEREAL: {
        fr: 'céréale',
        en: 'cereal',
    },
    CORRUPTION_RUNE: {
        fr: 'rune de corruption',
        en: 'corruption rune',
    },
    DUNGEON_KEEPER_ESSENCE: {
        fr: 'essence de gardien de donjon',
        en: 'dungeon keeper essence',
    },
    DYE: {
        fr: 'teinture',
        en: 'dye',
    },
    EAR: {
        fr: 'oreille',
        en: 'ear',
    },
    EGG: {
        fr: 'œuf',
        en: 'egg',
    },
    EXPLORATION_EQUIPMENT: {
        fr: "matériel d'exploration",
        en: 'exploration equipment',
    },
    EYE: {
        fr: 'œil',
        en: 'eye',
    },
    FABRIC: {
        fr: 'étoffe',
        en: 'fabric',
    },
    FEATHER: {
        fr: 'plume',
        en: 'feather',
    },
    FISH: {
        fr: 'poisson',
        en: 'fish',
    },
    FLOUR: {
        fr: 'farine',
        en: 'flour',
    },
    FLOWER: {
        fr: 'fleur',
        en: 'flower',
    },
    FRUIT: {
        fr: 'fruit',
        en: 'fruit',
    },
    GARMENT: {
        fr: 'vêtement',
        en: 'garment',
    },
    GUTTED_FISH: {
        fr: 'poisson vidé',
        en: 'gutted fish',
    },
    HAIR: {
        fr: 'poil',
        en: 'hair',
    },
    IDOL: {
        fr: 'idole',
        en: 'idol',
    },
    JELLY: {
        fr: 'gelée',
        en: 'jelly',
    },
    KEY: {
        fr: 'clef',
        en: 'key',
    },
    KWISMAS: {
        fr: 'nowel',
        en: 'kwismas',
    },
    LEATHER: {
        fr: 'cuir',
        en: 'leather',
    },
    LEG: {
        fr: 'patte',
        en: 'leg',
    },
    MAP: {
        fr: 'carte',
        en: 'map',
    },
    MAP_FRAGMENT: {
        fr: 'fragment de carte',
        en: 'map fragment',
    },
    MEAT: {
        fr: 'viande',
        en: 'meat',
    },
    METARIA: {
        fr: 'métaria',
        en: 'metaria',
    },
    MISCELLANEOUS_RESOURCES: {
        fr: 'ressources diverses',
        en: 'miscellaneous resources',
    },
    MUSHROOM: {
        fr: 'champignon',
        en: 'mushroom',
    },
    OIL: {
        fr: 'huile',
        en: 'oil',
    },
    ORE: {
        fr: 'minerai',
        en: 'ore',
    },
    PEBBLE: {
        fr: 'galet',
        en: 'pebble',
    },
    PET_FOOD: {
        fr: 'nourriture pour familier',
        en: 'pet food',
    },
    PLANT: {
        fr: 'plante',
        en: 'plant',
    },
    POWDER: {
        fr: 'poudre',
        en: 'powder',
    },
    PRECIOUS_STONE: {
        fr: 'pierre précieuse',
        en: 'precious stone',
    },
    PREPARATION: {
        fr: 'préparation',
        en: 'preparation',
    },
    ROOT: {
        fr: 'racine',
        en: 'root',
    },
    SAP: {
        fr: 'sève',
        en: 'sap',
    },
    SEED: {
        fr: 'graine',
        en: 'seed',
    },
    SHELL: {
        fr: 'coquille',
        en: 'shell',
    },
    SKIN: {
        fr: 'peau',
        en: 'skin',
    },
    SMITHMAGIC_ORB: {
        fr: 'orbe de forgemagie',
        en: 'smithmagic orb',
    },
    SMITHMAGIC_POTION: {
        fr: 'potion de forgemagie',
        en: 'smithmagic potion',
    },
    SMITHMAGIC_RUNE: {
        fr: 'rune de forgemagie',
        en: 'smithmagic rune',
    },
    SOUVENIR: {
        fr: 'souvenir',
        en: 'souvenir',
    },
    STONE: {
        fr: 'objet vivant',
        en: 'stone',
    },
    STUFFED_TOY: {
        fr: 'peluche',
        en: 'stuffed toy',
    },
    SUBSTRATE: {
        fr: 'substrat',
        en: 'substrate',
    },
    TAIL: {
        fr: 'queue',
        en: 'tail',
    },
    TRANSCENDANCE_RUNE: {
        fr: 'rune de transcendance',
        en: 'transcendance rune',
    },
    VEGETABLE: {
        fr: 'légume',
        en: 'vegetable',
    },
    WING: {
        fr: 'aile',
        en: 'wing',
    },
    WOOD: {
        fr: 'bois',
        en: 'wood',
    },
    WOOL: {
        fr: 'laine',
        en: 'wool',
    },
    WRAPPING_PAPER: {
        fr: 'emballage',
        en: 'wrapping paper',
    },
}

export const ENUM = Object.keys(translations)

export const getKey = type => findKey(type, translations)
export const populate = type => translations[findKey(type, translations)]
export const translate = (type, lang) => translateType(type, translations, lang)

export const validateType = (type, translationName) =>
    validate(type, translationName, translations)
