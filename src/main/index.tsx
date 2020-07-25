import React from 'react'
import Img from 'gatsby-image'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Layout } from '../components/Layout'
import localised from '../utils/text'

import BackgroundImage from 'gatsby-background-image'
import { Typography, Button } from '@material-ui/core'
import LocalizedLink from '../components/LocalizedLink'

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
  aboutImage: {
    width: '100%',
    height: '500px',
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
  aboutText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20%',
    alignContent: 'center',
    backgroundColor: '#E2EEC2',
    height: '500px',
  },
}))

const Index: React.SFC<IndexProps> = ({ pageContext: { local, english } }) => {
  const classes = useStyles()
  return (
    <Layout>
      <Grid container spacing={5}>
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
        <Grid style={{ height: '40px' }} item sm={false} md={12} />
        <Grid item sm={false} md={1} />
        <Grid item sm={12} md={5}>
          <div className={classes.aboutText}>
            <Typography style={{ marginBottom: '1.2rem' }} variant="h3">{localised(local, english, 'aboutTitle')}</Typography>
            <Typography style={{ marginBottom: '1.2rem' }} variant="body1">{localised(local, english, 'aboutMessage')}</Typography>
            <Button variant="outlined">
              <LocalizedLink to={'/about'}>About</LocalizedLink>
            </Button>
          </div>
        </Grid>
        <Grid item sm={12} md={5}>
          <BackgroundImage className={classes.aboutImage} fluid={localised(local, english, 'titleBgImg').childImageSharp.fluid} />
        </Grid>
        <Grid style={{ height: '100px' }} item sm={false} md={12} />
      </Grid>
    </Layout>
  )
}

export default Index
