import { Users } from '../../models'
import { getUserId } from '../auth'

export const getMe = async rp => {
    const userId = getUserId(rp)
    if (!userId) return {}
    return Users.findOne({ _id: userId })
}
