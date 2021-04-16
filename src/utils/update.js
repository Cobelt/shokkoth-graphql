export function updateLastModifDate(next) {
    try {
        this.updatedAt = Date.now()
        return next()
    } catch (err) {
        return next(err)
    }
}
