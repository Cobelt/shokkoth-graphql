import { composeWithMongoose } from 'graphql-compose-mongoose'
import { Users } from '../../models'
import { adminAccess, getJWTDecoded } from '../../resolvers/auth'
import * as rsv from '../../resolvers/users'

export default function useUsers(schemaComposer, customizationOptions = {}) {
    const UsersTC = composeWithMongoose(Users, customizationOptions)

    UsersTC.addResolver({
        name: 'addCharacter',
        type: UsersTC,
        args: { userId: 'MongoID!', characterId: 'MongoID!' },
        resolve: rsv.addCharacter,
    })

    UsersTC.addResolver({
        name: 'updateMe',
        type: UsersTC,
        args: {
            email: 'String',
            username: 'String',
            password: 'String',
            newPassword: 'String',
        },
        resolve: rsv.updateMe,
    })

    UsersTC.addResolver({
        name: 'signin',
        type: 'String',
        args: { username: 'String!', password: 'String!' },
        resolve: rsv.signin,
    })

    UsersTC.addResolver({
        name: 'login',
        type: 'String',
        args: { email: 'String', username: 'String', password: 'String!' },
        resolve: rsv.login,
    })

    UsersTC.addResolver({
        name: 'logout',
        type: 'Boolean',
        args: {},
        resolve: rsv.logout,
    })

    UsersTC.addResolver({
        name: 'decodeToken',
        type: UsersTC,
        args: {},
        resolve: rp => getJWTDecoded(rp),
    })

    UsersTC.addResolver({
        name: 'me',
        type: UsersTC,
        args: {},
        resolve: rsv.getMe,
    })

    schemaComposer.Query.addFields({
        me: UsersTC.get('$me'),

        ...adminAccess({
            userById: UsersTC.get('$findById'),
            userByIds: UsersTC.get('$findByIds'),
            userOne: UsersTC.get('$findOne'),
            userMany: UsersTC.get('$findMany'),
            userCount: UsersTC.get('$count'),
            userConnection: UsersTC.get('$connection'),
            userPagination: UsersTC.get('$pagination'),
        }),
    })

    schemaComposer.Mutation.addFields({
        addCharacterToUser: UsersTC.get('$addCharacter'),
        updateMe: UsersTC.get('$updateMe'),
        signin: UsersTC.get('$signin'),

        ...adminAccess({
            userCreateOne: UsersTC.get('$createOne'),
            userCreateMany: UsersTC.get('$createMany'),
            userUpdateById: UsersTC.get('$updateById'),
            userUpdateMany: UsersTC.get('$updateMany'),
            userRemoveById: UsersTC.get('$removeById'),
            userRemoveOne: UsersTC.get('$removeOne'),
            userRemoveMany: UsersTC.get('$removeMany'),
        }),
    })

    UsersTC.removeField('hash')
    return UsersTC
}
