import { Users } from '../../models'
import { getLocale } from '../../utils/query'
import { generateHash, comparePassword } from '../auth'

export const updateMe = async ({ source, args, context, info }) => {
    try {
        const { username, email, password, newPassword } = args
        const { _id } = getLocale(context.res, 'decoded')
        if (!_id) throw new Error('You are not logged.')
        const user = await Users.findOne({ _id })

        if (username) user.username = username
        if (email) user.email = email
        if (newPassword && (await comparePassword(password, user.hash))) {
            const hash = password && (await generateHash(newPassword))
            if (hash) user.hash = hash
        }
        user.save()

        return User.findOne({ _id })
    } catch (e) {
        return e
    }
}

export const addCharacter = async ({ source, args, context, info }) => {
    try {
        let userFound = await Users.findOne({
            characters: { $in: [args.characterId] },
        })
        if (userFound)
            throw new Error(
                `This character is already linked to ${
                    userFound._id == args.userId ? 'this' : 'another'
                } user`
            )

        const updated = await Users.findOneAndUpdate(
            { _id: args.userId },
            { $push: { characters: args.characterId } },
            { new: true }
        )
        if (!updated) throw new Error('Error on update')

        return Users.findOne({ _id: args.userId }) // return the record
    } catch (e) {
        return e
    }
}
