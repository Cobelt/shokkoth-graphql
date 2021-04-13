import { Users } from '../../models'
import { setCookie } from '../../utils/cookies'
import { generateJWT, comparePassword } from './static'

export async function login(rp) {
    try {
        const { args, context } = rp

        // if (getJWTDecoded(rp) && Date.now() < exp * 1000) throw new Error('You are already logged with another account');

        const username = (args.username || '').toLowerCase()
        const email = (args.email || '').toLowerCase()
        if (!username && !email)
            throw new Error(
                "L'username ou l'email est requis pour se connecter"
            )

        const user = await Users.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() },
            ],
        }).exec()

        if (!user)
            throw new Error("L'username ou le mot de passe est incorrect")

        const passwordMatch = await comparePassword(args.password, user.hash)
        if (!passwordMatch)
            throw new Error("L'username ou le mot de passe est incorrect")
        else {
            const token = await generateJWT(user)
            setCookie(context.res, {
                name: 'login/TOKEN',
                value: token,
                expiresIn: 1 / 24,
            })
            return token
        }
    } catch (e) {
        return e
    }
}

export async function logout(rp) {
    try {
        return true
    } catch (e) {
        return e
    }
}
