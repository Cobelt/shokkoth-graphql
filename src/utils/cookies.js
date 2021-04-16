export function setCookie(
    res,
    { name, value, httpOnly = false, expiresIn = 7, maxAge }
) {
    // expiresIn days
    if (!name || !value) return
    res.cookie(name, value, {
        maxAge: maxAge || expiresIn * 24 * 60 * 60 * 1000,
        path: '/',
        domain: '.shokkoth.tk',
        httpOnly,
    })
}

export function getCookie({ name }) {
    const decodedCookies = decodeURIComponent(document.cookie)
    const cookieValue = decodedCookies.replace(
        new RegExp(`(?:(?:^|.*;\s*)${name}\s*\=\s*([^;]*).*$)|^.*$/`),
        '$1'
    )
    return cookieValue || false
}

export function checkCookie({ name, value, expiresIn }) {
    const cookie = getCookie({ name })
    if (cookie) return true
}
