import set from 'lodash.set'

import { Equipments } from '../../models'

export const searchName = {
    name: 'searchName',
    type: 'String',
    query: (query, value) => {
        if (value.length < 2) return query
        set(query, 'name', new RegExp(value, 'i'))
        return query
    },
}

export const search = {
    name: 'search',
    type: 'String',
    query: async (query, value) => {
        if (value.length < 2) return query
        const equipments = await Equipments.find({
            $or: [
                { name: { $regex: value } },
                { type: { $regex: value } },
                { category: { $regex: value } },
            ],
        })

        set(query, '$or', [
            { name: new RegExp(value, 'i') },
            { 'bonus.statistics.name': new RegExp(value, 'i') },
            { 'bonus.characteristics.name': new RegExp(value, 'i') },
            { 'bonus.passives.name': new RegExp(value, 'i') },
            { 'equipments.$in': equipments.map(e => e._id) },
        ])
        return query
    },
}
