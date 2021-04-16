import { getJWTDecoded } from '../../resolvers/auth'
import * as rsv from '../../resolvers/auth'

export default function useAuth(schemaComposer) {
    const AuthTC = schemaComposer.createObjectTC({
        name: 'Auth',
        fields: {
            accessToken: 'String!',
        },
    })

    AuthTC.addResolver({
        name: 'signup',
        type: 'String',
        args: { username: 'String!', password: 'String!' },
        resolve: rsv.signup,
    })

    AuthTC.addResolver({
        name: 'login',
        type: 'String',
        args: { username: 'String!', password: 'String!' },
        resolve: rsv.login,
    })

    AuthTC.addResolver({
        name: 'logout',
        type: 'Boolean',
        args: {},
        resolve: rsv.logout,
    })

    AuthTC.addResolver({
        name: 'decodeToken',
        type: AuthTC,
        args: {},
        resolve: rp => getJWTDecoded(rp),
    })

    schemaComposer.Query.addFields({
        decodeToken: AuthTC.get('$decodeToken'),
    })

    schemaComposer.Mutation.addFields({
        login: AuthTC.get('$login'),
        logout: AuthTC.get('$logout'),
        signup: AuthTC.get('$signup'),
    })

    return AuthTC
}
