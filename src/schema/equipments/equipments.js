import { adminAccess } from '../../resolvers/auth'
import * as rsv from '../../resolvers/equipments'

import { generateEquipmentsResolvers } from './static'

export default function addEquipmentsFields({ EquipmentsTC, schemaComposer }) {
    schemaComposer.Query.addFields({
        equipmentMissing: EquipmentsTC.get('$missing').wrapResolve(
            rsv.useEquipments
        ),

        ...generateEquipmentsResolvers(EquipmentsTC, {
            $findOne: 'One',
            $findMany: 'Many',
            $count: 'Count',
        }),
    })

    schemaComposer.Mutation.addFields({
        ...adminAccess({
            importEquipments: EquipmentsTC.get('$import').wrapResolve(
                rsv.useEquipments
            ),
        }),
    })
    return EquipmentsTC
}
