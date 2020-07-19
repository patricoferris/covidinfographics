import React from 'react'
import locales from '../../config/i18n'
import SimpleCard from '../components/Card'
import useTranslations from '../utils/useTranslations'
import Selector from '../components/Selector'

import Grid from '@material-ui/core/Grid'
import DownloadLinks from '../components/DownloadLinks'
import localizeText, { LocalisationOptions } from '../utils/localizeText'
import { Layout } from '../components/Layout'
import CarouselWrapper from '../components/CarouselWrapper'
import { useStaticQuery, graphql } from 'gatsby'

export interface Link {
  node: {
    ext: string
    name: string
    relativeDirectory: string
    relativePath: string
    publicURL: string
  }
}

const Index: React.SFC<{ pageContext: { links: Link[] } }> = ({ pageContext: { links } }) => {
  const ts = useTranslations()



  // const images = edges.map(({ node }) => {
  //   return (node.childImageSharp.fluid)
  // })

  const baseOptions: LocalisationOptions = {
    translations: ts,
    category: 'index',
    id: 'missionTitle',
  }

  return (
    <Layout>
      <Grid container>
        <Grid item sm={false} md={1} />
        <Grid item sm={12} md={10}>
          <div style={{ width: "100%" }}>
            <Img
              style={{ maxHeight: '300px' }}
              imgStyle={{ objectPosition: '0% 0%' }}
              fluid={image.childImageSharp.fluid}
            />
          </div>
          <SimpleCard>
            <CarouselWrapper />
          </SimpleCard>
          <SimpleCard
            title={localizeText({ ...baseOptions, id: 'missionTitle' })}
            content={localizeText({ ...baseOptions, id: 'mission' })}
          />
          <SimpleCard
            title={localizeText({ ...baseOptions, id: 'stepOneTitle' })}
            content={localizeText({ ...baseOptions, id: 'stepOne' })}
          >
            <Selector languages={Object.keys(locales).map((locale) => locales[locale])} />
          </SimpleCard>
          <SimpleCard
            title={localizeText({ ...baseOptions, id: 'stepTwoTitle' })}
            content={localizeText({ ...baseOptions, id: 'stepTwo' })}
          >
            <DownloadLinks links={links} style={{ marginTop: '15px' }} />
          </SimpleCard>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Index
