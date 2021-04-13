import jwt from 'jsonwebtoken'

import { getParam } from './query'
import { SECRET_KEY } from '../env'

export const findJWT = async req => {
    let token =
        req?.headers?.authorization ||
        getParam(req, 'jwt') ||
        getParam(req, 'login/TOKEN') ||
        req?.cookies?.['login/TOKEN'] // Express headers are auto converted to lowercase
    if (!token || typeof token !== 'string') return

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
    }
    return token || undefined
}

export async function decodeToken(token) {
    if (!token) return
    try {
        return await jwt.verify(token, SECRET_KEY)
    } catch (err) {
        return null
    }
}
