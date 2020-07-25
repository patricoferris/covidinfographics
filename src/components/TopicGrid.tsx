import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import LocalizedLink from './LocalizedLink'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from './Card'

interface TopicGridProps {
  topics: Array<string>
}

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    minHeight: '100px',
    backgroundColor: '#E2EEC2',
  },
}))

const TopicGrid: React.SFC<TopicGridProps> = ({ topics }) => {
  const [displayed, setDisplayed] = React.useState(topics)
  const classes = useStyles()
  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={topics}
        getOptionLabel={(option) => option}
        defaultValue={[]}
        onChange={(e, v) => (v.length === 0 ? setDisplayed(topics) : setDisplayed(v))}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Filter the health topics"
            placeholder="Health Topics"
          />
        )}
      />
      <Grid style={{ marginTop: '40px' }} container spacing={3}>
        {displayed.map((topic) => {
          return (
            <Grid key={topic} item xs={12} sm={12} md={4}>
              <LocalizedLink key={topic} to={`/content/${topic}`}>
                <Paper className={classes.box} elevation={3}>
                  <div>
                    <Typography variant="h5">{topic}</Typography>
                  </div>
                </Paper>
              </LocalizedLink>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default TopicGrid
