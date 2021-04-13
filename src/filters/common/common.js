import set from 'lodash.set'

export const ankamaIdIn = {
    name: 'ankamaIdIn',
    type: '[Float]',
    description: 'Filter on a list of AnkamaIds',
    query: (query, value) => {
        set(query, 'ankamaId', { $in: value })
        return query
    },
}

export const setAnkamaIdIn = {
    name: 'setAnkamaIdIn',
    type: '[Float]',
    description: "Filter on the set's AnkamaId with a list of AnkamaIds",
    query: (query, value) => {
        set(query, 'set.ankamaId', { $in: value })
        return query
    },
}
