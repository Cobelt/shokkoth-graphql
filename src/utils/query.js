export const getParam = (req, param) => {
    if (Array.isArray(param)) {
        const results = param.map(n => ({ [n]: getParam(req, n) }))
        return Object.assign({}, ...results)
    }
    return req?.params?.[param] || req?.query?.[param] || req?.body?.[param]
}
export const getLocale = (res, name) => {
    if (Array.isArray(name)) {
        const results = name.map(n => ({ [n]: getLocale(res, n) }))
        return Object.assign({}, ...results)
    }
    return res?.locales?.[name]
}

export const setLocale = (res, value) =>
    (res.locales = { ...(res?.locales || {}), ...value })
