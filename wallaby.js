module.exports = (wallaby) => ({
  files: [
    'api/**/*.js'
  ],
  tests: [
    'spec/**/*.spec.js'
  ],
  testFramework: 'ava',
  env: {
    type: 'node',
    runner: 'node'
  }
})
