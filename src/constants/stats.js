import { findKey, translateType, validate } from '../utils'

// PRIMARY
export const AP = 'PA'
export const MP = 'PM'
export const RANGE = 'Portée'

export const AP_MP = 'PA PM'
export const AP_RANGE = 'PA PO'
export const MP_RANGE = 'PM PO'
export const AP_MP_RANGE = 'PA PM PO'

export const SUMMONS = 'Invocations'
export const CRITICAL = '% Critique'
export const INITIATIVE = 'Initiative'

export const VITALITY = 'Vitalité'
export const STRENGTH = 'Force'
export const AGILITY = 'Agilité'
export const INTELLIGENCE = 'Intelligence'
export const CHANCE = 'Chance'
export const WISDOM = 'Sagesse'
export const PUISSANCE = 'Puissance'

export const MULTI_ELEMENTS = 'Multi-élément'

// DAMAGES
export const DAMAGE = 'Dommages'
export const NEUTRAL_DAMAGE = 'Dommages Neutre'
export const EARTH_DAMAGE = 'Dommages Terre'
export const AIR_DAMAGE = 'Dommages Air'
export const FIRE_DAMAGE = 'Dommages Feu'
export const WATER_DAMAGE = 'Dommages Eau'

export const MELEE_DAMAGE = '% Dommages mêlée'
export const RANGED_DAMAGE = '% Dommages distance'

export const CRITICAL_DAMAGE = 'Dommages Critiques'
export const PUSHBACK_DAMAGE = 'Dommages Poussée'

// RESISTANCES
export const NEUTRAL_RESISTANCE = '% Résistance Neutre'
export const EARTH_RESISTANCE = '% Résistance Terre'
export const FIRE_RESISTANCE = '% Résistance Feu'
export const WATER_RESISTANCE = '% Résistance Eau'
export const AIR_RESISTANCE = '% Résistance Air'

export const NEUTRAL_STATIC_RESISTANCE = 'Résistance Neutre'
export const EARTH_STATIC_RESISTANCE = 'Résistance Terre'
export const FIRE_STATIC_RESISTANCE = 'Résistance Feu'
export const WATER_STATIC_RESISTANCE = 'Résistance Eau'
export const AIR_STATIC_RESISTANCE = 'Résistance Air'

export const MELEE_RESISTANCE = '% Résistance mêlée'
export const RANGED_RESISTANCE = '% Résistance distance'

export const CRITICAL_RESISTANCE = 'Résistance Critiques'
export const PUSHBACK_RESISTANCE = 'Résistance Poussée'

// SECONDARY
export const AP_PARRY = 'Esquive PA'
export const MP_PARRY = 'Esquive PM'

export const AP_REDUCTION = 'Retrait PA'
export const MP_REDUCTION = 'Retrait PM'

export const DODGE = 'Fuite'
export const LOCK = 'Tacle'

export const PROSPECTING = 'Prospection'

export const HEALS = 'Soins'

// WEAPONS DAMAGES
export const WEAPONS_NEUTRAL_DAMAGES = 'dommages Neutre'
export const WEAPONS_EARTH_DAMAGES = 'dommages Terre'
export const WEAPONS_AIR_DAMAGES = 'dommages Air'
export const WEAPONS_FIRE_DAMAGES = 'dommages Feu'
export const WEAPONS_WATER_DAMAGES = 'dommages Eau'

export const WEAPONS_NEUTRAL_STEAL = 'vol Neutre'
export const WEAPONS_EARTH_STEAL = 'vol Terre'
export const WEAPONS_AIR_STEAL = 'vol Air'
export const WEAPONS_FIRE_STEAL = 'vol Feu'
export const WEAPONS_WATER_STEAL = 'vol Eau'

export const WEAPONS_HEAL = 'PV rendus'

export const WEAPONS_CRITICAL = '% Critique (base)'
export const WEAPONS_NO_CRITICAL = 'Pas de critique possible'
export const WEAPONS_CRIT_DAMAGES = 'Dommages bonus (CC)'

