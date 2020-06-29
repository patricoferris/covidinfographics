/* esline-disable */
const path = require(`path`)
const locales = require(`./config/i18n`)
const { removeTrailingSlash } = require(`./src/utils/gatsby-node-helpers`)

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
      allMarkdownRemark(
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
    }
  `)
  if (content.data.allMarkdownRemark.edges[0]) {
    return content.data.allMarkdownRemark.edges[0].node.frontmatter
  }
  return undefined
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

  pageList.map((page) => {
    const template = require.resolve(`./src/main/${page.node.relativePath}`)
    // Grab the keys ('en' & 'de') of locales and map over them
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
        return createPage({
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
        let local = await languageHelper(graphql, 'partners', lang, innerQuery)
        let english = await languageHelper(graphql, 'partners', 'en', innerQuery)
        return createPage({
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
        let local = await languageHelper(graphql, 'about', lang, innerQuery)
        let english = await languageHelper(graphql, 'about', 'en', innerQuery)
        return createPage({
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
        let local = await languageHelper(graphql, 'contact', lang, innerQuery)
        let english = await languageHelper(graphql, 'contact', 'en', innerQuery)
        return createPage({
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
  })
}
