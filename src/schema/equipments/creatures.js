import { adminAccess } from '../../resolvers/auth'
import * as rsv from '../../resolvers/equipments'

import { generateCreaturesResolvers } from './static'

export default function addCreaturesFields({ EquipmentsTC, schemaComposer }) {
    schemaComposer.Query.addFields({
        petMissing: EquipmentsTC.get('$missing').wrapResolve(rsv.usePets),
        mountMissing: EquipmentsTC.get('$missing').wrapResolve(rsv.useMounts),

        ...generateCreaturesResolvers(EquipmentsTC, {
            $findOne: 'One',
            $findMany: 'Many',
            $count: 'Count',
        }),
    })

    schemaComposer.Mutation.addFields({
        ...adminAccess({
            importPets: EquipmentsTC.get('$import').wrapResolve(rsv.usePets),
            importMounts: EquipmentsTC.get('$import').wrapResolve(
                rsv.useMounts
            ),
        }),
    })
    return EquipmentsTC
}