export const PASSIVE = 'Passif'
export const translations = {
    AP: {
        fr: AP,
        short: AP,
        imgUrl: 'PA.png',
    },
    MP: {
        fr: MP,
        short: MP,
        imgUrl: 'PM.png',
    },
    RANGE: {
        fr: RANGE,
        short: 'PO',
        imgUrl: 'PO.png',
    },
    AP_MP: {
        fr: AP_MP,
        short: AP_MP,
        imgUrl: 'papm.png',
    },
    AP_RANGE: {
        fr: AP_RANGE,
        short: AP_RANGE,
        imgUrl: 'papo.png',
    },
    MP_RANGE: {
        fr: MP_RANGE,
        short: MP_RANGE,
        imgUrl: 'pmpo.png',
    },
    AP_MP_RANGE: {
        fr: AP_MP_RANGE,
        short: AP_MP_RANGE,
        imgUrl: 'papmpo.png',
    },
    SUMMONS: {
        fr: SUMMONS,
        short: 'Invo',
        imgUrl: 'invocation.png',
    },
    CRITICAL: {
        fr: CRITICAL,
        short: 'CC',
        imgUrl: 'crit.png',
    },
    INITIATIVE: {
        fr: INITIATIVE,
        short: 'Ini',
        imgUrl: 'initiative.png',
    },
    VITALITY: {
        fr: VITALITY,
        short: 'PV',
        imgUrl: 'vitalite.png',
    },
    STRENGTH: {
        fr: STRENGTH,
        short: STRENGTH,
        imgUrl: 'terre.png',
    },
    AGILITY: {
        fr: AGILITY,
        short: 'Agi',
        imgUrl: 'air.png',
    },
    INTELLIGENCE: {
        fr: INTELLIGENCE,
        short: 'Intel',
        imgUrl: 'feu.png',
    },
    CHANCE: {
        fr: CHANCE,
        short: CHANCE,
        imgUrl: 'eau.png',
    },
    WISDOM: {
        fr: WISDOM,
        short: 'Sasa',
        imgUrl: 'sagesse.png',
    },
    PUISSANCE: {
        fr: PUISSANCE,
        short: 'Puiss',
        imgUrl: 'puissance.png',
    },
    MULTI_ELEMENTS: {
        fr: MULTI_ELEMENTS,
        short: 'Multi',
        imgUrl: 'multi.png',
    },
    DAMAGE: {
        fr: DAMAGE,
        short: 'Do',
        imgUrl: 'dommage.png',
    },
    NEUTRAL_DAMAGE: {
        fr: NEUTRAL_DAMAGE,
        short: 'Do neutre',
        imgUrl: 'neutre.png',
    },
    EARTH_DAMAGE: {
        fr: EARTH_DAMAGE,
        short: 'Do terre',
        imgUrl: 'terre.png',
    },
    AIR_DAMAGE: {
        fr: AIR_DAMAGE,
        short: 'Do air',
        imgUrl: 'air.png',
    },
    FIRE_DAMAGE: {
        fr: FIRE_DAMAGE,
        short: 'Do feu',
        imgUrl: 'feu.png',
    },
    WATER_DAMAGE: {
        fr: WATER_DAMAGE,
        short: 'Do eau',
        imgUrl: 'eau.png',
    },
    MELEE_DAMAGE: {
        fr: MELEE_DAMAGE,
        short: '% Do mêlée',
        imgUrl: 'arme.png',
    },
    RANGED_DAMAGE: {
        fr: RANGED_DAMAGE,
        short: '% Do dist',
        imgUrl: 'arme.png',
    },
    CRITICAL_DAMAGE: {
        fr: CRITICAL_DAMAGE,
        short: 'Do crit',
        imgUrl: 'dommage-crit.png',
    },
    PUSHBACK_DAMAGE: {
        fr: PUSHBACK_DAMAGE,
        short: 'Do pou',
        imgUrl: 'dommage-poussee.png',
    },
    NEUTRAL_RESISTANCE: {
        fr: NEUTRAL_RESISTANCE,
        short: '% Res neutre',
        imgUrl: 'neutre.png',
    },
    EARTH_RESISTANCE: {
        fr: EARTH_RESISTANCE,
        short: '% Res terre',
        imgUrl: 'terre.png',
    },
    FIRE_RESISTANCE: {
        fr: FIRE_RESISTANCE,
        short: '% Res feu',
        imgUrl: 'feu.png',
    },
    WATER_RESISTANCE: {
        fr: WATER_RESISTANCE,
        short: '% Res eau',
        imgUrl: 'eau.png',
    },
    AIR_RESISTANCE: {
        fr: AIR_RESISTANCE,
        short: '% Res air',
        imgUrl: 'air.png',
    },
    NEUTRAL_STATIC_RESISTANCE: {
        fr: NEUTRAL_STATIC_RESISTANCE,
        short: 'Ré neutre',
        imgUrl: 'neutre.png',
    },
    EARTH_STATIC_RESISTANCE: {
        fr: EARTH_STATIC_RESISTANCE,
        short: 'Ré terre',
        imgUrl: 'terre.png',
    },
    FIRE_STATIC_RESISTANCE: {
        fr: FIRE_STATIC_RESISTANCE,
        short: 'Ré feu',
        imgUrl: 'feu.png',
    },
    WATER_STATIC_RESISTANCE: {
        fr: WATER_STATIC_RESISTANCE,
        short: 'Ré eau',
        imgUrl: 'eau.png',
    },
    AIR_STATIC_RESISTANCE: {
        fr: AIR_STATIC_RESISTANCE,
        short: 'Ré air',
        imgUrl: 'air.png',
    },
    MELEE_RESISTANCE: {
        fr: MELEE_RESISTANCE,
        short: '% Res mélée',
        imgUrl: 'PB.png',
    },
    RANGED_RESISTANCE: {
        fr: RANGED_RESISTANCE,
        short: '% Res dist',
        imgUrl: 'PB.png',
    },
    CRITICAL_RESISTANCE: {
        fr: CRITICAL_RESISTANCE,
        short: 'Ré crit',
        imgUrl: 'resistance-crit.png',
    },
    PUSHBACK_RESISTANCE: {
        fr: PUSHBACK_RESISTANCE,
        short: 'Ré pou',
        imgUrl: 'resistance-poussee.png',
    },
    AP_PARRY: {
        fr: AP_PARRY,
        short: AP_PARRY,
        imgUrl: 'esquive-pa.png',
    },
    MP_PARRY: {
        fr: MP_PARRY,
        short: MP_PARRY,
        imgUrl: 'esquive-pm.png',
    },
    AP_REDUCTION: {
        fr: AP_REDUCTION,
        short: 'Ret PA',
        imgUrl: 'retrait-pa.png',
    },
    MP_REDUCTION: {
        fr: MP_REDUCTION,
        short: 'Ret PM',
        imgUrl: 'retrait-pm.png',
    },
    DODGE: {
        fr: DODGE,
        short: DODGE,
        imgUrl: 'fuite.png',
    },
    LOCK: {
        fr: LOCK,
        short: LOCK,
        imgUrl: 'tacle.png',
    },
    PROSPECTING: {
        fr: PROSPECTING,
        short: 'PP',
        imgUrl: 'prospection.png',
    },
    HEALS: {
        fr: HEALS,
        short: HEALS,
        imgUrl: 'soin.png',
    },
    WEAPONS_NEUTRAL_DAMAGES: {
        fr: WEAPONS_NEUTRAL_DAMAGES,
        short: '(Do neutre)',
        imgUrl: 'neutre.png',
    },
    WEAPONS_EARTH_DAMAGES: {
        fr: WEAPONS_EARTH_DAMAGES,
        short: '(Do terre)',
        imgUrl: 'terre.png',
    },
    WEAPONS_FIRE_DAMAGES: {
        fr: WEAPONS_FIRE_DAMAGES,
        short: '(Do feu)',
        imgUrl: 'feu.png',
    },
    WEAPONS_WATER_DAMAGES: {
        fr: WEAPONS_WATER_DAMAGES,
        short: '(Do eau)',
        imgUrl: 'eau.png',
    },
    WEAPONS_AIR_DAMAGES: {
        fr: WEAPONS_AIR_DAMAGES,
        short: '(Do air)',
        imgUrl: 'air.png',
    },
    WEAPONS_NEUTRAL_STEAL: {
        fr: WEAPONS_NEUTRAL_STEAL,
        short: '(Vol neutre)',
        imgUrl: 'neutre.png',
    },
    WEAPONS_EARTH_STEAL: {
        fr: WEAPONS_EARTH_STEAL,
        short: '(Vol terre)',
        imgUrl: 'terre.png',
    },
    WEAPONS_FIRE_STEAL: {
        fr: WEAPONS_FIRE_STEAL,
        short: '(Vol feu)',
        imgUrl: 'feu.png',
    },
    WEAPONS_WATER_STEAL: {
        fr: WEAPONS_WATER_STEAL,
        short: '(Vol eau)',
        imgUrl: 'eau.png',
    },
    WEAPONS_AIR_STEAL: {
        fr: WEAPONS_AIR_STEAL,
        short: '(Vol air)',
        imgUrl: 'air.png',
    },
    WEAPONS_HEAL: {
        fr: WEAPONS_HEAL,
        short: '(PV rendus)',
        imgUrl: 'pv-rendus.png',
    },
    WEAPONS_CRITICAL: {
        fr: WEAPONS_CRITICAL,
        short: '%CC (base)',
        imgUrl: 'crit.png',
    },
    WEAPONS_NO_CRITICAL: {
        fr: WEAPONS_NO_CRITICAL,
        short: 'Pas de crit',
        imgUrl: 'no-crit.png',
    },
    WEAPONS_CRIT_DAMAGES: {
        fr: WEAPONS_CRIT_DAMAGES,
        short: 'Do bonus (CC)',
        imgUrl: 'dommage-crit.png',
    },
    PASSIVE: {
        fr: PASSIVE,
        short: PASSIVE,
        imgUrl: 'passif.png',
    },
}

