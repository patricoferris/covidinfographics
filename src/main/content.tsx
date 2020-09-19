import React from 'react'
import DownloadLinks from '../components/DownloadLinks'
import { Layout } from '../components/Layout'
import { Typography, Grid } from '@material-ui/core'
import { Link } from '../main/index'

interface ContentProps {
  pageContext: {
    topic: string
    links: Link[]
  }
}

const Content: React.SFC<ContentProps> = ({ pageContext: { topic, links } }) => {
  return (
    <Layout>
      <div className="global-wrapper">
        <Grid container spacing={3}>
          <Grid item xs={1} sm={1} md={2} />
          <Grid xs={10} sm={10} md={8}>
            <div className="global-wrapper">
              <Typography variant="h3">{topic}</Typography>
              <div style={{ marginTop: '20px' }}>
                <DownloadLinks data={{ topic, links }} />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Content
