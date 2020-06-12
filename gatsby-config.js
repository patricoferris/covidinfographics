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
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },  
        theme: {
          palette: {
              primary: {
                  main: '#BA3D3B', // new color here 
              } 
          },
        },
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}
