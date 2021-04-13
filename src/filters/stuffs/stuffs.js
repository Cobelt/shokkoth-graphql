import set from 'lodash.set'

import { Characters, Breeds, Equipments } from '../../models'

export const fromCharacter = {
    name: 'fromCharacter',
    type: '[MongoID]',
    query: (query, value) => {
        set(query, 'character.$in', value)
        return query
    },
}

export const searchName = {
    name: 'searchName',
    type: 'String',
    query: (query, value) => {
        if (value.length < 2) return query
        set(query, 'name', new RegExp(value, 'i'))
        return query
    },
}

export const notEmptyStuffs = {
    name: 'notEmpty',
    type: 'Boolean',
    query: (query, value) => {
        set(query, 'equipments', { $exists: value, $ne: [] })
        return query
    },
}

export const almostFullStuff = {
    name: 'almostFullStuff',
    type: 'Boolean',
    query: (query, value) => {
        // there is at least 15 equipments in the stuff
        set(query, 'equipments.[14]', { $exists: value })
        return query
    },
}

export const search = {
    name: 'search',
    type: 'String',
    query: async (query, value) => {
        if (value.length < 2) return query

        const regex = new RegExp(value, 'i')
        const breeds = await Breeds.find({ name: regex })
        const characters = await Characters.find({
            breed: { $in: breeds.map(b => b._id) },
        })

        const equipments = await Equipments.find({ name: regex })
        set(query, '$or', [
            { _id: { $in: characters.map(c => c.stuffs).flat() } },
            { name: regex },
            { equipments: { $in: equipments.map(e => e._id) } },
            { tags: regex },
        ])
        return query
    },
}
