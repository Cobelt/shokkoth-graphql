import { composeWithMongoose } from 'graphql-compose-mongoose'

import { Equipments } from '../../models'

import { adminAccess } from '../../resolvers/auth'
import * as rsv from '../../resolvers/equipments'

import addCreaturesFields from './creatures'
import addEquipmentsFields from './equipments'
import addWeaponsFields from './weapons'

import { completeFilters } from './static'

export default function useEquipments(
    schemaComposer,
    customizationOptions = {}
) {
    const EquipmentsTC = composeWithMongoose(Equipments, customizationOptions)

    // COMMON
    completeFilters(EquipmentsTC, 'findMany')
    completeFilters(EquipmentsTC, 'findOne')
    completeFilters(EquipmentsTC, 'count')
    completeFilters(EquipmentsTC, 'updateOne')
    completeFilters(EquipmentsTC, 'updateMany')
    completeFilters(EquipmentsTC, 'removeOne')
    completeFilters(EquipmentsTC, 'removeMany')

    EquipmentsTC.addResolver({
        name: 'import',
        type: [EquipmentsTC],
        args: { ankamaId: '[String]' },
        resolve: rsv.importData,
    })

    EquipmentsTC.addResolver({
        name: 'missing',
        type: 'JSON',
        args: null,
        resolve: rsv.missingComparedToDatafus,
    })

    schemaComposer.Query.addFields({
        equipmentById: EquipmentsTC.get('$findById'),
        equipmentByIds: EquipmentsTC.get('$findByIds'),
        equipmentOne: EquipmentsTC.get('$findOne'),
        equipmentMany: EquipmentsTC.get('$findMany'),
        equipmentCount: EquipmentsTC.get('$count'),
        equipmentConnection: EquipmentsTC.get('$connection'),
        equipmentPagination: EquipmentsTC.get('$pagination'),
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

    addEquipmentsFields({ EquipmentsTC, schemaComposer })
    addCreaturesFields({ EquipmentsTC, schemaComposer })
    addWeaponsFields({ EquipmentsTC, schemaComposer })

    return EquipmentsTC
}
