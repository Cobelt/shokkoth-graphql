import * as filters from './stuffs'

export function addFilters(resolver) {
    return resolver
        .addFilterArg(filters.fromCharacter)
        .addFilterArg(filters.searchName)
        .addFilterArg(filters.notEmptyStuffs)
        .addFilterArg(filters.almostFullStuff)
        .addFilterArg(filters.search)
}
