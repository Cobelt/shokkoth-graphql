import mongoose from 'mongoose'
import { STATS } from '../constants'

export const StatsSchema = new mongoose.Schema({
    ...Object.fromEntries(STATS?.ENUM?.map(stat => [stat, { type: Number }])),
})

const Stats = mongoose.model('Stats', StatsSchema)
export default Stats
