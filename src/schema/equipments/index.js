import { composeWithMongoose } from 'graphql-compose-mongoose'

import { Equipments } from '../../models'

import { adminAccess } from '../../resolvers/auth'

import { generateEquipmentsResolvers, completeFilter } from './static'

export default function useEquipments(
    schemaComposer,
    customizationOptions = {}
) {
    const EquipmentsTC = composeWithMongoose(Equipments, customizationOptions)

    completeFilter(EquipmentsTC, 'findMany')
    completeFilter(EquipmentsTC, 'findOne')
    completeFilter(EquipmentsTC, 'count')
    completeFilter(EquipmentsTC, 'updateOne')
    completeFilter(EquipmentsTC, 'updateMany')
    completeFilter(EquipmentsTC, 'removeOne')
    completeFilter(EquipmentsTC, 'removeMany')

    schemaComposer.Query.addFields({
        equipmentById: EquipmentsTC.get('$findById'),
        equipmentByIds: EquipmentsTC.get('$findByIds'),
        equipmentOne: EquipmentsTC.get('$findOne'),
        equipmentMany: EquipmentsTC.get('$findMany'),
        equipmentCount: EquipmentsTC.get('$count'),
        equipmentConnection: EquipmentsTC.get('$connection'),
        equipmentPagination: EquipmentsTC.get('$pagination'),

        ...generateEquipmentsResolvers(EquipmentsTC, {
            $findOne: 'One',
            $findMany: 'Many',
            $count: 'Count',
        }),
    })
    schemaComposer.Mutation.addFields({
        ...adminAccess({
            equipmentCreateOne: EquipmentsTC.get('$createOne'),
            equipmentCreateMany: EquipmentsTC.get('$createMany'),
            equipmentUpdateById: EquipmentsTC.get('$updateById'),
            equipmentUpdateOne: EquipmentsTC.get('$updateOne'),
            equipmentUpdateMany: EquipmentsTC.get('$updateMany'),
            equipmentRemoveById: EquipmentsTC.get('$removeById'),
            equipmentRemoveOne: EquipmentsTC.get('$removeOne'),
            equipmentRemoveMany: EquipmentsTC.get('$removeMany'),
        }),
    })
    return EquipmentsTC
}