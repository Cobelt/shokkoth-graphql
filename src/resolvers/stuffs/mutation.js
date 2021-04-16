import axios from 'axios'
import set from 'lodash.set'

import { STATS } from '../../constants'
import { Users, Stuffs, Characters, Equipments } from '../../models'
import {
    removeSuperfluxElements,
    verifyBothAreSameCategory,
} from '../../models/stuffs'

import { getUserId } from '../auth'
import { dofusbookStatsMap } from '../import'

import { IMPORT_STUFF_REGEX } from './static'

export async function equip({ source, args, context, info }) {
    try {
        const { equipmentId, replacedEquipmentId, stuffId } = args

        const stuff = await Stuffs.findOne({ _id: stuffId })
        const { equipments: equipmentsIds } = stuff

        if (replacedEquipmentId) {
            if (
                await verifyBothAreSameCategory(
                    equipmentId,
                    replacedEquipmentId
                )
            ) {
                const indexOfReplaced = equipmentsIds.indexOf(
                    replacedEquipmentId
                )
                if (indexOfReplaced !== -1) {
                    equipmentsIds[indexOfReplaced] = equipmentId
                    set(stuff, 'equipments', equipmentsIds)
                    const saved = await stuff.save()
                    return saved
                }
            }
        }

        const filteredEquipmentsIds = await removeSuperfluxElements([
            ...equipmentsIds,
            equipmentId,
        ])
        if (
            Math.abs(
                (equipmentsIds || []).length -
                    (filteredEquipmentsIds || []).length
            ) <= 1
        ) {
            set(stuff, 'equipments', filteredEquipmentsIds)
        }
        const saved = await stuff.save()
        return saved
    } catch (e) {
        console.log('error:', e)
        return e
    }
}

export async function unequip({ source, args, context, info }) {
    try {
        const { equipmentId, stuffId } = args

        const stuff = await Stuffs.findOneAndUpdate(
            { _id: stuffId },
            { $pull: { equipments: equipmentId } },
            { new: true }
        )
        return stuff
    } catch (e) {
        return e
    }
}

export const emptyEquipments = async ({ source, args, context, info }) => {
    try {
        const { equipmentId, stuffId } = args

        const stuff = await Stuffs.findOneAndUpdate(
            { _id: stuffId },
            { $set: { equipments: [] } },
            { new: true }
        )
        return stuff
    } catch (e) {
        return e
    }
}

export async function save(rp) {
    try {
        const { stuffId, record } = rp.args

        if (stuffId) {
            return await updateOne(rp)
        } else {
            return await createOne(rp)
        }
    } catch (e) {
        console.log(e)
        return e
    }
}

export async function createOne(rp) {
    try {
        const { record } = rp.args
        const userId = getUserId(rp)

        const stuff = await Stuffs.create(record)
        await Users.updateOne({ _id: userId }, { $push: { stuffs: stuff._id } })

        return stuff
    } catch (e) {
        console.error(e)
        return e
    }
}

export async function duplicateOne(rp) {
    try {
        const { stuffId } = rp.args
        const userId = getUserId(rp)

        const existing = await Stuffs.findOne({ _id: stuffId }).exec()
        const stuff = await Stuffs.create({
            ...existing._doc,
            _id: undefined,
            isNew: true,
        })
        await Users.updateOne(
            { _id: userId },
            { $push: { stuffs: stuff._id } }
        ).exec()

        return Stuffs.findOne({ _id: stuff._id })
    } catch (e) {
        console.log(e)
        return e
    }
}

export async function updateOne({ source, args, context, info }) {
    try {
        const { stuffId, record } = args

        return Stuffs.updateOne({ _id: stuffId }, { $set: record })
    } catch (e) {
        console.error(e)
        return e
    }
}

export async function removeOne({ source, args, context, info }) {
    try {
        const { stuffId } = args

        await Characters.updateOne(
            { stuffs: stuffId },
            { $pull: { stuffs: stuffId } }
        ).exec()
        return Stuffs.deleteOne({ _id: stuffId })
    } catch (e) {
        return e
    }
}

export async function importStuff({ source, args, context, info }) {
    try {
        const { link, ...otherArgs } = args

        const { groups } = link.match(IMPORT_STUFF_REGEX) || {}
        const { domain, id } = groups || {}

        switch (domain) {
            case 'dofusbook': {
                if ((id ?? '') === '') {
                    throw "Didn't found any id in this url"
                }

                const { data } = await axios.get(
                    'https://dofusbook.net/stuffs/dofus/public/' + id
                )

                const { stuff, stuffStats, items, fmGlobal } = data || {}

                const ankamaIds = items?.map(item => item?.official)
                const equipments = await Equipments.find(
                    {
                        ankamaId: { $in: ankamaIds },
                    },
                    { _id: true }
                )

                const equipmentsIds =
                    equipments?.length > 0
                        ? equipments?.map(equipment => equipment?._id)
                        : []

                const record = {
                    name: stuff?.name || 'Imported from Dofusbook',
                    breed: stuff?.character_class,
                    gender: stuff?.character_gender === 1 ? 'female' : 'male',
                    equipments: equipmentsIds,
                    smithmagic:
                        fmGlobal &&
                        Object.fromEntries(
                            Object.entries(fmGlobal)?.map(([dbStat, value]) => [
                                STATS.getKey(dofusbookStatsMap[dbStat]),
                                value,
                            ])
                        ),
                    baseStats: {
                        attributed: {
                            VITALITY: stuffStats?.base_vi,
                            WIDSDOM: stuffStats?.base_sa,
                            STRENGTH: stuffStats?.base_fo,
                            INTELLIGENCE: stuffStats?.base_in,
                            CHANCE: stuffStats?.base_ch,
                            AGILITY: stuffStats?.base_ag,
                        },
                        scroll: {
                            VITALITY: stuffStats?.scroll_vi,
                            WIDSDOM: stuffStats?.scroll_sa,
                            STRENGTH: stuffStats?.scroll_fo,
                            INTELLIGENCE: stuffStats?.scroll_in,
                            CHANCE: stuffStats?.scroll_ch,
                            AGILITY: stuffStats?.scroll_ag,
                        },
                        public: true,
                    },
                }

                return await createOne({
                    source,
                    args: { record, ...otherArgs },
                    context,
                    info,
                })
            }
            case 'd-bk': {
                const { request } = await axios.get(link)
                const responseUrl = request?.res?.responseUrl
                if (!responseUrl) {
                    throw "Couldn't find stuff"
                }
                return await importStuff({
                    source,
                    args: { link: responseUrl, ...otherArgs },
                    context,
                    info,
                })
            }

            default: {
                throw new Error('Domain should be dofusbook.net or d-bk.net')
            }
        }
    } catch (error) {
        console.error(error)
        return error
    }
}
