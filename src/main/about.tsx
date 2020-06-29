import React from 'react'
import { Layout } from '../components/Layout'
import Img, { FluidObject } from 'gatsby-image'
import { Grid, Typography } from '@material-ui/core'
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
      <Grid container spacing={3}>
        <Grid item sm={false} md={1} />
        <Grid item sm={12} md={10} spacing={3}>
          <Typography variant="h4">{localised(local, english, 'title')}</Typography>
        </Grid>
        <Grid item sm={12} md={5} spacing={3}>
          <Typography variant="body1">{localised(local, english, 'primaryText')}</Typography>
        </Grid>
        <Grid item sm={12} md={5} spacing={3}>
          <Img fluid={localised(local, english, 'image').childImageSharp.fluid} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default About
