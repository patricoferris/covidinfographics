import React from 'react'
import { Typography, Grid } from '@material-ui/core'

const Foot: React.SFC = () => {
  const link = {
    textDecoration: 'none',
    color: '#ffffff',
  }

  return (
    <Grid
      style={{
        backgroundColor: '#20232a',
        color: '#ffffff',
      }}
      container
      spacing={3}
    >
      <Grid item sm={false} md={2} />
      <Grid item sm={12} md={4}>
        <Typography variant="h6">Platforms</Typography>
        <ul>
          <li>
            <a style={link} href="https://www.facebook.com/COVID2019Infographics">
              Facebook
            </a>
          </li>
          <li>
            <a style={link} href="https://twitter.com/19Infographics">
              Twitter
            </a>
          </li>
          <li>
            <a style={link} href="https://www.instagram.com/covid19_infographics/">
              Instagram
            </a>
          </li>
        </ul>
      </Grid>
      <Grid item sm={12} md={4}>
        <Typography variant="h6">Sources</Typography>
        <ul>
          <li>
            <a style={link} href="https://www.nice.org.uk/covid-19">
              NICE
            </a>
          </li>
          <li>
            <a style={link} href="https://www.nhs.uk/conditions/coronavirus-covid-19/">
              NHS
            </a>
          </li>
          <li>
            <a style={link} href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">
              WHO
            </a>
          </li>
        </ul>
      </Grid>
      <Grid item sm={false} md={2} />
      <Grid item sm={false} md={2} />
      <Grid item sm={12} md={4}>
        &copy; 2020 Copyright
      </Grid>
      <Grid item sm={12} md={4}>
        <a style={link} href="https://github.com/baizel/covidinfographics">
          Source Code
        </a>
      </Grid>
    </Grid>
  )
}

export default Foot
