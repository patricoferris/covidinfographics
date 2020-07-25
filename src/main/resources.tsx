import React from 'react'
import { Layout } from '../components/Layout'
import useTranslations, { Translations } from '../utils/useTranslations'
import localised from '../utils/text'
import LocalizedLink from '../components/LocalizedLink'
import TopicGrid from '../components/TopicGrid'
import { Typography, Grid } from '@material-ui/core'

type ResourcesContent = Record<string, unknown>

interface ResourcesProps {
  pageContext: {
    local: ResourcesContent
    english: ResourcesContent
    topics: Array<string>
  }
}

const Resources: React.SFC<ResourcesProps> = ({ pageContext: { local, english, topics } }) => {
  return (
    <Layout>
      <div className="global-wrapper">
        <Grid container>
          <Grid xs={1} sm={1} md={2} />
          <Grid xs={10} sm={10} md={8}>
            <Typography variant="h3">{localised(local, english, 'title')}</Typography>
            <Typography variant="body1">{localised(local, english, 'primaryText')}</Typography>
          </Grid>
          <Grid xs={1} sm={1} md={2} />
          <Grid xs={1} sm={1} md={2} />
          <Grid xs={10} sm={10} md={8}>
            <TopicGrid topics={topics}></TopicGrid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Resources
