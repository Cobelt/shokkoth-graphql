import { schemaComposer } from 'graphql-compose'

import createRelations from './relations'

import useAuth from './auth'
import useBreeds from './breeds'
import useCharacters from './characters'
import useEquipments from './equipments'
import useStuffs from './stuffs'
import useRecipes from './recipes'
import useResources from './resources'
import useSets from './sets'
import useUsers from './users'

const customizationOptions = {
    fields: {
        remove: ['createdAt', 'updatedAt'],
    },
}

const BreedsTC = useBreeds(schemaComposer, customizationOptions)
const RecipesTC = useRecipes(schemaComposer, customizationOptions)
const ResourcesTC = useResources(schemaComposer, customizationOptions)
const SetsTC = useSets(schemaComposer, customizationOptions)
const EquipmentsTC = useEquipments(schemaComposer, customizationOptions)
const StuffsTC = useStuffs(schemaComposer, customizationOptions)
const CharactersTC = useCharacters(schemaComposer, customizationOptions)
const UsersTC = useUsers(schemaComposer, customizationOptions)
const AuthTC = useAuth(schemaComposer)

createRelations({
    BreedsTC,
    SetsTC,
    EquipmentsTC,
    StuffsTC,
    CharactersTC,
    UsersTC,
    RecipesTC,
    ResourcesTC,
})

export default schemaComposer.buildSchema()
