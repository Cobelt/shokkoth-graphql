import { composeWithMongoose } from 'graphql-compose-mongoose'

import { Resources } from '../../models'
import { adminAccess } from '../../resolvers/auth'

export default function useResources(
    schemaComposer,
    customizationOptions = {}
) {
    const ResourcesTC = composeWithMongoose(Resources, customizationOptions)
    schemaComposer.Query.addFields({
        resourceById: ResourcesTC.get('$findById'),
        resourceByIds: ResourcesTC.get('$findByIds'),
        resourceOne: ResourcesTC.get('$findOne'),
        resourceMany: ResourcesTC.get('$findMany'),
        resourceCount: ResourcesTC.get('$count'),
        ...adminAccess({
            resourceConnection: ResourcesTC.get('$connection'),
            resourcePagination: ResourcesTC.get('$pagination'),
        }),
    })

    schemaComposer.Mutation.addFields({
        ...adminAccess({
            resourceCreateOne: ResourcesTC.get('$createOne'),
            resourceCreateMany: ResourcesTC.get('$createMany'),
            resourceUpdateById: ResourcesTC.get('$updateById'),
            resourceUpdateOne: ResourcesTC.get('$updateOne'),
            resourceUpdateMany: ResourcesTC.get('$updateMany'),
            resourceRemoveById: ResourcesTC.get('$removeById'),
            resourceRemoveOne: ResourcesTC.get('$removeOne'),
            resourceRemoveMany: ResourcesTC.get('$removeMany'),
        }),
    })
    return ResourcesTC
}
