// https://dev.to/k0d3d/unit-testing-for-gatsby-using-jest-typescript-and-react-testing-library-i7p
const path = require('path')

module.exports = {
  setupFilesAfterEnv: [path.resolve(__dirname, './__mocks__/setup-test-env.js')],
  transform: {
    // "^.+\\.(tsx?|jsx?)$": "ts-jest",
    '^.+\\.(tsx?|jsx?)$': `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    // "\\.svg": `./jest-configs/__mocks__/file-mocks.js`,
    'typeface-*': 'identity-obj-proxy',
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/jest-configs/__mocks__/file-mocks.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverage: false,
  coverageReporters: ['lcov', 'text', 'html'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
