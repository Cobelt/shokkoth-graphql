import set from 'lodash.set'

import { Characters, Users } from '../../models'
import { getUserId } from '../auth'

export const myCharacters = async ({ args, context }) => {
    try {
        let { filter = {}, limit, skip } = args
        const userId = getUserId({ context })
        if (!userId)
            throw new Error('No userId found in access token.', {
                statusCode: 403,
            })

        const user = await Users.findOne({ _id: userId }).exec()
        if (user.characters.length <= 0) return []

        const charactersIds = user.characters.filter(
            character =>
                character &&
                (!filter._id || filter._id == character) &&
                (!filter._ids || filter._ids.find(id => id == character))
        )
        delete filter._id
        delete filter._ids

        set(filter, '_id', { $in: charactersIds })

        return Characters.find(filter).skip(skip).limit(limit)
    } catch (e) {
        return e
    }
}
