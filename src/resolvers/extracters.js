import path from 'path'
import fs from 'fs'

import { Breeds } from '../models'

export const extractBreeds = async ({ source, args, context }) => {
    try {
        const file = path.resolve(__dirname, '../extractable/breeds.json')
        const data = fs.readFileSync(file)

        if (!data) return new Error('Got no data from the file')

        console.log('[==>] Extracting', data.length, 'items.')

        const breeds = await Promise.all(
            data.map(async breed => {
                // to remove
                delete breed.spells

                return await Breeds.findOneAndUpdate(
                    { _id: breed._id },
                    breed,
                    { new: true, upsert: true }
                )
            })
        )

        console.log('[==>] Done.')
        return breeds.map(i => i && i._id)
    } catch (e) {
        return e
    }
}
