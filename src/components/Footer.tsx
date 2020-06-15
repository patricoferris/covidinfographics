import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((_theme) => ({
  footer: {
    backgroundColor: '#20232a',
    color: '#ffffff',
  },
  link: {
    '&:hover': {
      color: 'yellow',
    },
    textDecoration: 'none',
    color: '#ffffff',
  },
}))

const Footer: React.SFC = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.footer} container spacing={3}>
      <Grid item sm={false} md={2} />
      <Grid item sm={12} md={4}>
        <Typography variant="h6">Platforms</Typography>
        <ul>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
        </ul>
      </Grid>
      <Grid item sm={12} md={4}>
        <Typography variant="h6">Sources</Typography>
        <ul>
          <li>NHS</li>
          <li>NICE</li>
          <li>WHO</li>
        </ul>
      </Grid>
      <Grid item sm={false} md={2} />
      <Grid item sm={false} md={2} />
      <Grid item sm={12} md={4}>
        &copy; 2020 Copyright
      </Grid>
      <Grid item sm={12} md={4}>
        <a className={classes.link} href="https://github.com/baizel/covidinfographics">
          Source Code
        </a>
      </Grid>
    </Grid>
  )
}

export default Footer
