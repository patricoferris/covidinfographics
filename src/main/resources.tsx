import React from 'react'
import { Layout } from '../components/Layout'
import useTranslations, { Translations } from '../utils/useTranslations'
import localizeText from '../utils/localizeText'

const Resources: React.SFC = () => {
  const ts: Translations = useTranslations()
  return (
    <Layout>
      <div>{localizeText({ translations: ts, category: 'resources', id: 'placeholder' })}</div>
    </Layout>
  )
}

export default Resources
