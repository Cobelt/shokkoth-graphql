import memoize from 'lodash.memoize'

export const tryParse = memoize(item => {
    let parsed = typeof item !== 'string' ? JSON.stringify(item) : item

    try {
        parsed = JSON.parse(item)
    } catch (e) {
        return item
    }

    if (parsed instanceof Object && parsed !== null) {
        return parsed
    }

    return undefined
})
