import memoize from 'lodash.memoize'

import {
    STATS,
    WEAPONS_CHARACTERISTICS,
    translations,
    getKey,
} from '../constants/stats'
import { toURLValid } from './format'

export const getStatSrcImg = memoize(type => {
    const { imgUrl } = translations?.[type] || {}
    if (imgUrl && isStat(type)) {
        return imgUrl
    }
    return null
})

export const getWeaponCharacType = memoize(label => {
    const type = getKey(label)
    if (type && isWeaponCharac(type)) {
        return type
    }
    console.log('Not type found weaponCharac', { label })
    return null
})

export const getWeaponCharacSrcImg = label => {
    const charac = getWeaponCharacType(label)
    return charac ? translations?.[charac]?.imgUrl : null
}

export const getDefaultPassiveImg = memoize(() => 'passif.png')

export const isWeaponCharac = memoize(type =>
    WEAPONS_CHARACTERISTICS?.some(
        statInArray =>
            toURLValid(statInArray) === toURLValid(translations?.[type]?.fr)
    )
)
export const isStat = memoize(type =>
    STATS?.some(
        statInArray =>
            toURLValid(statInArray) === toURLValid(translations?.[type]?.fr)
    )
)
export const isPassif = memoize(type => !isStat(type) && !isWeaponCharac(type))
