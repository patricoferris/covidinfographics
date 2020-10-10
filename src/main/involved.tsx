import React from 'react'
import { Layout } from '../components/Layout'
import localised from '../utils/text'
import { Typography, Grid, Button } from '@material-ui/core'

type MediaContent = Record<string, unknown>

interface MediaProps {
  pageContext: {
    local: MediaContent
    english: MediaContent
  }
}

const Media: React.SFC<MediaProps> = ({ pageContext: { local, english } }) => (
  <Layout>
    <div className="global-wrapper">
      <Typography variant="h3">{localised(local, english, 'title')}</Typography>
      <Typography variant="h6">{localised(local, english, 'description')}</Typography>
      <div style={{ marginTop: '4em' }}>
        <Grid container spacing={3}>
          <Grid item md={1} />
          <Grid xs={12} sm={12} md={5}>
            <Typography align="center" variant="h4">
              {localised(local, english, 'helpTitle')}
            </Typography>
            {localised(local, english, 'roles').map(({ roleTitle, roleBody }) => {
              return (
                <div style={{ marginBottom: '1.6em' }} key={roleTitle}>
                  <Typography variant="h5">{roleTitle}</Typography>
                  <hr />
                  <Typography variant="body1">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: roleBody.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                      }}
                    ></div>
                  </Typography>
                </div>
              )
            })}
          </Grid>
          <Grid xs={12} sm={12} md={5}>
            <Typography align="center" variant="h4">
              {localised(local, english, 'donateTitle')}
            </Typography>
            <Typography align="center" variant="h5">
              {localised(local, english, 'donateBody')}
            </Typography>
            <Typography align="center" variant="h5">
              <Button size="large" variant="contained">
                {localised(local, english, 'donateButton')}
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  </Layout>
)

export default Media
