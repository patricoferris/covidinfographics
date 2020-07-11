import React from 'react'
import { Layout } from '../components/Layout'
import useTranslations, { Translations } from '../utils/useTranslations'
import localised from '../utils/text'
import LocalizedLink from '../components/LocalizedLink'
import TopicGrid from '../components/TopicGrid'
import { Typography } from '@material-ui/core'

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
      <>
        <div>
          <Typography variant="h3">{localised(local, english, 'title')}</Typography>
          <Typography variant="body1">{localised(local, english, 'primaryText')}</Typography>
        </div>
        <TopicGrid topics={topics}></TopicGrid>
      </>
    </Layout>
  )
}

export default Resources
