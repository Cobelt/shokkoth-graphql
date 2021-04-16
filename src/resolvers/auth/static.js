import memoize from 'lodash.memoize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { RefreshTokens, Users } from '../../models'
import { getLocale, setCookie } from '../../utils'

export async function generateRefreshToken(user, { context } = {}) {
    try {
        const EXPIRES_DAYS = 60

        const token = await jwt.sign(
            { _id: user?._id },
            process.env.SECRET_KEY,
            {
                algorithm: 'HS256',
                expiresIn: EXPIRES_DAYS + 'd',
            }
        )
        if (!token) return res.status(500).send('No token created')

        await RefreshTokens.findOneAndUpdate(
            { user },
            { user, token, createdAt: Date.now() },
            { new: true }
        )

        setCookie(context.res, {
            name: 'login/REFRESH',
            value: token,
            expiresIn: EXPIRES_DAYS,
            httpOnly: true,
        })

        return token
    } catch (e) {
        return e
    }
}
export async function generateJWT(user, { context } = {}) {
    try {
        const EXPIRES_MINUTES = 20

        const { _id, username, email, roles } = user

        const token = await jwt.sign(
            { _id, username, email, roles },
            process.env.SECRET_KEY,
            { algorithm: 'HS256', expiresIn: EXPIRES_MINUTES + 'm' }
        )
        if (!token) return res.status(500).send('No token created')

        await Users.findOneAndUpdate(
            { _id },
            { $set: { lastConnection: Date.now() } },
            { new: true }
        )

        setCookie(context.res, {
            name: 'login/TOKEN',
            value: token,
            maxAge: EXPIRES_MINUTES * 60 * 1000,
        })

        return token
    } catch (e) {
        return e
    }
}

export function getJWTDecoded({ context } = {}) {
    return getLocale(context?.res, 'decoded')
}

export function getUserId({ context } = {}) {
    return getJWTDecoded({ context })?._id
}

export function hasRoles({ context } = {}, wantedRoles) {
    const { roles } = getJWTDecoded({ context }) || {}
    return roles && [wantedRoles].flat().some(role => roles.includes(role))
}

export const isAtLeastAdmin = memoize(
    ({ context } = {}) => {
        return hasRoles({ context }, ['SUPER_ADMIN', 'ADMIN'])
    },
    ({ context } = {}) => JSON.stringify(getJWTDecoded({ context }))
)

export const isSuperAdmin = memoize(
    ({ context } = {}) => {
        return hasRoles({ context }, ['SUPER_ADMIN'])
    },
    ({ context } = {}) => JSON.stringify(getJWTDecoded({ context }))
)

export function adminAccess(resolvers) {
    Object.keys(resolvers).forEach(k => {
        resolvers[k] = resolvers[k].wrapResolve(next => rp => {
            rp.beforeRecordMutate = async (doc, rp) => {
                const { context } = rp
                context.userId = getUserId({ context })

                if (!isAtLeastAdmin({ context })) {
                    return next(
                        new Error(
                            'You should be admin, to have access to this action.'
                        )
                    )
                }
                return doc
            }
            return next(rp)
        })
    })
    return resolvers
}

export function ownOrAdmin(resolvers) {
    Object.keys(resolvers).forEach(k => {
        resolvers[k] = resolvers[k].wrapResolve(next => rp => {
            try {
                rp.beforeRecordMutate = async (doc, rp) => {
                    const { context } = rp
                    context.userId = getUserId({ context })
                    const isAdmin = isAtLeastAdmin(rp)

                    if (!ownIt && !isAdmin) {
                        throw new Error(
                            'You should own it or be admin, to have access to this action.'
                        )
                    }
                    return doc
                }

                return next(rp)
            } catch (e) {
                return next(e)
            }
        })
    })
    return resolvers
}

export function generateHash(toHash) {
    return bcrypt.hash(toHash, 12)
}

export function comparePassword(passwordToVerify, hash) {
    return new Promise((resolve, reject) => {
        if (!passwordToVerify || !hash)
            return reject(new Error('Please send both args to compare'))

        bcrypt.compare(passwordToVerify, hash, (err, result) => {
            if (err) return reject(err)
            if (!result) return resolve(false)

            return resolve(true)
        })
    })
}
