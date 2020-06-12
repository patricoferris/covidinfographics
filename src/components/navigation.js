import React from "react"
import { Link } from "gatsby"
import LocalizedLink from "./localizedLink"
import useTranslations from "./useTranslations"

const Navigation = () => {
  const { backToHome } = useTranslations()

  return (
    <nav>
      <LocalizedLink to="/" aria-label={backToHome}>
        Homepage
      </LocalizedLink>
      <div>
        <Link to="/" hrefLang="en">
          English
        </Link>
        {` `}/{` `}
        <Link to="/fr" hrefLang="fr">
          Français
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
