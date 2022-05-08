/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

// eslint-disable-next-line import/no-extraneous-dependencies
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/electron/electron.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/electron/preload.js', to: 'preloadScripts/preload.js' }
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  }
}
