import React from 'react'
import { Layout } from '../components/Layout'
import Img, { FluidObject } from 'gatsby-image'
import { Grid, Typography, Hidden } from '@material-ui/core'
import localised from '../utils/text'

type AboutContent = Record<string, unknown>

interface AboutProps {
  pageContext: {
    local: AboutContent
    english: AboutContent
  }
}

const About: React.SFC<AboutProps> = ({ pageContext: { local, english } }) => {
  return (
    <Layout>
      <div className="global-wrapper">
        <Grid container spacing={3}>
          <Grid item xs={1} sm={1} md={2} />
          <Grid item xs={10} sm={10} md={8} spacing={3}>
            <Typography variant="h4">{localised(local, english, 'title')}</Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={2} />
          <Grid item xs={1} sm={1} md={2} />
          <Grid item xs={10} sm={10} md={4} spacing={3}>
            <Typography variant="body1">{localised(local, english, 'primaryText')}</Typography>
          </Grid>
          <Hidden mdUp>
            <Grid item xs={1} sm={1} />
            <Grid item xs={1} sm={1} />
          </Hidden>
          <Grid item sm={10} md={4} spacing={3}>
            <Img fluid={localised(local, english, 'image').childImageSharp.fluid} />
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default About
