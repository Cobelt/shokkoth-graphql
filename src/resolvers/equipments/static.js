import set from 'lodash.set'

export const setFilterType = (rp, type) => {
    set(rp, 'args.filter.type', type)
    return rp
}

export const setFilterTypes = (rp, types) => {
    set(rp, 'args.filter.type', { $in: [types].flat() })
    return rp
}

export const useEquipments = next => rp => {
    set(rp, 'args.urlDofapi', 'https://fr.dofus.dofapi.fr/equipments')
    set(
        rp,
        'args.urlDatafus',
        'https://lucberge.github.io/Datafus/21.01.27/fr/equipments'
    )
    return next(rp)
}

export const useWeapons = next => rp => {
    set(rp, 'args.urlDofapi', 'https://fr.dofus.dofapi.fr/weapons')
    set(
        rp,
        'args.urlDatafus',
        'https://lucberge.github.io/Datafus/21.01.27/fr/weapons'
    )
    return next(rp)
}

export const usePets = next => rp => {
    set(rp, 'args.urlDofapi', 'https://fr.dofus.dofapi.fr/pets')
    set(
        rp,
        'args.urlDatafus',
        'https://lucberge.github.io/Datafus/21.01.27/fr/pets'
    )

    return next(rp)
}

export const useMounts = next => rp => {
    set(rp, 'args.urlDofapi', 'https://fr.dofus.dofapi.fr/mounts')
    set(
        rp,
        'args.urlDatafus',
        'https://lucberge.github.io/Datafus/21.01.27/fr/mounts'
    )
    return next(rp)
}
