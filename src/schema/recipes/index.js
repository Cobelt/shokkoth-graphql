import { composeWithMongoose } from 'graphql-compose-mongoose'

import { Recipes } from '../../models'
import { adminAccess } from '../../resolvers/auth'

export default function useRecipes(schemaComposer, customizationOptions = {}) {
    const RecipesTC = composeWithMongoose(Recipes, customizationOptions)
    schemaComposer.Query.addFields({
        recipeById: RecipesTC.get('$findById'),
        recipeByIds: RecipesTC.get('$findByIds'),
        recipeOne: RecipesTC.get('$findOne'),
        recipeMany: RecipesTC.get('$findMany'),
        recipeCount: RecipesTC.get('$count'),
        ...adminAccess({
            recipeConnection: RecipesTC.get('$connection'),
            recipePagination: RecipesTC.get('$pagination'),
        }),
    })

    schemaComposer.Mutation.addFields({
        ...adminAccess({
            recipeCreateOne: RecipesTC.get('$createOne'),
            recipeCreateMany: RecipesTC.get('$createMany'),
            recipeUpdateById: RecipesTC.get('$updateById'),
            recipeUpdateOne: RecipesTC.get('$updateOne'),
            recipeUpdateMany: RecipesTC.get('$updateMany'),
            recipeRemoveById: RecipesTC.get('$removeById'),
            recipeRemoveOne: RecipesTC.get('$removeOne'),
            recipeRemoveMany: RecipesTC.get('$removeMany'),
        }),
    })
    return RecipesTC
}
