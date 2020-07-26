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
  english_name: string
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
    minWidth: 120,
  },
  item: {
    paddingLeft: '5px',
  },
}))

const Selector: React.SFC<SelectorProps> = ({ languages }) => {
  const classes = useStyles()
  const ctx = React.useContext(LocaleContext)
  const [language, setLanguage] = React.useState(ctx.locale)

  const handleChange = (event, setLocale) => {
    const path = event.target.value === 'en' ? '/' : `/${event.target.value}`
    setLanguage(event.target.value)
    setLocale(event.target.value)
    navigate(path)
  }

  const englishTranslation = (lang) => {
    if (lang.english_name) {
      return <span style={{ color: 'darkgrey' }}>({lang.english_name})</span>
    }
    return ''
  }

  return (
    <LocaleContext.Consumer>
      {({ locale, setLocale }) => (
        <FormControl className={classes.formControl}>
          <Select
            id="selector"
            value={language}
            onChange={(e) => handleChange(e, setLocale)}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {languages.map((lang) => (
              <MenuItem className={classes.item} key={lang.name} value={lang.path}>
                {lang.name}&nbsp; &nbsp;{englishTranslation(lang)}
              </MenuItem>
            ))}
          </Select>
          {/* <FormHelperText>Lanuage selector</FormHelperText> */}
        </FormControl>
      )}
    </LocaleContext.Consumer>
  )
}

export default Selector
