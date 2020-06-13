// Category and Id refer to the structure of the /config/translations/<locale>.json files
const localizeText = (translations, category, id) => {
  const language = translations.localised 
  if (language) {
    const cat = language[category]; 
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