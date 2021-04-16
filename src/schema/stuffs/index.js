import { composeWithMongoose } from 'graphql-compose-mongoose'
import { Stuffs, Stats } from '../../models'

import { canUpdateCharacter } from '../../resolvers/characters'
import { adminAccess } from '../../resolvers/auth'
import * as resolvers from '../../resolvers/stuffs'

import { STUFFS } from '../../filters'

export default function useStuffs(
    schemaComposer,
    customizationOptions = {},
    { StatsTC } = {}
) {
    const StuffsTC = composeWithMongoose(Stuffs, customizationOptions)

    StuffsTC.setResolver(
        'findMany',
        STUFFS.addFilters(StuffsTC.get('$findMany'))
    )

    StuffsTC.setResolver('findOne', STUFFS.addFilters(StuffsTC.get('$findOne')))

    StuffsTC.addResolver({
        name: 'myStuffs',
        type: [StuffsTC],
        args: StuffsTC.get('$findMany').getArgs(),
        resolve: resolvers.myStuffs,
    })

    StuffsTC.addResolver({
        name: 'getEquipmentsStats',
        type: 'JSON',
        args: { equipments: '[MongoID]' },
        resolve: resolvers.getEquipmentsStats,
    })

    StuffsTC.addResolver({
        name: 'getSetsBonuses',
        type: 'JSON',
        args: { equipments: '[MongoID]', stuffId: 'MongoID!' },
        resolve: resolvers.getSetsBonuses,
    })

    StuffsTC.addResolver({
        name: 'getStats',
        type: StatsTC,
        args: { equipments: '[MongoID]', stuffId: 'MongoID!' },
        resolve: resolvers.getStats,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'equip',
        type: StuffsTC,
        args: {
            stuffId: 'MongoID!',
            equipmentId: 'MongoID!',
            replacedEquipmentId: 'MongoID',
        },
        resolve: resolvers.equip,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'unequip',
        type: StuffsTC,
        args: { stuffId: 'MongoID!', equipmentId: 'MongoID!' },
        resolve: resolvers.unequip,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'emptyEquipments',
        type: StuffsTC,
        args: { stuffId: 'MongoID!' },
        resolve: resolvers.emptyEquipments,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'saveStuff',
        type: StuffsTC,
        // change args to public / name / level / equipments ?
        args: {
            record: StuffsTC.get('$updateOne').getArgs().record,
            stuffId: 'MongoID!',
        },
        resolve: resolvers.save,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'createStuff',
        type: StuffsTC,
        args: StuffsTC.get('$createOne').getArgs(),
        resolve: resolvers.createOne,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'updateOne',
        type: StuffsTC,
        args: {
            stuffId: 'MongoID!',
            record: StuffsTC.get('$updateOne').getArgs()?.record,
        },
        resolve: resolvers.updateOne,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'duplicateStuff',
        type: StuffsTC,
        args: { stuffId: 'MongoID!', characterId: 'MongoID' },
        resolve: resolvers.duplicateOne,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'removeStuff',
        type: StuffsTC,
        args: { stuffId: 'MongoID!' },
        resolve: resolvers.removeOne,
    })

    StuffsTC.addResolver({
        kind: 'mutation',
        name: 'importStuff',
        type: StuffsTC,
        args: { link: 'String!', characterId: 'MongoID' },
        resolve: resolvers.importStuff,
    })

    schemaComposer.Query.addFields({
        myStuffs: StuffsTC.get('$myStuffs'),
        stuffOne: StuffsTC.get('$findOne')
            .wrapResolve(resolvers.forcePublicFilter)
            .wrapResolve(resolvers.addNotEmptyFilter)
            .wrapResolve(resolvers.sortByLatest),

        stuffMany: StuffsTC.get('$findMany')
            .wrapResolve(resolvers.forcePublicFilter)
            .wrapResolve(resolvers.addNotEmptyFilter)
            .wrapResolve(resolvers.sortByLatest),

        stuffCount: StuffsTC.get('$count').wrapResolve(
            resolvers.forcePublicFilter
        ),
        ...adminAccess({
            // stuffConnection: StuffsTC.get('$connection'),
            // stuffPagination: StuffsTC.get('$pagination'),
            stuffAll: StuffsTC.get('$findMany'),
        }),
    })

    schemaComposer.Mutation.addFields({
        equip: StuffsTC.get('$equip').wrapResolve(resolvers.canUpdateStuff),
        unequip: StuffsTC.get('$unequip').wrapResolve(resolvers.canUpdateStuff),
        emptyEquipments: StuffsTC.get('$emptyEquipments').wrapResolve(
            resolvers.canUpdateStuff
        ),

        duplicateStuff: StuffsTC.get('$duplicateStuff')
            .wrapResolve(canUpdateCharacter)
            .wrapResolve(resolvers.canSeeStuff),
        saveStuff: StuffsTC.get('$saveStuff').wrapResolve(
            resolvers.canUpdateStuff
        ),
        createStuff: StuffsTC.get('$createStuff'),
        updateStuff: StuffsTC.get('$updateOne').wrapResolve(
            resolvers.canUpdateStuff
        ),
        removeStuff: StuffsTC.get('$removeStuff').wrapResolve(
            resolvers.canUpdateStuff
        ),
        importStuff: StuffsTC.get('$importStuff').wrapResolve(
            canUpdateCharacter
        ),

        ...adminAccess({
            stuffUpdateById: StuffsTC.get('$updateById'),
            stuffUpdateOne: StuffsTC.get('$updateOne'),
            stuffUpdateMany: StuffsTC.get('$updateMany'),
            stuffRemoveById: StuffsTC.get('$removeById'),
            stuffRemoveOne: StuffsTC.get('$removeOne'),
            stuffRemoveMany: StuffsTC.get('$removeMany'),
        }),
    })
    return StuffsTC
}
