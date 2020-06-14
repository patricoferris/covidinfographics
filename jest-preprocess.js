// https://dev.to/k0d3d/unit-testing-for-gatsby-using-jest-typescript-and-react-testing-library-i7p
const babelOptions = {
  presets: ['@babel/preset-react', 'babel-preset-gatsby', '@babel/preset-typescript'],
}

module.exports = require('babel-jest').createTransformer(babelOptions)
