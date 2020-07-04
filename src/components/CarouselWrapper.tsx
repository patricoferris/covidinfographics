import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Carousel from 'react-material-ui-carousel'
import Img, { FluidObject } from 'gatsby-image'
import { Paper } from '@material-ui/core'

interface ItemProps {
  fluid: FluidObject
}

const Item: React.SFC<ItemProps> = ({ fluid }) => {
  return <Img fluid={fluid} />
}

const CarouselWrapper: React.SFC = () => {
  const {
    rawData: { edges },
  } = useStaticQuery(
    graphql`
      {
        rawData: allFile(filter: { sourceInstanceName: { eq: "carousel" }, ext: { eq: ".png" } }) {
          edges {
            node {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  )

  return (
    <div>
      <Carousel>
        {edges.map(({ node }) => {
          return <Item key={node} fluid={node.childImageSharp.fluid} />
        })}
      </Carousel>
    </div>
  )
}

export default CarouselWrapper
