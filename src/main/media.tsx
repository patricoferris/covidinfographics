import React from 'react'
import { Layout } from '../components/Layout'
import localised from '../utils/text'
import { Typography } from '@material-ui/core'
import Img from 'gatsby-image'
import Gallery from '../components/Gallery'

type MediaContent = Record<string, unknown>

interface MediaProps {
  pageContext: {
    local: MediaContent
    english: MediaContent
  }
}

const Media: React.SFC<MediaProps> = ({ pageContext: { local, english } }) => (
  <Layout>
    <div className="global-wrapper">
      <Typography variant="h3">{localised(local, english, 'title')}</Typography>
      <Typography variant="h6">{localised(local, english, 'description')}</Typography>
      <Gallery>
        {localised(local, english, 'features').map(({ featureTitle, featureText, image, url }) => {
          return (
            <>
              <div key={featureTitle} style={{ padding: '2em', flexBasis: '33.3%' }}>
                <a href={url}>
                  <Img
                    style={{ maxHeight: '300px' }}
                    imgStyle={{ objectPosition: '0% 0%' }}
                    fluid={image.childImageSharp.fluid}
                  />
                </a>
                <Typography variant="h6">{featureTitle}</Typography>
                <Typography variant="body1">{featureText}</Typography>
              </div>
            </>
          )
        })}
      </Gallery>
    </div>
  </Layout>
)

export default Media
