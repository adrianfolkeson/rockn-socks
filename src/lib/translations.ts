export type Language = 'sv' | 'en'

export interface Translations {
  [key: string]: string | Translations
}

export const translations: { sv: Translations; en: Translations } = {
  sv: {},
  en: {}
}
