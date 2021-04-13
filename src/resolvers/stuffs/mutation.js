import set from 'lodash.set'

import { Users, Stuffs, Characters } from '../../models'
import {
    removeSuperfluxElements,
    verifyBothAreSameCategory,
} from '../../models/stuffs'
import { getUserId } from '../auth'

export const equip = async ({ source, args, context, info }) => {
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

export const removeEquipment = async ({ source, args, context, info }) => {
    try {
        const { equipmentId, stuffId } = args

        const stuff = await Stuffs.updateOne(
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

        const stuff = await Stuffs.updateOne(
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
        await Users.updateOne(
            { _id: userId },
            { $push: { stuffs: stuff._id } }
        ).exec()

        return Stuffs.findOne({ _id: stuff._id })
    } catch (e) {
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

        return Stuffs.updateOne({ _id: stuffId }, record, { new: true })
    } catch (e) {
        return e
    }
}

export async function removeOne({ source, args, context, info }) {
    try {
        const { stuffId } = args

        await Characters.update(
            { stuffs: stuffId },
            { $pull: { stuffs: stuffId } }
        ).exec()
        return Stuffs.deleteOne({ _id: stuffId })
    } catch (e) {
        return e
    }
}
