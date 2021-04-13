import { ankamaIdIn, setAnkamaIdIn } from './index'

export function addFilters(resolver) {
    return resolver.addFilterArg(ankamaIdIn).addFilterArg(setAnkamaIdIn)
}
