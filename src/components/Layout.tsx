import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Navigation from './Navigation'
import locales from '../../config/i18n'
import MdxLink from './MdxLink'
import { Paper } from '@material-ui/core'

const pages = ['home', 'about', 'partners', 'media', 'involved']

interface LayoutProps {
  children: React.ReactChild
  pageContext: { locale: string }
}

// Use ContextAPI for creating an active locale
const LocaleContext = React.createContext({ locale: 'en' })

const Layout: React.SFC<LayoutProps> = ({ children, pageContext: { locale } }) => {
  return (
    <LocaleContext.Provider value={{ locale }}>
      <Helmet>
        <script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="As a group of doctors, medical students and volunteers, we’ve created infographics to help summarise key points about COVID-19 in a variety of languages to get the right information, in an easy to understand format, to these communities."
        />
        <title>{locales[locale].defaultTitle}</title>
      </Helmet>
      <Paper elevation={3}>
        <Navigation title={locales[locale].defaultTitle} pages={pages} />
        <div className="global-wrapper">
          <MDXProvider components={{ a: MdxLink }}>
            <main>{children}</main>
          </MDXProvider>
        </div>
      </Paper>
    </LocaleContext.Provider>
  )
}

export { Layout, LocaleContext }
