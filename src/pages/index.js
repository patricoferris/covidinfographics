import React from "react"
import { graphql } from "gatsby"
import locales from "../../config/i18n"
import LocalizedLink from "../components/localizedLink"
import SimpleCard from "../components/card"
import useTranslations from "../components/useTranslations"
import Selector from "../components/selector"

import Grid from '@material-ui/core/Grid'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const Index = ({ data: { allMdx } }) => {
  const translations = useTranslations()

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} md={8} spacing={3}>
          <SimpleCard title={translations.missionTitle} content={translations.mission}/>
          <SimpleCard title={translations.stepOneTitle} content={translations.stepOne}>
            <Selector languages={Object.keys(locales).map(locale => locales[locale])}/>
          </SimpleCard>
          <SimpleCard title={translations.stepTwoTitle} content={translations.stepTwo}/>
        </Grid>
        <Grid item sm={12} md={4}>
          <SimpleCard title={translations.wellBeing} content={translations.wellBeingText}>
            <LocalizedLink to={"/resources"}> 
              <p>{translations.wellBeingLink}</p>
            </LocalizedLink>
          </SimpleCard>
          <SimpleCard>
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="C19Infographics"
              options={{height: 400}}
            />
          </SimpleCard>
        </Grid>
      </Grid>
    </>
  )
}

export default Index

export const query = graphql`
  query Index($locale: String!, $dateFormat: String!) {
    allMdx(
      filter: { fields: { locale: { eq: $locale } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: $dateFormat)
          }
          fields {
            locale
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  }
`
