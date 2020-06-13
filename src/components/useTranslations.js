import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleContext } from "./Layout"

const useTranslations = (backup="en") => {
  // The current active locale
  const { locale } = React.useContext(LocaleContext)
  // Query for the translations
  const { rawData } = useStaticQuery(query)

  // Simplify the response from GraphQL
  const simplified = rawData.edges.map(item => {
    return {
      name: item.node.name,
      translations: item.node.translations,
    }
  })

  // Translations for current locale
  const { translations } = simplified.filter(lang => lang.name === locale)[0]
  // Default English translations
  const { english } = simplified.filter(lang => lang.name === backup)[0]

  return {localised: translations, backup: english}
}

export default useTranslations

const query = graphql`
query useTranslations {
  rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
    edges {
      node {
        name
        translations: childTranslationsJson {
          index {
            missionTitle
            mission
            stepOneTitle
            stepOne
            stepTwoTitle
            stepTwo
            wellBeing
            wellBeingText
            wellBeingLink
          }
          resources {
            placeholder
          }
        }
      }
    }
  }
}
`
