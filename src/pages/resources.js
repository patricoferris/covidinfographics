import React from "react"
import useTranslations from "../components/useTranslations"

const Resources = () => {
  const { resources } = useTranslations()
  return (
    <div>{resources.placeholder}</div>
  )
}

export default Resources