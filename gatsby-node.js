/* esline-disable */
const path = require(`path`)
const locales = require(`./config/i18n`)
const { removeTrailingSlash } = require(`./src/utils/gatsby-node-helpers`)
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

const imageQuery = `image {
  childImageSharp {
    fluid {
     sizes
     srcSet
     aspectRatio
     base64
     src
    }
  }
}`

const languageHelper = async (graphql, page, locale, frontmatterContent) => {
  const content = await graphql(`
    {
      local: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(pages\\/${locale}\\/${page}\\/index)/" } }
      ) {
        edges {
          node {
            frontmatter {
              ${frontmatterContent}
            }
          }
        }
      }
      english: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(pages\\/en\\/${page}\\/index)/" } }
      ) {
        edges {
          node {
            frontmatter {
              ${frontmatterContent}
            }
          }
        }
      }
    }
  `)

  const { local, english } = content.data
  if (local.edges[0]) {
    return {
      local: local.edges[0].node.frontmatter,
      english: english.edges[0].node.frontmatter,
    }
  }
  return {
    local: undefined,
    english: english.edges[0].node.frontmatter,
  }
}

// Generate localized versions of each of the pages (can't use onCreatePage)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Get the page templates
  const pages = await graphql(`
    {
      main: allFile(filter: { sourceInstanceName: { eq: "main" } }) {
        edges {
          node {
            relativePath
          }
        }
      }
    }
  `)

  const pageList = pages.data.main.edges

  await Promise.all(
    pageList.map(async (page) => {
      const template = require.resolve(`./src/main/${page.node.relativePath}`)
      // Grab the keys ('en' & 'de') of locales and map over them
      await Promise.all(
        Object.keys(locales).map(async (lang) => {
          let base = path.basename(page.node.relativePath, '.tsx')
          let slug = base === 'index' ? '/' : `/${base}`

          // Use the values defined in "locales" to construct the path
          const localizedPath = locales[lang].default ? slug : `${locales[lang].path}${slug}`

          // Different pages need different things
          if (base === 'index') {
            // Make Graphql query for download links... will likely change in the future
            const links = await graphql(`
            {
              rawData: allFile(
                filter: {
                  sourceInstanceName: { eq: "infographics" }
                  ext: { eq: ".png" }
                  relativeDirectory: { regex: "/${lang}.*/" }
                }
              ) {
                edges {
                  node {
                    ext
                    name
                    relativeDirectory
                    relativePath
                    publicURL
                  }
                }
              }
            }
            `)
            const downloadlinks = links.data.rawData.edges
            createPage({
              path: removeTrailingSlash(localizedPath),
              component: template,
              context: {
                ...page.context,
                locale: lang,
                links: downloadlinks,
                dateFormat: locales[lang].dateFormat,
              },
            })
          } else if (base === 'partners') {
            const innerQuery = `title
          partners {
            partner
            text
            ${imageQuery}
          }
          `
            const { local, english } = await languageHelper(graphql, 'partners', lang, innerQuery)
            createPage({
              path: removeTrailingSlash(localizedPath),
              component: template,
              context: {
                ...page.context,
                locale: lang,
                local,
                english,
                dateFormat: locales[lang].dateFormat,
              },
            })
          } else if (base === 'about') {
            const innerQuery = `title 
          primaryText 
          ${imageQuery}
         `
            const { local, english } = await languageHelper(graphql, 'about', lang, innerQuery)
            createPage({
              path: removeTrailingSlash(localizedPath),
              component: template,
              context: {
                ...page.context,
                locale: lang,
                local,
                english,
                dateFormat: locales[lang].dateFormat,
              },
            })
          } else if (base === 'contact') {
            const innerQuery = `title`
            const { local, english } = await languageHelper(graphql, 'contact', lang, innerQuery)
            createPage({
              path: removeTrailingSlash(localizedPath),
              component: template,
              context: {
                ...page.context,
                locale: lang,
                local,
                english,
                dateFormat: locales[lang].dateFormat,
              },
            })
          }
        })
      )
    })
  )
}
