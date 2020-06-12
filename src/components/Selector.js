import React from 'react';
import { navigate } from "gatsby"
import { LocaleContext } from "./Layout"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Selector = ({ languages }) => {
  const classes = useStyles();
  const { locale } = React.useContext(LocaleContext)
  const [language, setLanguage] = React.useState(languages.find(lang => lang.path === locale));

  const handleChange = (event) => {
    const path = event.target.value.path === "en" ? "/" : `/${event.target.value.path}`
    setLanguage(event.target.value);
    navigate(path);
  };

  return (
    <FormControl className={classes.formControl}>
        <Select
          value={language}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {languages.map(lang => <MenuItem value={lang}>{lang.name}</MenuItem>)}
        </Select>
        <FormHelperText>English</FormHelperText>
      </FormControl>
  )
}

export default Selector

