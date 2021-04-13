import set from 'lodash.set'

import { Users, Stuffs, Breeds, Equipments } from '../../models'
import { getUserId } from '../auth'

export const myStuffs = async rp => {
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
