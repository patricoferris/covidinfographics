import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Helmet } from 'react-helmet'
import Typography from '@material-ui/core/Typography'
import Navigation from './Navigation'
import locales from '../../config/i18n'
import MdxLink from './MdxLink'

const pages = ['home', 'about', 'partners', 'media', 'involved']

interface LayoutProps {
  children: React.ReactChild
  pageContext: { locale: string }
}

// Use ContextAPI for creating an active locale
const LocaleContext = React.createContext({ locale: 'en' })

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topNav: {
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Layout: React.SFC<LayoutProps> = ({ children, pageContext: { locale } }) => {
  return (
    <LocaleContext.Provider value={{ locale }}>
      <Helmet>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </Helmet>
      <Navigation title={locales[locale].defaultTitle} pages={pages} />
      <div className="global-wrapper">
        <MDXProvider components={{ a: MdxLink }}>
          <main>{children}</main>
        </MDXProvider>
      </div>
    </LocaleContext.Provider>
  )
}

export { Layout, LocaleContext }
