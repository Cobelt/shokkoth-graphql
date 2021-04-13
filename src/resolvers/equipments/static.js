import set from 'lodash.set'

export const setFilterType = (rp, type) => {
    set(rp, 'args.filter.type', type)
    return rp
}

export const setFilterTypes = (rp, types) => {
    set(rp, 'args.filter.type', { $in: [types].flat() })
    return rp
}
