import mongoose from 'mongoose'

export const RefreshTokensSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        expires: '60d',
        default: Date.now(),
    },
})

const RefreshTokens = mongoose.model('RefreshTokens', RefreshTokensSchema)
export default RefreshTokens
