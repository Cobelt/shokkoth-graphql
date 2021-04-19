import fs from 'fs'
import path from 'path'

import { Breeds } from '../../models'
import { tryParse } from '../../utils'

const ALL_BREEDS_FILE = path.resolve(__dirname, '../../extractable/breeds.json')

export async function importFromFile(rp) {
    try {
        const unparsedData = fs.readFileSync(ALL_BREEDS_FILE)
        const data = tryParse(unparsedData)

        if (!Array.isArray(data)) return null
        return Promise.all(
            data?.map(async breed => {
                delete breed.spells

                return await Breeds.findOneAndUpdate(
                    { _id: breed._id },
                    breed,
                    { new: true, upsert: true }
                )
            })
        )
    } catch (e) {
        console.error(e)
        return e
    }
}
