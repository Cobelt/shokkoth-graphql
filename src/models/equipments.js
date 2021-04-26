import mongoose from 'mongoose'

import { COMMON } from '../constants'
import { updateLastModifDate } from '../utils'

import Sets from './sets'

const prefixError = ({ _id }, errorString) =>
    `Error on an Equipment#${_id}: ${errorString}`

export const EquipmentsSchema = new mongoose.Schema({
    ankamaId: {
        type: Number,
        required: 'I need an _id',
    },

    name: {
        type: String,
        required: 'I need a name',
        index: true,
    },
    level: {
        type: Number,
        required: 'I need a level',
        index: true,
    },

    type: {
        type: String,
        enum: COMMON.ENUM,
        required: 'I need a type',
    },
    category: {
        type: String,
    },
    typeOrder: {
        type: Number,
        sparse: true,
    },

    description: String,

    statistics: {
        type: Array,
        default: [],
    },
    characteristics: {
        type: Array,
        default: [],
    },
    passives: {
        type: Array,
        default: [],
    },

    conditions: {
        type: Array,
        default: [],
    },

    imgUrl: String,
    url: String,

    setAnkamaId: Number,

    setId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sets',
    },

    // Use false when directly extracted from dofapi
    // validated: Boolean,

    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

EquipmentsSchema.index({ ankamaId: 'text', type: 'text' }, { unique: true })
EquipmentsSchema.index({ name: 'text' })

EquipmentsSchema.on('index', function (err) {
    if (err) {
        console.error('Equipments index error: %s', err)
    } else {
        console.info('Equipments indexing complete')
    }
})

EquipmentsSchema.pre('save', updateLastModifDate)

const Equipments = mongoose.model('Equipments', EquipmentsSchema)
export default Equipments
