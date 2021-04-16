import jwt from 'jsonwebtoken'

import { getParam } from './query'

export function findJWT(req) {
    let token =
        req?.headers?.authorization ||
        getParam(req, 'jwt') ||
        getParam(req, 'login/TOKEN') ||
        req?.cookies?.['login/TOKEN'] // Express headers are auto converted to lowercase
    if (!token || typeof token !== 'string') return null

    const start = 'Bearer '
    if (token.startsWith(start)) {
        // Remove Bearer from string
        token = token.slice(start.length, token.length)
    }
    return token || undefined
}

export async function decodeToken(token) {
    if (!token) return
    try {
        return await jwt.verify(token, process.env.SECRET_KEY)
    } catch (err) {
        return null
    }
}
