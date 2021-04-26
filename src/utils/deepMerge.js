function isMergeableObject(val) {
    let nonNullObject = val && typeof val === 'object'

    return (
        nonNullObject &&
        Object.prototype.toString.call(val) !== '[object RegExp]' &&
        Object.prototype.toString.call(val) !== '[object Date]'
    )
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    let clone = optionsArgument && optionsArgument.clone === true
    return clone && isMergeableObject(value)
        ? deepMerge(emptyTarget(value), value, optionsArgument)
        : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    let destination = target.slice()
    source.forEach(function (e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument)
        } else if (isMergeableObject(e)) {
            destination[i] = deepMerge(target[i], e, optionsArgument)
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument))
        }
    })
    return destination
}

export function arrayMergeById(target, source, optionsArgument) {
    let destination = target.slice()
    source.forEach(function (e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument)
        } else if (
            target.findIndex(
                item => parseInt(item?.id, 10) === parseInt(e?.id, 10)
            ) === -1
        ) {
            destination.push(cloneIfNecessary(e, optionsArgument))
        } else if (isMergeableObject(e)) {
            destination[i] = deepMerge(target[i], e, optionsArgument)
        }
    })
    return destination
}

export function arrayOverride(target, source, optionsArgument) {
    return source
}

function mergeObject(target, source, optionsArgument) {
    let destination = {}
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target?.[key], optionsArgument)
        })
    }
    if (isMergeableObject(source)) {
        Object.keys(source).forEach(function (key) {
            if (!isMergeableObject(source?.[key]) || !target?.[key]) {
                if (
                    source?.[key] === null &&
                    !['', null, undefined].includes(target?.[key]) &&
                    optionsArgument &&
                    optionsArgument.ignoreNull === true
                ) {
                    destination[key] = cloneIfNecessary(
                        target?.[key],
                        optionsArgument
                    )
                } else {
                    destination[key] = cloneIfNecessary(
                        source?.[key],
                        optionsArgument
                    )
                }
            } else {
                destination[key] = deepMerge(
                    target?.[key],
                    source?.[key],
                    optionsArgument
                )
            }
        })
    }
    return destination
}

function deepMerge(target, source, optionsArgument) {
    let array = Array.isArray(source)
    let options = optionsArgument || { arrayMerge: defaultArrayMerge }
    let arrayMerge = options.arrayMerge || defaultArrayMerge

    if (array) {
        return Array.isArray(target)
            ? arrayMerge(target, source, optionsArgument)
            : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepMerge.all = function deepMergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error(
            'first argument should be an array with at least two elements'
        )
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function (prev, next) {
        return deepMerge(prev, next, optionsArgument)
    })
}

export default deepMerge
