import {
    hatOnly,
    amuletOnly,
    beltOnly,
    bootsOnly,
    ringOnly,
    shieldOnly,
    cloakOnly,
    backpackOnly,
    dofusOnly,
    trophyOnly,
    petOnly,
    petsmountOnly,
    mountOnly,
    backOnly,
    dofusTrophiesPrysma,
    weaponOnly,
    swordOnly,
    hammerOnly,
    scytheOnly,
    bowOnly,
    axeOnly,
    daggerOnly,
    pickaxeOnly,
    wandOnly,
    staffOnly,
    shovelOnly,
} from '../../resolvers/equipments'

import { COMMON, EQUIPMENTS } from '../../filters'

export function completeFilters(TC, resolverName) {
    TC.setResolver(
        resolverName,
        EQUIPMENTS.addFilters(COMMON.addFilters(TC.getResolver(resolverName)))
    )
}

export function generateEquipmentsResolvers(TC, object) {
    const entries = Object.entries(object)

    if (entries?.length > 0) {
        return entries.reduce(
            (previousResolvers, [rsv, suffix]) => ({
                ...previousResolvers,
                ['hat' + suffix]: TC.get(rsv).wrapResolve(hatOnly),
                ['amulet' + suffix]: TC.get(rsv).wrapResolve(amuletOnly),
                ['belt' + suffix]: TC.get(rsv).wrapResolve(beltOnly),
                ['boots' + suffix]: TC.get(rsv).wrapResolve(bootsOnly),
                ['ring' + suffix]: TC.get(rsv).wrapResolve(ringOnly),
                ['shield' + suffix]: TC.get(rsv).wrapResolve(shieldOnly),
                ['cloak' + suffix]: TC.get(rsv).wrapResolve(cloakOnly),
                ['backpack' + suffix]: TC.get(rsv).wrapResolve(backpackOnly),
                ['dofus' + suffix]: TC.get(rsv).wrapResolve(dofusOnly),
                ['trophy' + suffix]: TC.get(rsv).wrapResolve(trophyOnly),
                ['back' + suffix]: TC.get(rsv).wrapResolve(backOnly),
                ['dofusTrophiesPrysma' + suffix]: TC.get(rsv).wrapResolve(
                    dofusTrophiesPrysma
                ),
            }),
            {}
        )
    }

    return {}
}

export function generateCreaturesResolvers(TC, object) {
    const entries = Object.entries(object)

    if (entries?.length > 0) {
        return entries.reduce(
            (previousResolvers, [rsv, suffix]) => ({
                ...previousResolvers,
                ['pet' + suffix]: TC.get(rsv).wrapResolve(petOnly),
                ['petsmount' + suffix]: TC.get(rsv).wrapResolve(petsmountOnly),
                ['mount' + suffix]: TC.get(rsv).wrapResolve(mountOnly),
            }),
            {}
        )
    }

    return {}
}

export function generateWeaponsResolvers(TC, object) {
    const entries = Object.entries(object)

    if (entries?.length > 0) {
        return entries.reduce(
            (previousResolvers, [rsv, suffix]) => ({
                ...previousResolvers,
                ['weapon' + suffix]: TC.get(rsv).wrapResolve(weaponOnly),
                ['swordOnly' + suffix]: TC.get(rsv).wrapResolve(swordOnly),
                ['hammerOnly' + suffix]: TC.get(rsv).wrapResolve(hammerOnly),
                ['scytheOnly' + suffix]: TC.get(rsv).wrapResolve(scytheOnly),
                ['bowOnly' + suffix]: TC.get(rsv).wrapResolve(bowOnly),
                ['axeOnly' + suffix]: TC.get(rsv).wrapResolve(axeOnly),
                ['daggerOnly' + suffix]: TC.get(rsv).wrapResolve(daggerOnly),
                ['pickaxeOnly' + suffix]: TC.get(rsv).wrapResolve(pickaxeOnly),
                ['wandOnly' + suffix]: TC.get(rsv).wrapResolve(wandOnly),
                ['staffOnly' + suffix]: TC.get(rsv).wrapResolve(staffOnly),
                ['shovelOnly' + suffix]: TC.get(rsv).wrapResolve(shovelOnly),
            }),
            {}
        )
    }

    return {}
}
