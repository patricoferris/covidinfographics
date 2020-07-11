import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import LocalizedLink from './LocalizedLink'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SimpleCard from './Card'

interface TopicGridProps {
  topics: Array<string>
}

const TopicGrid: React.SFC<TopicGridProps> = ({ topics }) => {
  const [displayed, setDisplayed] = React.useState(topics)

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
            <LocalizedLink key={topic} to={`/content/${topic}`}>
              <Grid key={topic} item sm={12} md={4}>
                <SimpleCard title={topic} />
              </Grid>
            </LocalizedLink>
          )
        })}
      </Grid>
    </div>
  )
}

export default TopicGrid
