import axios from 'axios'
import clone from 'lodash.clonedeep'
import set from 'lodash.set'

import { Equipments } from '../../models'

import { formatFullEquipment } from '../../utils'

export async function importFromDofapi(rp) {
    try {
        const { url } = rp?.args || {}

        if (!url) {
            throw new Error('You should give an url to fetch for import')
        }

        const { data } = await axios.get(url)

        return Promise.all(
            data?.map(async equipment => {
                const formatted = formatFullEquipment(clone(equipment))
                const equipmentSaved = Equipments.findOneAndUpdate(
                    { ankamaId: formatted?.ankamaId },
                    formatted,
                    { new: true, upsert: true }
                )

                return equipmentSaved
            })
        )
    } catch (e) {
        console.error(e)
        return e
    }
}

export const importEquipments = next => rp => {
    set(rp, 'args.url', 'https://fr.dofus.dofapi.fr/equipments')
    return next(rp)
}

export const importWeapons = next => rp => {
    set(rp, 'args.url', 'https://fr.dofus.dofapi.fr/weapons')
    return next(rp)
}

export const importMounts = next => rp => {
    set(rp, 'args.url', 'https://fr.dofus.dofapi.fr/mounts')
    return next(rp)
}

export const importPets = next => rp => {
    set(rp, 'args.url', 'https://fr.dofus.dofapi.fr/pets')
    return next(rp)
}
