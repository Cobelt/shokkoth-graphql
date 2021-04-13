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
    weaponOnly,
    dofusTrophiesPrysma,
} from '../../resolvers/equipments'

import { COMMON, EQUIPMENTS } from '../../filters'

export function completeFilter(TC, resolverName) {
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
                ['pet' + suffix]: TC.get(rsv).wrapResolve(petOnly),
                ['petsmount' + suffix]: TC.get(rsv).wrapResolve(petsmountOnly),
                ['mount' + suffix]: TC.get(rsv).wrapResolve(mountOnly),
                ['back' + suffix]: TC.get(rsv).wrapResolve(backOnly),
                ['weapon' + suffix]: TC.get(rsv).wrapResolve(weaponOnly),
                ['dofusTrophiesPrysma' + suffix]: TC.get(rsv).wrapResolve(
                    dofusTrophiesPrysma
                ),
            }),
            {}
        )
    }

    return {}
}
