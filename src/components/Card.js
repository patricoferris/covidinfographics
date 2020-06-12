import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(3)
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
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
          {props.title}
        </Typography>
        <Typography component="p">
          {props.content}
        </Typography>
        {props.children}
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};