import { Users } from '../../models'

import {
    generateJWT,
    generateRefreshToken,
    comparePassword,
    getJWTDecoded,
    generateHash,
} from './static'

export async function login(rp) {
    try {
        const { args, context } = rp

        // if (getJWTDecoded(rp) && Date.now() < exp * 1000) throw new Error('You are already logged with another account');

        const username = (args.username || '').toLowerCase()
        const { password } = args || {}

        if (!username) {
            throw new Error("L'username est requis pour se connecter.")
        }

        if (!password) {
            throw new Error('Le mot de passe est requis pour se connecter.')
        }

        const user = await Users.findOne({
            username: username.toLowerCase(),
        })

        if (!user) {
            throw new Error("L'username ou le mot de passe est incorrect")
        }

        const passwordMatch = await comparePassword(password, user?.hash)
        if (!passwordMatch) {
            throw new Error("L'username ou le mot de passe est incorrect")
        } else {
            await generateRefreshToken(user, rp)

            return await generateJWT(user, rp)
        }
    } catch (e) {
        return e
    }
}

export async function logout(rp) {
    try {
        const { _id } = getJWTDecoded(rp)
        return RefreshTokens.deleteOne({ user: { _id } })
    } catch (e) {
        return e
    }
}

export async function signup(rp) {
    try {
        const { args } = rp

        const username = (args.username || '').toLowerCase()
        const { password } = args || {}

        if (!username) {
            throw new Error("L'username est requis pour s'inscrire.")
        }

        if (!password) {
            throw new Error("Le mot de passe est requis pour s'inscrire.")
        }

        const hash = await generateHash(password)

        await Users.create({ username: username.toLowerCase(), hash })

        return await login(rp)
    } catch (e) {
        return e
    }
}
