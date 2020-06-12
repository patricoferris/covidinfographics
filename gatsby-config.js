module.exports = {
  plugins: [
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/translations`,
        name: `translations`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-theme-material-ui`,
      {
        resolve: `gatsby-plugin-netlify-cms`,
        options: {
          enableIdentityWidget: true,
          publicPath: `admin`,
          htmlTitle: `Content Manager`,
        }
      }
  ],
}