export const ENUM = Object.keys(translations)

export const getKey = stat => findKey(stat, translations)
export const translate = (stat, lang) => translateType(stat, translations, lang)
export const populate = stat => translations[findKey(stat, translations)]

export const validateType = (stat, translationName) =>
    validate(stat, translationName, translations)

// PRIMARY
export const ESSENTIAL_STATS = [AP, MP, RANGE]
export const ELEMENTS_STATS = [STRENGTH, INTELLIGENCE, CHANCE, AGILITY]

export const OTHERS_PRIMARY_STATS = [SUMMONS, CRITICAL, INITIATIVE]
export const OTHERS_ELEMENTS_STATS = [VITALITY, PUISSANCE, WISDOM]

export const BOOSTABLE_STATS = [VITALITY, WISDOM, ...ELEMENTS_STATS]

export const PRIMARY_STATS = [
    ...ESSENTIAL_STATS,
    ...ELEMENTS_STATS,
    ...OTHERS_ELEMENTS_STATS,
    ...OTHERS_PRIMARY_STATS,
]

// DAMAGES
export const ELEMENTS_DAMAGES = [
    NEUTRAL_DAMAGE,
    EARTH_DAMAGE,
    FIRE_DAMAGE,
    WATER_DAMAGE,
    AIR_DAMAGE,
]

