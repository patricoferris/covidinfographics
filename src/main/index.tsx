import React from 'react'
import Img from 'gatsby-image'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import { Layout } from '../components/Layout'
import Gallery from '../components/Gallery'
import localised from '../utils/text'

import BackgroundImage from 'gatsby-background-image'
import { Typography, Button } from '@material-ui/core'
import LocalizedLink from '../components/LocalizedLink'

type IndexContents = Record<string, unknown>

export interface Link {
  node: {
    ext: string
    name: string
    relativeDirectory: string
    relativePath: string
    publicURL: string
  }
}

interface IndexProps {
  pageContext: {
    local: IndexContents
    english: IndexContents
  }
}

const useStyles = makeStyles((theme) => ({
  centreText: {
    textAlign: 'center',
  },
  imageTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    minHeight: '500px',
    alignItems: 'center',
    alignContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: '500px',
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
    maxWidth: '800px',
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
              <Hidden smDown>
                <div className={classes.textMain} style={{ width: '60%' }}>
                  <Typography style={{ marginBottom: '20px' }} variant="h2">
                    {localised(local, english, 'title')}
                  </Typography>
                  <Typography variant="h6">{localised(local, english, 'message')}</Typography>
                </div>
              </Hidden>
              <Hidden mdUp>
                <div className={classes.textMain} style={{ width: '90%' }}>
                  <Typography variant="h4">{localised(local, english, 'title')}</Typography>
                  <Typography variant="body1">{localised(local, english, 'message')}</Typography>
                </div>
              </Hidden>
            </div>
          </BackgroundImage>
        </Grid>
      </Grid>
      <div className="global-wrapper">
        <Grid container spacing={5}>
          <Grid style={{ height: '40px' }} item sm={false} md={12} />
          <Grid item sm={false} md={1} />
          <Grid item sm={12} md={5}>
            <div className={classes.aboutText}>
              <Typography style={{ marginBottom: '1.2rem' }} variant="h3">
                {localised(local, english, 'aboutTitle')}
              </Typography>
              <Typography style={{ marginBottom: '1.2rem' }} variant="body1">
                {localised(local, english, 'aboutMessage')}
              </Typography>
              <LocalizedLink to={'/about'}>
                <Button variant="outlined">About</Button>
              </LocalizedLink>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <div style={{ width: '100%' }}>
              <BackgroundImage
                className={classes.aboutImage}
                fluid={localised(local, english, 'titleBgImg').childImageSharp.fluid}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Gallery title={localised(local, english, 'featuredOn')}>
              {localised(local, english, 'features').map((feature) => {
                return (
                  <a
                    style={{ height: '100%', width: '100%', flexBasis: '33%' }}
                    key={feature.title}
                    href={feature.url}
                  >
                    <div style={{ width: '100%', padding: '3em' }}>
                      <BackgroundImage
                        className={classes.aboutImage}
                        fluid={feature.image.childImageSharp.fluid}
                      />
                    </div>
                  </a>
                )
              })}
            </Gallery>
          </Grid>
          <Grid item sm={1} md={1}></Grid>
          <Grid item sm={5} md={5}>
            <Typography variant="h4">{localised(local, english, 'contactTitle')}</Typography>
            <Typography variant="h6">{localised(local, english, 'contactMessage')}</Typography>
          </Grid>
          <Grid item sm={5} md={5}>
            <LocalizedLink to={'/contact'}>
              <Button variant="outlined">Contact</Button>
            </LocalizedLink>
          </Grid>
          <Grid style={{ height: '100px' }} item sm={false} md={12} />
        </Grid>
      </div>
    </Layout>
  )
}

export default Index
