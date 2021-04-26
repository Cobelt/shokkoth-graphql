import axios from 'axios'
import clone from 'lodash.clonedeep'

import { Equipments } from '../../models'
import { formatEquipment } from '../../utils'

import { generateCreateOneFromDatafus } from './query'

export async function importData(rp) {
    try {
        const { urlDofapi } = rp?.args || {}

        if (!urlDofapi) {
            throw new Error('You should give an url to fetch for import')
        }

        const { data } = await axios.get(urlDofapi)

        return Promise.all(
            data?.map(async equipment => {
                const formatted = formatEquipment(clone(equipment))
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

export async function importEquipmentFromDatafus(rp) {
    try {
        const { record } = await generateCreateOneFromDatafus(rp)
        const { ankamaId } = record
        console.log({ record })
        delete record.otherStats

        return Equipments.findOneAndUpdate({ ankamaId }, record, {
            new: true,
            upsert: true,
        })
    } catch (e) {
        console.error(e)
        return e
    }
}
