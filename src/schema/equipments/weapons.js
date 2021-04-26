import { adminAccess } from '../../resolvers/auth'
import * as rsv from '../../resolvers/equipments'

import { generateWeaponsResolvers } from './static'

export default function addWeaponsFields({ EquipmentsTC, schemaComposer }) {
    schemaComposer.Query.addFields({
        weaponsMissing: EquipmentsTC.get('$missing').wrapResolve(
            rsv.useWeapons
        ),

        ...generateWeaponsResolvers(EquipmentsTC, {
            $findOne: 'One',
            $findMany: 'Many',
            $count: 'Count',
        }),
    })

    schemaComposer.Mutation.addFields({
        ...adminAccess({
            importWeapons: EquipmentsTC.get('$import').wrapResolve(
                rsv.useWeapons
            ),
        }),
    })
    return EquipmentsTC
}
