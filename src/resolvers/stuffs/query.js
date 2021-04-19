import set from 'lodash.set'

import { STATS } from '../../constants'
import { Users, Stuffs, Breeds, Equipments, Sets } from '../../models'
import { replaceDeep } from '../../utils'
import { getUserId } from '../auth'

import { getCurrentSetsBonuses, initStats } from './static'

export async function myStuffs(rp) {
    try {
        let { filter = {}, limit, skip } = rp.args
        const userId = getUserId(rp)
        if (!userId) throw new Error('User introuvable.', { statusCode: 403 })

        const user = await Users.findOne({ _id: userId }).exec()
        if (!user) throw new Error('User introuvable.', { statusCode: 403 })

        const { stuffs } = user || {}
        const stuffsIds =
            stuffs?.length > 0 ? stuffs.map(stuff => stuff._id) : []

        delete filter._id
        delete filter._ids

        set(filter, '_id', { $in: stuffsIds })

        if (filter.searchName) {
            set(filter, 'name', new RegExp(filter.searchName, 'i'))
            delete filter.searchName
        }
        if (filter.search && filter.search.length >= 2) {
            const breeds = await Breeds.find({
                name: { $regex: filter.search },
            })
            const equipments = await Equipments.find({
                name: { $regex: filter.search },
            })
            set(filter, '$or', [
                { name: new RegExp(filter.search, 'i') },
                { 'breed.$in': breeds.map(b => b._id) },
                { 'equipments.$in': equipments.map(e => e._id) },
                { tags: new RegExp(filter.search, 'i') },
            ])
            delete filter.search
        }

        return Stuffs.find(filter).sort('-updatedAt').skip(skip).limit(limit)
    } catch (e) {
        return e
    }
}

export async function getEquipmentsStats(rp) {
    try {
        const { equipmentsIds } = rp?.args || {}

        const stats = initStats()

        if (equipmentsIds?.length > 0) {
            const equipments = await Equipments.find(
                { _id: { $in: equipmentsIds } },
                '_id statistics setId'
            )

            equipments?.forEach(equipment => {
                equipment?.statistics?.forEach(statistic => {
                    const { type, value, max, min } = statistic || {}
                    if (type) {
                        stats[type] += parseInt(value || max || min, 10)
                    }
                })
            })

            const setsBonuses = getCurrentSetsBonuses(equipments)
            if (setsBonuses) {
                for (let { nbItems, equiped, set } of setsBonuses) {
                    const currentBonus = set.bonus.find(
                        bonus => bonus.nbItems === nbItems - 1
                    )
                    if (currentBonus?.statistics?.length > 0) {
                        for (let statistic of currentBonus.statistics) {
                            const { type, value, max, min } = statistic || {}
                            if (type) {
                                stats[type] += parseInt(value || max || min, 10)
                            }
                        }
                    }
                }
            }
        }

        return stats
    } catch (e) {
        console.error(e)
        return e
    }
}

export async function getSetsBonuses(rp) {
    try {
        const { equipmentsIds } = rp?.args || {}

        const stats = initStats()

        if (equipmentsIds?.length > 0) {
            const equipments = await Equipments.find(
                { _id: { $in: equipmentsIds } },
                '_id statistics setId'
            )

            const setsBonuses = getCurrentSetsBonuses(equipments)

            if (setsBonuses) {
                await Promise.all(
                    setsBonuses?.map(async ({ nbItems, equiped, setId }) => {
                        const setObj = await Sets.findOne({
                            _id: setId,
                        })

                        const currentBonus = setObj.bonus.find(
                            bonus => bonus.nbItems === nbItems
                        )

                        const entries = Object.entries(currentBonus?.statistics)
                        if (entries) {
                            for (let [type, value] of entries) {
                                if (type) {
                                    stats[type] += parseInt(value, 10)
                                }
                            }
                        }
                    })
                )
            }
        }

        return replaceDeep(stats, ['', null, 0], undefined)
    } catch (e) {
        console.error(e)
        return e
    }
}

