import * as filters from './equipments'

export function addFilters(resolver) {
    return (
        resolver
            .addFilterArg(filters.fromOneOfThoseSets)
            // .addFilterArg(filters.withCharacters)
            .addFilterArg(filters.search)
            .addFilterArg(filters.searchName)
            .addFilterArg(filters.levelMin)
            .addFilterArg(filters.levelMax)
            .addFilterArg(filters.categoryIn)
            .addFilterArg(filters.typeIn)
            .addFilterArg(filters.statsAll)
    )
}
