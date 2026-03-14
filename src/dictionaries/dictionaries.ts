import 'server-only'

const dictionaries = {
    en: () => import('./en.json').then((module) => module.default),
    mk: () => import('./mk.json').then((module) => module.default),
    sq: () => import('./sq.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'mk' | 'sq') => dictionaries[locale]()
