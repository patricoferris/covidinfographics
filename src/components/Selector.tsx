import React from 'react'
import { navigate } from 'gatsby'
import { LocaleContext } from './Layout'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'

interface LocaleProperpties {
  default: boolean
  path: string
  name: string
  locale: string
  dateFormat: string
  siteLanguage: string
  ogLanguage: string
  defaultTitle: string
  defaultDescription: string
}

interface SelectorProps {
  languages: LocaleProperpties[]
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const Selector: React.SFC<SelectorProps> = ({ languages }) => {
  const classes = useStyles()
  const { locale } = React.useContext(LocaleContext)
  const [language, setLanguage] = React.useState(locale)

  const handleChange = (event) => {
    const path = event.target.value === 'en' ? '/' : `/${event.target.value}`
    setLanguage(event.target.value)
    navigate(path)
  }

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={language}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.name} value={lang.path}>
            {lang.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Lanuage selector</FormHelperText>
    </FormControl>
  )
}

export default Selector
