import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import favicon from 'serve-favicon'

dotenv.config()

import { setLocale, getLocale, decodeToken, findJWT } from './utils'

import './models'
import schema from './schema'

import { ALLOWED_ORIGINS } from './static'

const hostname = '0.0.0.0'
const port = process.env.PORT || PORT || 4000

const DB_HOSTNAME = process.env.MONGO_SERVER || '0.0.0.0'
const DB_PORT = process.env.MONGO_PORT || '27017'
const DB_NAME = process.env.MONGO_NAME || 'shokkoth'

const app = express()

// mongoose instance connection url connection
mongoose.set('debug', process.env.MONGOOSE_DEBUG || 'false' === 'true')
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

app.use(favicon(path.join(__dirname, 'public', 'images', 'icon.png')))

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps or curl requests)
            if (
                origin &&
                !ALLOWED_ORIGINS.includes(
                    origin.replace(/http(?:s?):\/\//, '').replace(/:\d+$/, '')
                )
            ) {
                return callback(
                    new Error(
                        'The CORS policy for this site does not allow access from the specified Origin.'
                    ),
                    false
                )
            }
            console.log('Accepted origin =', origin)
            return callback(null, true)
        },
        header: '*',
    })
)

app.use(express.json())

app.use(cookieParser())

app.use(async (req, res, next) => {
    try {
        const token = await findJWT(req)
        if (token) setLocale(res, { token })
        return next()
    } catch (e) {
        return next(e)
    }
})

app.use(async (req, res, next) => {
    try {
        const token = getLocale(res, 'token')
        if (token) {
            setLocale(res, { decoded: await decodeToken(token) })
        }
        return next()
    } catch (e) {
        return next(e)
    }
})

const router = express.Router()

app.route('/')
    .get(
        graphqlHTTP({
            schema,
            graphiql: true,
        })
    )
    .post(
        graphqlHTTP({
            schema,
            graphiql: false,
        })
    )

app.use(router)

app.listen(port, hostname, () =>
    console.log(`Shokkoth's GraphQL started on http://${hostname}:${port}`)
)
