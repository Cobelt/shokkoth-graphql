import { getUserId, isAtLeastAdmin } from '../auth'

export const canUpdateUser = next => rp => {
    const userId = rp?.context?.userId || getUserId(rp)

    if (!userId && !isAtLeastAdmin(rp)) {
        return next(new Error('You do not have access to this user.'))
    }

    next(rp)
}
