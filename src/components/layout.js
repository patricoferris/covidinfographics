import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Navigation from "./navigation"
import MdxLink from "./mdxLink"

import locales from "../../config/i18n"

import { makeStyles } from '@material-ui/core/styles'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from '@material-ui/icons/Menu'
import Typography from "@material-ui/core/Typography"

// The locale context is created around the the Layout as all
// components will be children of this
const LocaleContext = React.createContext()

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = ({ children, pageContext: { locale } }) => {
  const classes = useStyles();

  return (
  <LocaleContext.Provider value={{ locale }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {locales[locale].defaultTitle}
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    <div className="global-wrapper">
      <header className="global-header">
        <Navigation />
      </header>
      <MDXProvider components={{ a: MdxLink }}>
        <main>{children}</main>
      </MDXProvider>
    </div>
  </LocaleContext.Provider>
  )
}

export { Layout, LocaleContext }
