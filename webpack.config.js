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
  context: path.resolve(__dirname, "public"),

  // Optionally: entry: './app.js',
  // This (below) allows for advanced config, like
  // multiple entry points.
  entry: {
    admin          : './dashboard/admin.js',
    tenant         : './dashboard/tenant.js',
    main           : './assets/js/main.js',
    login          : './assets/js/login.js',
    passwordPopover: './assets/js/passwordPopover.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
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
      test: /\.ejs$/,
      use: ['html-loader']
    },{
      test: /\.css$/,
      include: [
        path.resolve(__dirname, 'public', 'dashboard', 'assets', 'css'),
        ],
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
      include: [
        path.resolve(__dirname, 'public', 'assets', 'images'),
      ],
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            // VERY IMP: ADD '/' to end of outputPath
            // to avoid concatenating the specified string
            // and the filename.
            outputPath: './dist/assets/',
            publicPath: './dist/'
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
    new CleanWebpackPlugin(['dist']),
    // This plugin simplifies creation of HTML files
    new HtmlWebpackPlugin({
      filename: 'admin.ejs',
      template: 'dashboard/admin.html',
      chunks: ['admin']
    }),
    new HtmlWebpackPlugin({
      filename: 'tenant.ejs',
      template: 'dashboard/tenant.html',
      chunks: ['tenant']
    }),
    new HtmlWebpackPlugin({
      filename: 'apply.ejs',
      template: 'views/apply.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.ejs',
      template: 'views/contact.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'error.ejs',
      template: 'views/error.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'home.ejs',
      template: 'views/home.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'listings.ejs',
      template: 'views/listings.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.ejs',
      template: 'views/login.ejs',
      chunks: ['main', 'login']
    }),
    new HtmlWebpackPlugin({
      filename: 'register.ejs',
      template: 'views/register.ejs',
      chunks: ['main', 'passwordPopover']
    }),
    new HtmlWebpackPlugin({
      filename: 'registered.ejs',
      template: 'views/registered.ejs',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'includes/head.ejs',
      template: 'includes/head.ejs',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: 'includes/nav.ejs',
      template: 'includes/nav.ejs',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: 'includes/footer.ejs',
      template: 'includes/footer.ejs',
      chunks: []
    }),
    // The instance of ExtractTextPlugin
    extractPlugin,
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
