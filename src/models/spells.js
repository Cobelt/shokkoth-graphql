import mongoose from 'mongoose'
import { updateLastModifDate } from '../utils'

const SpellsSchema = new mongoose.Schema({
    _id: Number,

    name: {
        type: String,
        required: 'Please give me a name',
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

SpellsSchema.pre('save', updateLastModifDate)

const Spells = mongoose.model('Spells', SpellsSchema)
export default Spells
