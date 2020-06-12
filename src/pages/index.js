import React from "react"
import { graphql } from "gatsby"
import LocalizedLink from "../components/localizedLink"
import useTranslations from "../components/useTranslations"

const Index = ({ data: { allMdx } }) => {
  // useTranslations is aware of the global context (and therefore also "locale")
  // so it'll automatically give back the right translations
  const { mission, step1 } = useTranslations()

  return (
    <>
      <h1>{mission}</h1>
      <p>{step1}</p>
      <hr style={{ margin: `2rem 0` }} />
      <ul className="post-list">
        {allMdx.edges.map(({ node: post }) => (
          <li key={`${post.frontmatter.title}-${post.fields.locale}`}>
            <LocalizedLink to={`/${post.parent.relativeDirectory}`}> 
              {post.frontmatter.title}
            </LocalizedLink>
            <div>{post.frontmatter.date}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Index

export const query = graphql`
  query Index($locale: String!, $dateFormat: String!) {
    allMdx(
      filter: { fields: { locale: { eq: $locale } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: $dateFormat)
          }
          fields {
            locale
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  }
`