export const MELEE_RANGED_DAMAGES = [MELEE_DAMAGE, RANGED_DAMAGE]
export const OTHERS_DAMAGES = [
    DAMAGE,
    CRITICAL_DAMAGE,
    PUSHBACK_DAMAGE,
    ...MELEE_RANGED_DAMAGES,
]

export const DAMAGES_STATS = [...ELEMENTS_DAMAGES, ...OTHERS_DAMAGES]

// RESISTANCES
export const PERCENTS_RES_STATS = [
    NEUTRAL_RESISTANCE,
    EARTH_RESISTANCE,
    FIRE_RESISTANCE,
    WATER_RESISTANCE,
    AIR_RESISTANCE,
]

export const STATIC_RES_STATS = [
    NEUTRAL_STATIC_RESISTANCE,
    EARTH_STATIC_RESISTANCE,
    FIRE_STATIC_RESISTANCE,
    WATER_STATIC_RESISTANCE,
    AIR_STATIC_RESISTANCE,
]

export const RES_STATS = {
    NEUTRAL: {
        PERCENT: NEUTRAL_RESISTANCE,
        STATIC: NEUTRAL_STATIC_RESISTANCE,
    },
    EARTH: {
        PERCENT: EARTH_RESISTANCE,
        STATIC: EARTH_STATIC_RESISTANCE,
    },
    FIRE: {
        PERCENT: FIRE_RESISTANCE,
        STATIC: FIRE_STATIC_RESISTANCE,
    },
    WATER: {
        PERCENT: WATER_RESISTANCE,
        STATIC: WATER_STATIC_RESISTANCE,
    },
    AIR: {
        PERCENT: AIR_RESISTANCE,
        STATIC: AIR_STATIC_RESISTANCE,
    },
}

