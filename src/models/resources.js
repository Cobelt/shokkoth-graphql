import mongoose from 'mongoose'
import { RESOURCES } from '../constants'
import { updateLastModifDate } from '../utils'

const prefixError = ({ _id }, errorString) =>
    `Error on an Equipment#${_id}: ${errorString}`

export const ResourcesSchema = new mongoose.Schema({
    ankamaId: {
        type: Number,
        unique: true,
        required: 'I need an _id',
    },

    name: {
        type: String,
        required: 'I need a name',
    },

    level: {
        type: Number,
        required: 'I need a level',
    },

    type: {
        type: String,
        enum: RESOURCES.ENUM,
        required: 'I need a type',
    },

    description: String,

    imgUrl: String,
    url: String,

    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

ResourcesSchema.index({ name: 'text', type: 'text', category: 'text' })

// ResourcesSchema.plugin(FuzzySearchPlugin, {
//   fields: [{
//     name: 'name',
//     minSize: 10,
//   }]
// });

ResourcesSchema.on('index', function (err) {
    if (err) {
        console.error('Resources index error: %s', err)
    } else {
        console.info('Resources indexing complete')
    }
})

ResourcesSchema.pre('save', updateLastModifDate)

const Resources = mongoose.model('Resources', ResourcesSchema)
export default Resources
