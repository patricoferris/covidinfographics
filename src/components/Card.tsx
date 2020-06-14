import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

interface CardProps {
  title?: string
  content?: string
  children?: React.ReactChild
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(3),
    backgroundColor: '#f5f5f5',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    color: theme.palette.primary.main,
  },
  pos: {
    marginBottom: 12,
  },
}))

const SimpleCard: React.SFC<CardProps> = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
          {props.title}
        </Typography>
        <Typography component="p">{props.content}</Typography>
        {props.children}
      </CardContent>
    </Card>
  )
}

export default SimpleCard
