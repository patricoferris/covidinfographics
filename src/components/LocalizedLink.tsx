import React from 'react'
import { Link, navigate } from 'gatsby'
import { LocaleContext } from './Layout'
import locales from '../../config/i18n'

interface LinkProps {
  to: string
  [x: string]: any
}

// Localisation of paths i.e. inserting the locale "/fr/about"
export const localisedPath = (to: string): string => {
  const { locale } = React.useContext(LocaleContext)
  const isIndex = to === `/`

  const path = locales[locale].default
    ? to
    : `/${locales[locale].path}/${isIndex ? `` : `${to.substr(1, to.length)}`}`
  return path
}

// Inject a localised link to the Gatsby link component
const LocalizedLink: React.SFC<LinkProps> = ({ to, ...props }) => {
  return <Link {...props} to={localisedPath(to)} />
}

export default LocalizedLink
