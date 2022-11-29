const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  }
})
