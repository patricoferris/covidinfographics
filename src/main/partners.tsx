import React from 'react'
import { Layout } from '../components/Layout'
import localised from '../utils/text'
import { Grid, Typography } from '@material-ui/core'
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
        <Grid item sm={false} md={1} />
        <Grid item sm={12} md={10} spacing={3}>
          <Typography variant="h4">{localised(local, english, 'title')}</Typography>
        </Grid>
        <Grid item sm={false} md={1} />
        {localised(local, english, 'partners').map(({ partner, text, image }) => {
          return (
            <>
              <Grid item sm={false} md={1}></Grid>
              <Grid container sm={12} md={5} spacing={3} direction="column" justify="center">
                <Typography variant="h6">{partner}</Typography>
                <Typography variant="body1">{text}</Typography>
              </Grid>
              <Grid item sm={12} md={5} spacing={3}>
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
