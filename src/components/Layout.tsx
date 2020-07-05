import React from 'react'

import { Helmet } from 'react-helmet'
import Navigation from './Navigation'
import locales from '../../config/i18n'
import { Paper } from '@material-ui/core'
import LocaleContext from '../context/LocaleProvider'
import Foot from '../components/Foot'
import { withPrefix } from 'gatsby'
const pages = ['home', 'about', 'partners', 'media', 'contact']

interface LayoutProps {
  children: React.ReactChild
}

const Layout: React.SFC<LayoutProps> = ({ children }) => {
  return (
    <LocaleContext.Consumer>
      {({ locale }) => {
        return (
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Helmet>
              <script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
              <script src={withPrefix('firebase.js')} type="text/javascript" />
              <meta charSet="utf-8" />
              <meta
                name="description"
                content="As a group of doctors, medical students and volunteers, we’ve created infographics to help summarise key points about COVID-19 in a variety of languages to get the right information, in an easy to understand format, to these communities."
              />
              <title>{locales[locale].defaultTitle}</title>
            </Helmet>
            <Paper
              style={{
                flexGrow: 1,
              }}
              elevation={3}
            >
              <Navigation title={locales[locale].defaultTitle} pages={pages} />
              <div className="global-wrapper">
                <main>{children}</main>
              </div>
            </Paper>
            <Foot key="footer" />
          </div>
        )
      }}
    </LocaleContext.Consumer>
  )
}

export { Layout, LocaleContext }
