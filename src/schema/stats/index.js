import { composeWithMongoose } from 'graphql-compose-mongoose'
import { Stats } from '../../models'

export default function useStats(schemaComposer, customizationOptions = {}) {
    const StatsTC = composeWithMongoose(Stats, customizationOptions)

    return StatsTC
}
