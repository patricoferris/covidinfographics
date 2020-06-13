import React from "react"
import useTranslations from "../components/useTranslations"
import localizeText from "../utils/localizeText"

const Resources = () => {
  const ts = useTranslations()
  return (
    <div>{localizeText(ts, "resources", "placeholder")}</div>
  )
}

export default Resources