import mongoose from 'mongoose'
import { updateLastModifDate } from '../utils'

export const BreedsSchema = new mongoose.Schema({
    _id: Number,

    name: {
        type: String,
        required: 'Please give me a name',
    },

    url: String,

    description: String,

    skins: {
        male: {
            type: mongoose.Schema.Types.Mixed,
            required: 'Please give me male heads and colors',
        },
        female: {
            type: mongoose.Schema.Types.Mixed,
            required: 'Please give me female heads and colors',
        },
    },

    roles: {
        type: [String],
        default: [],
    },

    spells: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Spells',
        default: [],
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

BreedsSchema.pre('save', updateLastModifDate)

const Breeds = mongoose.model('Breeds', BreedsSchema)
export default Breeds
