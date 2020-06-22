/* esline-disable */
const path = require(`path`)
const locales = require(`./config/i18n`)
const { removeTrailingSlash } = require(`./src/utils/gatsby-node-helpers`)

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
      let slug = path.basename(page.node.relativePath, '.tsx')
      slug = slug === 'index' ? '/' : `/${slug}`

      // Use the values defined in "locales" to construct the path
      const localizedPath = locales[lang].default ? slug : `${locales[lang].path}${slug}`

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
    })
  })
}
