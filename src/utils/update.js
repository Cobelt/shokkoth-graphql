export function updateLastModifDate(next) {
    try {
        this.updatedAt = Date.now()
        next()
    } catch (err) {
        next(err)
    }
}
