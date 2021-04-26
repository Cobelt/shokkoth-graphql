import { composeWithMongoose } from 'graphql-compose-mongoose'

import { Sets } from '../../models'
import { adminAccess } from '../../resolvers/auth'
import * as rsv from '../../resolvers/sets'
import { COMMON, SETS } from '../../filters'

export default function useSets(schemaComposer, customizationOptions = {}) {
    const SetsTC = composeWithMongoose(Sets, customizationOptions)

    SetsTC.setResolver(
        'findMany',
        SetsTC.get('$findMany')
            .addFilterArg(COMMON.ankamaIdIn)
            .addFilterArg(SETS.search)
            .addFilterArg(SETS.searchName)
    )

    SetsTC.setResolver(
        'findOne',
        SetsTC.get('$findOne')
            .addFilterArg(COMMON.ankamaIdIn)
            .addFilterArg(SETS.search)
            .addFilterArg(SETS.searchName)
    )

    SetsTC.addResolver({
        name: 'importFromDofapi',
        type: [SetsTC],
        args: { ankamaId: '[String]' },
        resolve: rsv.importFromDofapi,
    })

    SetsTC.addResolver({
        name: 'importSetsBonuses',
        type: [SetsTC],
        args: { startId: 'Float', endId: 'Float' },
        resolve: rsv.importSetsBonuses,
    })

    schemaComposer.Query.addFields({
        setById: SetsTC.get('$findById'),
        setByIds: SetsTC.get('$findByIds'),
        setOne: SetsTC.get('$findOne'),
        setMany: SetsTC.get('$findMany'),
        setCount: SetsTC.get('$count'),
        ...adminAccess({
            setConnection: SetsTC.get('$connection'),
            setPagination: SetsTC.get('$pagination'),
        }),
    })

    schemaComposer.Mutation.addFields({
        ...adminAccess({
            importSets: SetsTC.get('$importFromDofapi'),
            importSetsBonuses: SetsTC.get('$importSetsBonuses'),
            setCreateOne: SetsTC.get('$createOne'),
            setCreateMany: SetsTC.get('$createMany'),
            setUpdateById: SetsTC.get('$updateById'),
            setUpdateOne: SetsTC.get('$updateOne'),
            setUpdateMany: SetsTC.get('$updateMany'),
            setRemoveById: SetsTC.get('$removeById'),
            setRemoveOne: SetsTC.get('$removeOne'),
            setRemoveMany: SetsTC.get('$removeMany'),
        }),
    })
    return SetsTC
}
