const path = require('path');
// To remove old build before production
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Importing html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Import extract-text-webpack-plugin into config file
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Don't need this, but it is good practice, and can include
// webpack's built-in plugins into project
const webpack = require('webpack');

// To put all CSS into one file, need to create
// an instance of ExtractTextPlugin.
// - Will need to add this to a rule, and use extract() method
// - Will need to add this plugin to our plugins
const extractPlugin = new ExtractTextPlugin({
  filename: './app.css'
});

const config = {
  context: path.resolve(__dirname, "public", "dashboard"),

  // Optionally: entry: './app.js',
  // This (below) allows for advanced config, like
  // multiple entry points.
  entry: {
    app: './app.js'
  },

  output: {
    path: path.resolve(__dirname, 'public', 'dashboard', 'dist'),
    filename: './[name].bundle.js'
  },

  // For loaders (stuff besides JS)
  module: {
    rules: [{
      // required prop
      test: /\.js$/,
      // optional
      include: path.resolve('public', 'dashboard'),
      // optional
      exclude: /node_modules/,
      // required
      use: {
        // Required, multiple can be chained, parsed right to left
        loader: "babel-loader",
        // Options can be string or obj
        options: {
          // Rule to enable presets
          presets: ['env']
        }
      }
    },{
      // Configuring html loader
      test: /\.html$/,
      use: ['html-loader']
    },{
      test: /\.css$/,
      include: [path.resolve(__dirname, 'public', 'dashboard', 'assets', 'css')],
      // Use the loaders extract() method
      // Pass the required loaders in the form
      // of an object inside the method
      use: extractPlugin.extract({

        // Right to left
        // E.g use: ['css-loader', 'sass-loader'],
        // use: ['css-loader'],

        // A better way
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }],
        fallback: 'style-loader'
      }),
    },{
      // For static content (images)
      test: /\.(jpg|png|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            // VERY IMP: ADD '/' to end of outputPath
            // to avoid concatenating the specified string
            // and the filename.
            outputPath: './public/dashboard/assets/',
            publicPath: './public/dashboard/assets/'
          }
        }
      ]
    },{
      // For static content (fonts)
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    }]
    // Ignore jquery (example)
    // noParse: /jquery|lodash/
  },

  // Every plugin must be a new instance
  plugins: [
    // Can have more folders than just dist
    new CleanWebpackPlugin(['public/dashboard/dist']),
    // This plugin simplifies creation of HTML files
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // So that bootstrap can find jquery
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    // The instance of ExtractTextPlugin
    extractPlugin
  ],

  devServer: {
    // Serve static images from here:
    contentBase: path.resolve(__dirname, "dist/media"),
    // Show only errors in bundle
    stats: 'errors-only',
    open: true,
    port: 3000,
    // Enable gzip compression for everything served
    compress: true
  },

  // For debugging, outputting errors
  devtool: 'inline-source-map'
};

module.exports = config;
