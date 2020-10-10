/* esline-disable */
const path = require(`path`)
const locales = require(`./config/i18n`)
const { removeTrailingSlash } = require(`./src/utils/gatsby-node-helpers`)
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

const flatten = (arr) => {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      res.push(arr[i][j])
    }
  }
  return res
}

const imageQuery = `
  childImageSharp {
    fluid {
     sizes
     srcSet
     aspectRatio
     base64
     src
    }
  }`

const languageHelper = async (graphql, page, locale, frontmatterContent) => {
  const content = await graphql(`
    {
      local: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(pages\\/${page}\\/${locale}\\/index)/" } }
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
        filter: { fileAbsolutePath: { regex: "/(pages\\/${page}\\/en\\/index)/" } }
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
  // if (!content.data) {
  //   console.log(content)
  // }
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

          const allLinks = await graphql(`
              {
                rawData: allFile(
                  filter: {
                    sourceInstanceName: { eq: "content" }
                    relativePath: { regex: "/${lang}//" }
                  }
                ) {
                  edges {
                    node {
                      name
                      relativePath
                      relativeDirectory
                      publicURL
                    }
                  }
                }
              }
            `)

          // Get unique set of topics
          const topics = new Set(
            allLinks.data.rawData.edges.map((edge) => {
              const relPath = edge.node.relativePath
              return relPath.split('/')[1]
            })
          )

          // Different pages need different things
          if (base === 'index') {
            const innerQuery = `locale
            title
            message
            tagline
            titleBgImg {
              childImageSharp {
                fluid(quality: 90, maxWidth: 1400) {
                  srcSet
                  aspectRatio
                  base64
                  sizes
                  srcWebp
                  src
                }
              }
            }
            aboutTitle
            aboutMessage
            aboutImage {
              ${imageQuery}
            }
            featuredOn
            features {
              title
              url
              image {
                ${imageQuery}
              }
            }
            contactTitle
            contactMessage`
            const { local, english } = await languageHelper(graphql, 'index', lang, innerQuery)
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
          } else if (base === 'partners') {
            const innerQuery = `title
              description
              partners {
                partner
                text
                image {
                  ${imageQuery}
                }
                url 
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
              image { 
                ${imageQuery}
              }
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
          } else if (base === 'resources') {
            const innerQuery = `title
            primaryText`
            const { local, english } = await languageHelper(graphql, 'resources', lang, innerQuery)
            createPage({
              path: removeTrailingSlash(localizedPath),
              component: template,
              context: {
                ...page.context,
                locale: lang,
                local,
                english,
                topics,
                dateFormat: locales[lang].dateFormat,
              },
            })
          } else if (base === 'media') {
            const innerQuery = `title
            description
            features {
              featureTitle
              featureText
              image {
                ${imageQuery}
              }
              url
            }`
            const { local, english } = await languageHelper(graphql, 'media', lang, innerQuery)
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
          } else if (base === 'content') {
            // Create a content page for each topic
            await Promise.all(
              [...topics].map(async (topic) => {
                let links = allLinks.data.rawData.edges.filter((edge) => {
                  const relPath = edge.node.relativePath
                  return relPath.split('/')[1] === topic && relPath.split('.')[1] !== 'md'
                })

                // Query for the frontmatter data of the topic
                const innerQuery = `
                infographics {
                  updating
                  mod_time
                  alttext
                  image {
                    name
                  }
                }
              `

                const content = await graphql(`
              {
                local: allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/(${lang}\\/${topic})/" } }
                ) {
                  edges {
                    node {
                      frontmatter {
                        ${innerQuery}
                      }
                    }
                  }
                }
                english: allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/(\\/en\\/${topic})/" } }
                ) {
                  edges {
                    node {
                      frontmatter {
                        ${innerQuery}
                      }
                    }
                  }
                }
              }`)
                const { local, english } = content.data

                const info = {
                  locals: local.edges[0]
                    ? flatten(local.edges.map((edge) => edge.node.frontmatter.infographics))
                    : undefined,
                  englishes: flatten(
                    english.edges.map((edge) => edge.node.frontmatter.infographics)
                  ),
                }

                links = links.map((link) => {
                  return {
                    ...link,
                    data: info.englishes.filter((i) => {
                      return i.image.name === link.node.name
                    })[0],
                  }
                })

                createPage({
                  path: removeTrailingSlash(`${localizedPath}/${topic}`),
                  component: template,
                  context: {
                    ...page.context,
                    locale: lang,
                    links,
                    topic,
                    info,
                    dateFormat: locales[lang].dateFormat,
                  },
                })
              })
            )
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
