import React from 'react'
import locales from '../../config/i18n'
import LocalizedLink from '../components/LocalizedLink'
import SimpleCard from '../components/Card'
import useTranslations from '../utils/useTranslations'
import Selector from '../components/Selector'

import Grid from '@material-ui/core/Grid'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import DownloadLinks from '../components/DownloadLinks'
import localizeText, { LocalisationOptions } from '../utils/localizeText'

const Index: React.SFC = () => {
  const ts = useTranslations()

  const baseOptions: LocalisationOptions = {
    translations: ts,
    category: 'index',
    id: 'missionTitle',
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} md={8} spacing={3}>
          <SimpleCard
            title={localizeText({ ...baseOptions, id: 'missionTitle' })}
            content={localizeText({ ...baseOptions, id: 'mission' })}
          />
          <SimpleCard
            title={localizeText({ ...baseOptions, id: 'stepOneTitle' })}
            content={localizeText({ ...baseOptions, id: 'stepOne' })}
          >
            <Selector languages={Object.keys(locales).map((locale) => locales[locale])} />
          </SimpleCard>
          <SimpleCard
            title={localizeText({ ...baseOptions, id: 'stepTwoTitle' })}
            content={localizeText({ ...baseOptions, id: 'stepTwo' })}
          >
            <>
              <br />
              <DownloadLinks style={{ marginTop: '15px' }} />
            </>
          </SimpleCard>
        </Grid>
        <Grid item sm={12} md={4}>
          <SimpleCard
            title={localizeText({ ...baseOptions, id: 'wellBeing' })}
            content={localizeText({ ...baseOptions, id: 'wellBeingText' })}
          >
            <LocalizedLink to={'/resources'}>
              <p>{localizeText({ ...baseOptions, id: 'wellBeingLink' })}</p>
            </LocalizedLink>
          </SimpleCard>
          <SimpleCard>
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="C19Infographics"
              options={{ height: 400 }}
            />
          </SimpleCard>
        </Grid>
      </Grid>
    </>
  )
}

export default Index
