import { Users } from '../../models'
import { getUserId } from '../auth'

export const getMe = async rp => {
    try {
        const userId = getUserId(rp)
        if (!userId) return null
        return Users.findOne({ _id: userId })
    } catch (e) {
        console.error(e)
        return e
    }
}
