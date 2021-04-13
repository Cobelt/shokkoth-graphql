import { Users } from '../../models'
import { getUserId, isAtLeastAdmin } from '../auth/'

export async function isCharacterOwner(userId, characterId) {
    if (!userId || !characterId) return false
    const users = await Users.find({ characters: { $in: characterId } })

    return users.find(user => user._id == userId)
}

export const canUpdateCharacter = next => rp => {
    const userId = rp?.context?.userId || getUserId(rp)
    if (
        !isCharacterOwner(userId, rp?.args?.characterId) &&
        !isAtLeastAdmin(rp)
    ) {
        return next(new Error('User does not have access to this character.'))
    }

    next(rp)
}
