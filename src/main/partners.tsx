import React from 'react'
import { Layout } from '../components/Layout'
import localised from '../utils/text'
import { Grid, Typography, Hidden } from '@material-ui/core'
import Img from 'gatsby-image'

type PartnersContent = Record<string, unknown>

interface PartnersProps {
  pageContext: {
    local: PartnersContent
    english: PartnersContent
  }
}

const Partners: React.SFC<PartnersProps> = ({ pageContext: { local, english } }) => (
  <Layout>
    <div className="global-wrapper">
      <Grid container spacing={3}>
        <Grid item xs={1} sm={1} md={2} />
        <Grid item xs={10} sm={10} md={8} spacing={3}>
          <Typography variant="h4">{localised(local, english, 'title')}</Typography>
        </Grid>
        {localised(local, english, 'partners').map(({ partner, text, image }) => {
          return (
            <>
              <Grid item xs={1} sm={1} md={2} />
              <Grid item xs={1} sm={1} md={2} />
              <Grid item xs={10} sm={10} md={4} spacing={3} direction="column" justify="center">
                <Typography variant="h6">{partner}</Typography>
                <Typography variant="body1">{text}</Typography>
              </Grid>
              <Hidden mdUp>
                <Grid item xs={1} sm={1} md={2} />
                <Grid item xs={1} sm={1} md={2} />
              </Hidden>
              <Grid item xs={10} sm={10} md={4} spacing={3}>
                <Img
                  style={{ maxHeight: '300px' }}
                  imgStyle={{ objectPosition: '0% 0%' }}
                  fluid={image.childImageSharp.fluid}
                />
              </Grid>
            </>
          )
        })}
      </Grid>
    </div>
  </Layout>
)

export default Partners
