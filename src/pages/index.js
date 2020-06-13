import React from "react"
import locales from "../../config/i18n"
import LocalizedLink from "../components/LocalizedLink"
import SimpleCard from "../components/Card"
import useTranslations from "../components/useTranslations"
import Selector from "../components/Selector"

import Grid from '@material-ui/core/Grid'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import Accordion from "../components/Accordion"
import DownloadLinks from "../components/DownloadLinks"
import localizeText from "../utils/localizeText"
  
const Index = () => {
  const ts = useTranslations()

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} md={8} spacing={3}>
          <SimpleCard title={localizeText(ts, "index", "missionTitle")} content={localizeText(ts, "index", "mission")}/>
          <SimpleCard title={localizeText(ts, "index", "stepOneTitle")} content={localizeText(ts, "index", "stepOne")}>
            <Selector languages={Object.keys(locales).map(locale => locales[locale])}/>
          </SimpleCard>
          <SimpleCard title={localizeText(ts, "index", "stepTwoTitle")} content={localizeText(ts, "index", "stepOneTitle")}>
            <br/>
            <DownloadLinks style={{marginTop: "15px"}}/>
          </SimpleCard>
        </Grid>
        <Grid item sm={12} md={4}>
          <SimpleCard title={localizeText(ts, "index", "wellBeing")} content={localizeText(ts, "index", "wellBeingText")}>
            <LocalizedLink to={"/resources"}> 
              <p>{localizeText(ts, "index", "wellBeingLink")}</p>
            </LocalizedLink>
          </SimpleCard>
          <SimpleCard>
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="C19Infographics"
              options={{height: 400}}
            />
          </SimpleCard>
        </Grid>
      </Grid>
    </>
  )
}

export default Index