export const MELEE_RANGED_RES = [MELEE_RESISTANCE, RANGED_RESISTANCE]
export const OTHERS_RES = [
    CRITICAL_RESISTANCE,
    PUSHBACK_RESISTANCE,
    ...MELEE_RANGED_RES,
]

export const RESISTANCES_STATS = [
    ...PERCENTS_RES_STATS,
    ...STATIC_RES_STATS,
    ...OTHERS_RES,
]

// SECONDARY
export const ESCAPE_STATS = [DODGE, LOCK]

export const AP_MP_PARRY = [AP_PARRY, MP_PARRY]
export const AP_MP_REDUCTION = [AP_REDUCTION, MP_REDUCTION]

export const OTHERS_SECONDARY = [PROSPECTING, HEALS]

export const SECONDARY_STATS = [
    ...ESCAPE_STATS,
    ...AP_MP_PARRY,
    ...AP_MP_REDUCTION,
    ...OTHERS_SECONDARY,
]

export const STATS = [
    ...PRIMARY_STATS,
    ...DAMAGES_STATS,
    ...RESISTANCES_STATS,
    ...SECONDARY_STATS,
]

export const WEAPONS_CHARACTERISTICS = [
    WEAPONS_NEUTRAL_DAMAGES,
    WEAPONS_EARTH_DAMAGES,
    WEAPONS_AIR_DAMAGES,
    WEAPONS_FIRE_DAMAGES,
    WEAPONS_WATER_DAMAGES,

    WEAPONS_NEUTRAL_STEAL,
    WEAPONS_EARTH_STEAL,
    WEAPONS_AIR_STEAL,
    WEAPONS_FIRE_STEAL,
    WEAPONS_WATER_STEAL,

    WEAPONS_HEAL,

    WEAPONS_CRITICAL,
    WEAPONS_NO_CRITICAL,
    WEAPONS_CRIT_DAMAGES,
]

export const SEARCH_SHIELD = [
    RANGE,
    CRITICAL,
    PUISSANCE,
    CRITICAL_DAMAGE,
    PUSHBACK_DAMAGE,
    ...MELEE_RANGED_DAMAGES,
    ...OTHERS_RES,
    ...PERCENTS_RES_STATS,
]

export const STATS_TYPE = {
    BASE: 'baseStat.png',
    PARCHO: {
        all: 'parchoStat.png',
        [VITALITY]: 'parchoVitality.png',
        [AGILITY]: 'parchoAgility.png',
        [CHANCE]: 'parchoChance.png',
        [STRENGTH]: 'parchoStrength.png',
        [INTELLIGENCE]: 'parchoIntelligence.png',
        [WISDOM]: 'parchoWisdom.png',
    },
    EQUIPMENT: 'equipmentStat.png',
}

export const DEFAULT_STATE = 'DEFAULT'
export const WEAPON_STATE = 'WEAPON'
export const SHIELD_STATE = 'SHIELD'
export const DOFUS_STATE = 'DOFUS'

export const SEARCH_BUTTONS = {
    [DEFAULT_STATE]: PRIMARY_STATS,
    [WEAPON_STATE]: WEAPONS_CHARACTERISTICS,
    [SHIELD_STATE]: SEARCH_SHIELD,
    [DOFUS_STATE]: PRIMARY_STATS,
}
