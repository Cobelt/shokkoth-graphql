import set from 'lodash.set'

import { COMMON } from '../../constants'

// export const withCharacters = {
//     name: 'withCharacters',
//     type: 'Boolean',
//     query: (query, value) => {
//         set(query, 'characters.[0]', { $exists: value })
//     },
// }

export const fromSet = {
    name: 'fromSet',
    type: 'MongoID',
    query: (query, value) => {
        set(query, 'set.$in', value)
    },
}

export const fromOneOfThoseSets = {
    name: 'fromSet',
    type: '[MongoID]',
    query: (query, value) => {
        set(query, 'set.$in', value)
    },
}

export const levelMin = {
    name: 'levelMin',
    type: 'Float',
    query: (query, value) => {
        console
        set(query, 'level.$gte', value)
    },
}

export const levelMax = {
    name: 'levelMax',
    type: 'Float',
    query: (query, value) => {
        set(query, 'level.$lte', value)
    },
}

export const typeIn = {
    name: 'typeIn',
    type: '[EnumEquipmentsType]',
    query: (query, value) => {
        set(query, 'type.$in', value)
    },
}

export const categoryIn = {
    name: 'categoryIn',
    type: '[String]',
    query: (query, value) => {
        set(query, 'category.$in', value)
    },
}

export const statsAll = {
    name: 'statsAll',
    type: '[String]',
    query: (query, value) => {
        set(
            query,
            '$and',
            value.map(v => ({
                statistics: { name: new RegExp(value, 'i') },
            }))
        )
    },
}

export const searchName = {
    name: 'searchName',
    type: 'String',
    query: (query, value) => {
        if (value.length >= 2) {
            set(query, 'name', new RegExp(value, 'i'))
        }
    },
}

export const search = {
    name: 'search',
    type: 'String',
    query: (query, value) => {
        if (value.length >= 2) {
            set(query, '$or', [
                { name: new RegExp(value, 'i') },
                { 'statistics.name': new RegExp(value, 'i') },
                { 'characteristics.name': new RegExp(value, 'i') },
                { 'passives.name': new RegExp(value, 'i') },
                { 'conditions.name': new RegExp(value, 'i') },
                {
                    type: new RegExp(
                        `(${value}|${COMMON.translate(
                            value,
                            'fr'
                        )}|${COMMON.translate(value, 'en')})`,
                        'i'
                    ),
                },
            ])
        }
    },
}
