import React from "react"
import { MDXProvider } from "@mdx-js/react"
import MdxLink from "./MdxLink"

import locales from "../../config/i18n"

import { makeStyles } from '@material-ui/core/styles'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import { Helmet } from "react-helmet"
import Typography from "@material-ui/core/Typography"

// The locale context is created around the the Layout as all
// components will be children of this
const LocaleContext = React.createContext()

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topNav: {
    backgroundColor: theme.palette.primary.main
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
    <Helmet>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </Helmet>
    <AppBar position="static">
      <Toolbar className={classes.topNav}>
        <Typography variant="h5" className={classes.title}>
          {locales[locale].defaultTitle}
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    <div className="global-wrapper">
      <MDXProvider components={{ a: MdxLink }}>
        <main>{children}</main>
      </MDXProvider>
    </div>
  </LocaleContext.Provider>
  )
}

export { Layout, LocaleContext }
