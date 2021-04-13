import { composeWithMongoose } from 'graphql-compose-mongoose'

import { Breeds } from '../../models'
import { adminAccess } from '../../resolvers/auth'

export default function useBreeds(schemaComposer, customizationOptions = {}) {
    const BreedsTC = composeWithMongoose(Breeds, customizationOptions)

    schemaComposer.Query.addFields({
        breedById: BreedsTC.get('$findById'),
        breedByIds: BreedsTC.get('$findByIds'),
        breedOne: BreedsTC.get('$findOne'),
        breedMany: BreedsTC.get('$findMany'),
        breedCount: BreedsTC.get('$count'),
        ...adminAccess({
            breedConnection: BreedsTC.get('$connection'),
            breedPagination: BreedsTC.get('$pagination'),
        }),
    })

    schemaComposer.Mutation.addFields({
        ...adminAccess({
            breedCreateOne: BreedsTC.get('$createOne'),
            breedCreateMany: BreedsTC.get('$createMany'),
            breedUpdateById: BreedsTC.get('$updateById'),
            breedUpdateOne: BreedsTC.get('$updateOne'),
            breedUpdateMany: BreedsTC.get('$updateMany'),
            breedRemoveById: BreedsTC.get('$removeById'),
            breedRemoveOne: BreedsTC.get('$removeOne'),
            breedRemoveMany: BreedsTC.get('$removeMany'),
        }),
    })
    return BreedsTC
}
