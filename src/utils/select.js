import { toURLValid } from './format'

export function findKey(type, translations) {
    const validType = toURLValid(type)
    const [foundKey, foundTranslation] =
        Object.entries(translations).find(([key, translation]) => {
            return (
                toURLValid(translation.fr) === validType ||
                toURLValid(translation.en) === validType
            )
        }) || []
    return foundKey
}

export function findOrder(type, translations) {
    return translations?.[type]?.order
}

export function findCategory(type, translations) {
    return translations?.[type]?.category
}

export function findTypesOfCategory(category, translations) {
    return Object.entries(translations)
        .map(([key, value]) => {
            if (
                (!category && value?.category) ||
                (category && value?.category == category)
            )
                return key
        })
        .filter(e => !!e)
}
