import React from 'react'
import { Layout } from '../components/Layout'
import localised from '../utils/text'

type MediaContent = Record<string, unknown>

interface MediaProps {
  pageContext: {
    local: MediaContent
    english: MediaContent
  }
}

const Media: React.SFC<MediaProps> = ({ pageContext: { local, english } }) => (
  <Layout>
    {localised(local, english, 'title')}
  </Layout>
)

export default Media
