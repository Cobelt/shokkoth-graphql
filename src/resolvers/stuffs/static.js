import set from 'lodash.set'
import memoize from 'lodash.memoize'

import { STATS } from '../../constants'
import { Users, Stuffs } from '../../models'
import { getUserId, isAtLeastAdmin } from '../auth'

export const IMPORT_STUFF_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?<domain>dofusbook|d-bk)\.net\/(?:fr|es|en)\/(?:equipe?ments?||d)\/(?:(?<id>\d+)|.+)?/

export async function isStuffOwner(userId, stuffId) {
    if (!stuffId) return true
    if (!userId) return false
    const users = await Users.find({ stuffs: { $in: stuffId } })

    return users.find(user => user._id == userId)
}

export const canSeeStuff = next => async rp => {
    const userId = rp?.context?.userId || getUserId(rp)
    const stuffId = rp?.args?.stuffId

    if (!isStuffOwner(userId, stuffId) && !isAtLeastAdmin(rp)) {
        const stuff = await Stuffs.findOne({ _id: stuffId })
        if (stuff?.public) {
            return next(rp)
        }
        return next('User does not have access to this stuff.')
    }

    return next(rp)
}

export const canUpdateStuff = next => rp => {
    const userId = rp?.context?.userId || getUserId(rp)

    if (!isStuffOwner(userId, rp?.args?.stuffId) && !isAtLeastAdmin(rp)) {
        return next(new Error('User does not have access to this stuff.'))
    }

    return next(rp)
}

export const forcePublicFilter = next => rp => {
    if (!isAtLeastAdmin(rp)) {
        set(rp, 'args.filter.public', true) // added only if not admin
    }
    return next(rp)
}

export const addNotEmptyFilter = next => rp => {
    set(rp, 'args.filter.notEmpty', true)
    return next(rp)
}

export const sortByLatest = next => rp => {
    if (!rp?.args?.sort) {
        set(rp, 'args.sort', '-updatedAt') // added only if no sort are already set
    }
    return next(rp)
}

export function initStats() {
    return Object.fromEntries(STATS?.ENUM?.map(stat => [stat, 0]))
}

export const getCurrentSetsBonuses = memoize(
    equipments => {
        const itemsPerSet = {}
        const equipmentsWithSet = Object.values(equipments)
            .map(equipment => ({
                equipmentId: equipment?._id,
                setId: equipment?.setId,
            }))
            .filter(e => !!e?.setId)
        equipmentsWithSet.forEach(({ equipmentId, setId }) => {
            if (setId) {
                if (!itemsPerSet?.[setId]) {
                    itemsPerSet[setId] = {
                        nbItems: 1,
                        equiped: [equipmentId],
                        setId,
                    }
                } else {
                    itemsPerSet[setId].nbItems++
                    itemsPerSet[setId].equiped?.push(equipmentId)
                }
            }
        })
        return Object.values(itemsPerSet).filter(i => i.nbItems > 1)
    },
    equipments =>
        JSON.stringify(equipments?.length > 0 && equipments?.map(e => e?._id))
)
