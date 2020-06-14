import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

interface PostProps {
  data: { mdx: { body: string; frontmatter: { title: string } } }
}

// MDX links need to point to the correct locale
const Post: React.SFC<PostProps> = ({ data: { mdx } }) => (
  <div className="blogpost">
    <h1>{mdx.frontmatter.title}</h1>
    <MDXRenderer>{mdx.body}</MDXRenderer>
  </div>
)

export default Post

export const query = graphql`
  query Post($locale: String!, $title: String!) {
    mdx(frontmatter: { title: { eq: $title } }, fields: { locale: { eq: $locale } }) {
      frontmatter {
        title
      }
      body
    }
  }
`
