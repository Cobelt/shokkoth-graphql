import mongoose from 'mongoose'
import { updateLastModifDate } from '../utils'

import Equipments from './equipments'

export const SetsSchema = new mongoose.Schema({
    ankamaId: {
        type: Number,
        unique: true,
        required: 'I need an ankamaId',
    },

    name: {
        type: String,
        required: 'I need a name',
    },
    level: {
        type: Number,
        required: 'I need a level',
    },

    imgUrl: String,
    url: String,

    bonus: {
        type: Array,
        default: [],
    },

    equipments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipments',
        },
    ],

    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

SetsSchema.index({ name: 'text' })

// SetsSchema.plugin(FuzzySearchPlugin, {
//   fields: [{
//     name: 'name',
//     weight: 10,
//   }]
// });

SetsSchema.on('index', function (err) {
    if (err) {
        console.error('Sets index error: %s', err)
    } else {
        console.info('Sets indexing complete')
    }
})

SetsSchema.pre('save', updateLastModifDate)

const Sets = mongoose.model('Sets', SetsSchema)
export default Sets
