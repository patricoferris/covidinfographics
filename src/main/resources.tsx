import React from 'react'
import useTranslations, { Translations } from '../utils/useTranslations'
import localizeText from '../utils/localizeText'

const Resources: React.SFC = () => {
  const ts: Translations = useTranslations()
  return <div>{localizeText({ translations: ts, category: 'resources', id: 'placeholder' })}</div>
}

export default Resources
