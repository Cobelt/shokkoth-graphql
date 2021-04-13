import mongoose from 'mongoose'
import { updateLastModifDate } from '../utils'

import { EquipmentsSchema } from './equipments'

export const RecipesSchema = new mongoose.Schema({
    create: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'createModel',
        unique: true,
        required: 'I can not be a recipe if i create nothing !',
    },

    createModel: {
        type: String,
        required: true,
        enum: ['Recipes', 'Resources', 'Consumables'],
    },

    ingredients: [
        {
            object: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'objectModel',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            objectModel: {
                type: String,
                required: true,
                enum: ['Recipes', 'Resources', 'Consumables'],
            },
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

RecipesSchema.index({ name: 'text', type: 'text', category: 'text' })

RecipesSchema.on('index', function (err) {
    if (err) {
        console.error('Recipes index error: %s', err)
    } else {
        console.info('Recipes indexing complete')
    }
})

RecipesSchema.pre('save', updateLastModifDate)

const Recipes = mongoose.model('Recipes', RecipesSchema)
export default Recipes
