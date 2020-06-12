import React from "react"
import { Link } from "gatsby"
import { LocaleContext } from "./Layout"
import locales from "../../config/i18n"

// A little link mangling is require to inject the correct locale
const LocalizedLink = ({ to, ...props }) => {
  const { locale } = React.useContext(LocaleContext)
  const isIndex = to === `/`

  const path = locales[locale].default
    ? to
    : `${isIndex ? `` : `${to.substr(1, to.length)}`}`
  return <Link {...props} to={path} />
}

export default LocalizedLink
