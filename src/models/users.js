import mongoose from 'mongoose'

import { USERS } from '../constants'
import { updateLastModifDate } from '../utils'

export const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true,
        },
        required: 'Please choose a username',
    },

    email: {
        type: String,
        index: {
            unique: true,
        },
    },

    hash: {
        type: String,
        required: true,
        match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        minlength: 12,
    },

    characters: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Characters',
        default: [],
    },

    stuffs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Stuffs',
        default: [],
    },

    roles: {
        type: [String],
        enum: USERS.ENUM,
        default: [USERS.DEFAULT],
    },

    goals: Array,

    ip: String,

    status: [
        {
            name: {
                type: String,
                enum: ['BANNED', 'MUTED'],
            },
            since: Date,
        },
    ],

    lastConnection: Date,

    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

UsersSchema.pre('save', updateLastModifDate)

UsersSchema.pre('save', function (next) {
    try {
        if (this.isModified('password') || this.isNew) {
        }
        next()
    } catch (err) {
        next(err)
    }
})

const Users = mongoose.model('Users', UsersSchema)
export default Users
