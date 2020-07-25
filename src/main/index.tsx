import React from 'react'
import Img from 'gatsby-image'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Layout } from '../components/Layout'
import localised from '../utils/text'

import BackgroundImage from 'gatsby-background-image'
import { Typography } from '@material-ui/core'

type IndexContents = Record<string, unknown>

interface IndexProps {
  pageContext: {
    local: IndexContents
    english: IndexContents
  }
}

const useStyles = makeStyles((theme) => ({
  imageTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: '500px',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  textMain: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    padding: '0.5rem',
    fontWeight: 600,
    color: 'white',
    borderRadius: '2px',
  },
}))

const Index: React.SFC<IndexProps> = ({ pageContext: { local, english } }) => {
  const classes = useStyles()
  return (
    <Layout>
      <Grid container>
        <Grid item sm={12} md={12}>
          <BackgroundImage
            className={classes.bgImage}
            fixed={localised(local, english, 'titleBgImg').childImageSharp.fluid}
          >
            <div className={classes.imageTextContainer}>
              <div className={classes.textMain} style={{ width: '60%' }}>
                <Typography variant="h1">{localised(local, english, 'title')}</Typography>
                <Typography variant="h6">{localised(local, english, 'message')}</Typography>
              </div>
            </div>
          </BackgroundImage>
        </Grid>
        <Grid item sm={12} md={12}>
          <Typography style={{ fontWeight: '700', color: 'white' }} variant="h1">
            {localised(local, english, 'title')}
          </Typography>
          <Typography style={{ color: 'white' }} variant="h1">
            {localised(local, english, 'message')}
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Index
