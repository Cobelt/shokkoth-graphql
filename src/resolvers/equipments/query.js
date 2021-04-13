import { WEAPONS } from '../../constants'
import {
    AMULET,
    BACKPACK,
    BELT,
    BOOTS,
    CLOAK,
    DOFUS,
    getKey,
    HAT,
    RING,
    SHIELD,
    TROPHY,
    PRYSMARADITE,
} from '../../constants/equipments'
import { MOUNT } from '../../constants/mounts'
import { PET, PETSMOUNT } from '../../constants/pets'
import { setFilterType, setFilterTypes } from './static'

export const hatOnly = next => rp => next(setFilterType(rp, getKey(HAT)))
export const amuletOnly = next => rp => next(setFilterType(rp, getKey(AMULET)))
export const beltOnly = next => rp => next(setFilterType(rp, getKey(BELT)))
export const bootsOnly = next => rp => next(setFilterType(rp, getKey(BOOTS)))
export const ringOnly = next => rp => next(setFilterType(rp, getKey(RING)))
export const shieldOnly = next => rp => next(setFilterType(rp, getKey(SHIELD)))
export const cloakOnly = next => rp => next(setFilterType(rp, getKey(CLOAK)))
export const backpackOnly = next => rp =>
    next(setFilterType(rp, getKey(BACKPACK)))
export const dofusOnly = next => rp => next(setFilterType(rp, getKey(DOFUS)))
export const trophyOnly = next => rp => next(setFilterType(rp, getKey(TROPHY)))
export const petOnly = next => rp => next(setFilterType(rp, getKey(PET)))
export const petsmountOnly = next => rp =>
    next(setFilterType(rp, getKey(PETSMOUNT)))
export const mountOnly = next => rp => next(setFilterType(rp, getKey(MOUNT)))

// TODO Add Prysmaradite
export const dofusTrophiesPrysma = next => rp =>
    next(
        setFilterTypes(rp, [
            getKey(DOFUS),
            getKey(TROPHY),
            getKet(PRYSMARADITE),
        ])
    )
export const backOnly = next => rp =>
    next(setFilterTypes(rp, [getKey(CLOAK), getKey(BACKPACK)]))
export const weaponOnly = next => rp => next(setFilterTypes(rp, WEAPONS.ENUM))
