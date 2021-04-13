import set from 'lodash.set'

import { Breeds, Stuffs } from '../../models'

export const hasStuff = {
    name: 'hasStuffIn',
    type: '[MongoID]',
    query: (query, value) => {
        set(query, 'stuffs.$in', value)
        return query
    },
}

export const withStuffs = {
    name: 'withStuffs',
    type: 'Boolean',
    query: (query, value) => {
        set(query, 'stuffs', { $exists: value, $ne: [] })
        return query
    },
}

export const searchStuffs = {
    name: 'searchStuffs',
    type: 'String',
    query: async (query, value) => {
        if (value.length < 2) return query
        const breeds = await Breeds.find({ name: { $regex: value } })
        const stuffs = await Stuffs.find({
            $or: [
                { breed: { $in: breeds.map(b => b._id) } },
                { name: { $regex: value } },
            ],
        })
        set(
            query,
            'stuffs.$in',
            stuffs.map(s => s._id)
        )

        return query
    },
}
