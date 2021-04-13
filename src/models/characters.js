import mongoose from 'mongoose'

import { CHARACTERS } from '../constants'
import { updateLastModifDate } from '../utils'

export const CharactersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please give me a name',
    },
    level: {
        type: Number,
        min: 1,
        default: 200,
    },
    gender: {
        type: String,
        enum: CHARACTERS.ENUM,
        default: CHARACTERS.DEFAULT,
    },

    breed: {
        type: Number,
        ref: 'Breeds',
        required: 'Pas de classe définie',
    },

    stuffs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Stuffs',
        default: [],
    },

    public: {
        type: Boolean,
        default: true,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

CharactersSchema.pre('save', updateLastModifDate)

const Characters = mongoose.model('Characters', CharactersSchema)
export default Characters