export async function getSetsEquiped(rp) {
    try {
        const { equipmentsIds } = rp?.args || {}

        if (equipmentsIds?.length > 0) {
            const equipments = await Equipments.find(
                { _id: { $in: equipmentsIds } },
                '_id statistics setId'
            )

            const setsBonuses = getCurrentSetsBonuses(equipments)
            if (setsBonuses) {
                return Promise.all(
                    setsBonuses?.map(async ({ nbItems, equiped, setId }) => {
                        const set = await Sets.findOne({ _id: setId })
                        const currentBonus = set.bonus.find(
                            bonus => bonus.nbItems === nbItems - 1
                        )
                        return {
                            statistics: currentBonus?.statistics,
                            nbItems,
                            equiped,
                            setId,
                        }
                    })
                )
            }
        }

        return []
    } catch (e) {
        console.error(e)
        return e
    }
}

export async function getStats(rp) {
    try {
        const { equipmentsIds, stuffId } = rp?.args || {}

        const stuff = await Stuffs.findOne({ _id: stuffId })
        const { level = 200, baseStats, smithmagic } = stuff || {}

        const stats = initStats()

        stats[STATS.getKey(STATS.AP)] = level && level < 100 ? 6 : 7
        stats[STATS.getKey(STATS.MP)] = 3
        stats[STATS.getKey(STATS.SUMMONS)] = 1
        stats[STATS.getKey(STATS.VITALITY)] = 55 + level * 5

        const { attributed, scroll } = baseStats || {}

        if (scroll instanceof Object) {
            for (let [stat, value] of Object.entries(attributed)) {
                stats[stat] += value
            }
        }

        if (scroll instanceof Object) {
            for (let [stat, value] of Object.entries(scroll)) {
                stats[stat] += value
            }
        }

        if (smithmagic instanceof Object) {
            for (let [stat, value] of Object.entries(smithmagic)) {
                stats[stat] += value
            }
        }

        if (equipmentsIds?.length > 0) {
            const equipments = await Equipments.find(
                { _id: { $in: equipmentsIds } },
                '_id statistics setId'
            )

            equipments?.forEach(equipment => {
                equipment?.statistics?.forEach(statistic => {
                    const { type, value, max, min } = statistic || {}
                    if (type) {
                        stats[type] += parseInt(value || max || min, 10)
                    }
                })
            })

            const setsBonuses = getCurrentSetsBonuses(equipments)
            if (setsBonuses) {
                await Promise.all(
                    setsBonuses?.map(async ({ nbItems, equiped, setId }) => {
                        const setObj = await Sets.findOne({
                            _id: setId,
                        })

                        const currentBonus = setObj.bonus.find(
                            bonus => bonus.nbItems === nbItems
                        )

                        const entries = Object.entries(currentBonus?.statistics)
                        if (entries) {
                            for (let [type, value] of entries) {
                                if (type) {
                                    stats[type] += parseInt(value, 10)
                                }
                            }
                        }
                    })
                )
            }
        }

        STATS.ELEMENTS_STATS.forEach(name => {
            stats[STATS.getKey(STATS.INITIATIVE)] += stats[STATS.getKey(name)]
        })

        const bonusDodgeLock =
            Math.floor(stats[STATS.getKey(STATS.AGILITY)] / 10 || 0) || 0

        console.log({ bonusDodgeLock })
        stats[STATS.getKey(STATS.DODGE)] += bonusDodgeLock
        stats[STATS.getKey(STATS.LOCK)] += bonusDodgeLock

        const bonusProspecting =
            Math.floor(stats[STATS.getKey(STATS.CHANCE)] / 10 || 0) || 0

        stats[STATS.getKey(STATS.PROSPECTING)] += bonusProspecting

        const bonusFromWisdom =
            Math.floor(stats[STATS.getKey(STATS.WISDOM)] / 10 || 0) || 0

        stats[STATS.getKey(STATS.AP_PARRY)] += bonusFromWisdom
        stats[STATS.getKey(STATS.MP_PARRY)] += bonusFromWisdom
        stats[STATS.getKey(STATS.AP_REDUCTION)] += bonusFromWisdom
        stats[STATS.getKey(STATS.MP_REDUCTION)] += bonusFromWisdom

        return stats
    } catch (e) {
        console.error(e)
        return e
    }
}
