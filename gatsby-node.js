/* esline-disable */
const path = require(`path`)
const locales = require(`./config/i18n`)
const { localizedSlug, findKey, removeTrailingSlash } = require(`./src/utils/gatsby-node-helpers`)

// As you don't want to manually add the correct language to the frontmatter of each file
// a new node is created automatically with the filename
// It's necessary to do that -- otherwise you couldn't filter by language
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // Check for "Mdx" type so that other files (e.g. images) are exluded
  if (node.internal.type === `Mdx`) {
    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    const name = path.basename(node.fileAbsolutePath, `.mdx`)

    // Check if post.name is "index" -- because that's the file for default language
    // (In this case "en")
    const isDefault = name === `index`

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, (o) => o.default === true)

    // Files are defined with "name-with-dashes.lang.mdx"
    // name returns "name-with-dashes.lang"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = isDefault ? defaultKey : name.split(`.`)[1]

    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })
  }
}

// Generate localized versions of each of the pages (can't use onCreatePage)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage, deletePage } = actions

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
