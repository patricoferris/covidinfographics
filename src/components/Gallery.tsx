import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import GatsbyImage from 'gatsby-image'

interface GalleryProps {
  title: string
  children: React.ReactChild
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
  },
  centerText: {
    textAlign: 'center',
  },
}))

const Gallery: React.SFC<GalleryProps> = ({ title, children }) => {
  const classes = useStyles()
  return (
    <>
      <Hidden smDown>
        <div>
          <Typography className={classes.centerText} variant="h4">
            {title}
          </Typography>
          <div className={classes.root}>{children}</div>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div>
          <Typography className={classes.centerText} variant="h4">
            {title}
          </Typography>
          <div style={{ flexWrap: 'wrap' }} className={classes.root}>
            {children}
          </div>
        </div>
      </Hidden>
    </>
  )
}

export default Gallery
