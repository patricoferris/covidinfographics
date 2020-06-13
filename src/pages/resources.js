import React from "react"
import useTranslations from "../components/useTranslations"

const Resources = () => {
  const ts = useTranslations()
  return (
    <div>{localizeText(ts, "resources", "placeholder")}</div>
  )
}

export default Resources