import { Translations } from './useTranslations'

export interface LocalisationOptions {
  translations: Translations
  category: string
  id: string
}

// The type for localisations
type localiser = (LocalisationOptions) => string

// Category and Id refer to the structure of the /config/translations/<locale>.json files
const localizeText: localiser = ({ translations, category, id }) => {
  const language = translations.localised
  if (language) {
    const cat = language[category]
    if (cat) {
      const text = cat[id]
      if (text) {
        return text
      }
    }
  }
  return translations.backup[category][id]
}

export default localizeText
