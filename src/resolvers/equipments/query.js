import axios from 'axios'

import { COMMON, WEAPONS, STATS } from '../../constants'
import {
    AMULET,
    BACKPACK,
    BELT,
    BOOTS,
    CLOAK,
    DOFUS,
    HAT,
    RING,
    SHIELD,
    TROPHY,
    PRYSMARADITE,
} from '../../constants/equipments'
import { BOW } from '../../constants/weapons'

import { Equipments } from '../../models'
import { formatImgUrl, deepMerge } from '../../utils'

import { setFilterType, setFilterTypes } from './static'

export const hatOnly = next => rp => next(setFilterType(rp, COMMON.getKey(HAT)))
export const amuletOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(AMULET)))
export const beltOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(BELT)))
export const bootsOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(BOOTS)))
export const ringOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(RING)))
export const shieldOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(SHIELD)))
export const cloakOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(CLOAK)))
export const backpackOnly = next => rp =>
    next(setFilterType(rp, getKey(BACKPACK)))
export const dofusOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(DOFUS)))
export const trophyOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(TROPHY)))

// MULTIPLE TYPES
// TODO Add Prysmaradite
export const dofusTrophiesPrysma = next => rp =>
    next(
        setFilterTypes(rp, [
            COMMON.getKey(DOFUS),
            COMMON.getKey(TROPHY),
            getKet(PRYSMARADITE),
        ])
    )
export const backOnly = next => rp =>
    next(setFilterTypes(rp, [COMMON.getKey(CLOAK), COMMON.getKey(BACKPACK)]))

// PET, PETSMOUNT, MOUNT
export const petOnly = next => rp => next(setFilterType(rp, COMMON.getKey(PET)))
export const petsmountOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(PETSMOUNT)))
export const mountOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(MOUNT)))

export const swordOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(SWORD)))
export const hammerOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(HAMMER)))
export const scytheOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(SCYTHE)))
export const bowOnly = next => rp => next(setFilterType(rp, COMMON.getKey(BOW)))
export const axeOnly = next => rp => next(setFilterType(rp, COMMON.getKey(AXE)))
export const daggerOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(DAGGER)))
export const pickaxeOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(PICKAXE)))
export const wandOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(WAND)))
export const staffOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(STAFF)))
export const shovelOnly = next => rp =>
    next(setFilterType(rp, COMMON.getKey(SHOVEL)))
export const weaponOnly = next => rp => next(setFilterTypes(rp, WEAPONS.ENUM))

export async function generateCreateOneFromDatafus(rp) {
    try {
        const { searchName, ankamaId, urlDatafus } = rp?.args || {}

        const { data } = await axios.get(urlDatafus)

        if (Array.isArray(data) && data?.length > 0) {
            const found = data?.find(
                equip =>
                    equip?.name?.match(new RegExp(searchName, 'i')) ||
                    (ankamaId && equip?.ankamaId == ankamaId)
            )
            if (!found) {
                throw new Error('No item found with this name')
            }

            const { id, img, type, set, effects, craft, ...noFormatRequired } =
                found || {}

            const statistics = []
            const otherStats = []
            const passives = []

            if (effects?.length > 0) {
                effects.forEach(effect => {
                    const match = effect?.match(
                        /^(?<min>-?\d+) (?:à (?<max>-?\d+))? ?(?<name>.+)$/
                    )

                    const { min, max = min, value = max, name } =
                        match?.groups || {}
                    const type = STATS.getKey(name)

                    if (type) {
                        statistics.push({ min, max, value, type })
                    } else if (name) {
                        otherStats.push({
                            min,
                            max,
                            value,
                            name,
                        })
                    } else {
                        passives.push({
                            min,
                            max,
                            value,
                            name: effect,
                        })
                    }
                })
            }

            const trueType = COMMON.getKey(type)
            const setAnkamaId = set?.match(/panoplies\/(?<setAnkamaId>\d+)/)
                ?.groups?.setAnkamaId

            const record = {
                ...noFormatRequired,
                ankamaId: id,
                imgUrl: img,
                statistics,
                passives,
                otherStats,
                type: trueType,
                category: COMMON.getCategory(trueType),
                typeOrder: COMMON.getOrder(trueType),
                setAnkamaId: (set && parseInt(setAnkamaId, 10)) || undefined,
            }

            return { record: formatImgUrl(record) }
        } else {
            console.log({ data })
            throw new Error('Data is not an array or is empty')
        }
    } catch (e) {
        console.error(e)
        return e
    }
}

export async function missingComparedToDatafus(rp) {
    try {
        const { urlDatafus, urlDofapi } = rp?.args || {}

        const { data: datafus } = await axios.get(urlDatafus)
        const { data: dofapi } = await axios.get(urlDofapi)

        const merged = datafus?.map(item => {
            const found = dofapi.find(
                i =>
                    i?.ankamaId === item?.ankamaId &&
                    COMMON.getKey(i?.type) === COMMON.getKey(item?.ankamaId)
            )
            deepMerge(item, found)
        })

        if (Array.isArray(merged) && merged?.length > 0) {
            const toReturn = await Promise.all(
                merged
                    ?.map(async equip => {
                        const { name, id: ankamaId } = equip || {}
                        const found = await Equipments?.findOne({
                            name,
                        })
                        // const found2 = await Equipments?.findOne({
                        //     ankamaId,
                        // })
                        // if (found?.ankamaId !== found2?.ankamaId) {
                        //     console.log('found two different result', {
                        //         found,
                        //         found2,
                        //     })
                        // }
                        if (found) return null
                        return { name, ankamaId }
                    })
                    .filter(e => !!e)
            )
            return toReturn?.filter(e => !!e)
        } else {
            console.log({ merged })
            throw new Error('Data is not an array or is empty')
        }
    } catch (e) {
        console.error(e)
        return e
    }
}
