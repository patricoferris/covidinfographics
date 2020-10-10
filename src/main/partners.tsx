import React from 'react'
import { Layout } from '../components/Layout'
import localised from '../utils/text'
import { Grid, Typography, Hidden } from '@material-ui/core'
import Img from 'gatsby-image'
import Gallery from '../components/Gallery'

type PartnersContent = Record<string, unknown>

interface PartnersProps {
  pageContext: {
    local: PartnersContent
    english: PartnersContent
  }
}

const Partners: React.SFC<PartnersProps> = ({ pageContext: { local, english } }) => (
  <Layout>
    <div className="global-wrapper">
      <Typography variant="h3">{localised(local, english, 'title')}</Typography>
      <Typography variant="body1">{localised(local, english, 'description')}</Typography>
      <Gallery title="Partners">
        {localised(local, english, 'partners').map(({ partner, text, image, url }, i) => {
          return (
            <>
              <div key={partner} style={{ padding: '2em', flexBasis: '33.3%' }}>
                <a href={url}>
                  <Img
                    style={{ maxHeight: '300px' }}
                    imgStyle={{ objectPosition: '0% 0%' }}
                    fluid={image.childImageSharp.fluid}
                  />
                </a>
                <Typography variant="h6">{partner}</Typography>
                <Typography variant="body1">{text}</Typography>
              </div>
            </>
          )
        })}
      </Gallery>
      <hr />
      <Gallery title="Media">
        {localised(local, english, 'features').map(
          ({ featureTitle, featureText, image, url }, i) => {
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
          }
        )}
      </Gallery>
    </div>
  </Layout>
)

export default Partners
