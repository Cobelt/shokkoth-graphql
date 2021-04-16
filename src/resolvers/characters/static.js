import { Users } from '../../models'
import { getUserId, isAtLeastAdmin } from '../auth/'

export async function isCharacterOwner(userId, characterId) {
    if (!userId || !characterId) return false
    const users = await Users.find({ characters: { $in: characterId } })

    return users.find(user => user._id == userId)
}

export const canUpdateCharacter = next => rp => {
    const userId = rp?.context?.userId || getUserId(rp)
    const characterId = rp?.args?.characterId
    if (
        characterId &&
        !isCharacterOwner(userId, characterId) &&
        !isAtLeastAdmin(rp)
    ) {
        return next(new Error('User does not have access to this character.'))
    }

    return next(rp)
}
