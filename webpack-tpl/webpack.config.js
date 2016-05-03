const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const mqpacker            = require('css-mqpacker');                // MQ 包装器
const cssimport           = require('postcss-import');              // css import
const nested              = require('postcss-nested');              // 支持css嵌套

const uglifyJsPlugin    = webpack.optimize.UglifyJsPlugin;

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    app: ['./src/js/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'dest'),
    publicPath: (env == 'development' ? 'http://localhost:8080/' : '/'),
    filename: 'js/[hash:8].[name].js',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    root: [
      path.join(__dirname, 'src', 'js'),
      path.join(__dirname, 'node_modules')
    ],
    //配置别名，在项目中可缩减引用路径 【可以读取文件夹动态生成】
    alias: {
      'jquery' : 'jquery/dist/jquery.min.js',
      'site.config' : 'config.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.(jpg|png|gif)$/i,
        loader: 'file?limit=10000&name=images/[hash:8].[name].[ext]'
      },
      {
        test: /\.(woff|eot|ttf|woff2|svg|otf)$/i,
        loader: 'file?limit=10000&name=font/[hash:8].[name].[ext]'
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader') // style-loader
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss: function (webpack) {
      return [
        cssimport({
          addDependencyTo: webpack
        }),
        nested,
        autoprefixer,
        mqpacker
      ];
  },
  plugins: [
    // new webpack.DefinePlugin({ // redux
    //   'process.env.NODE_ENV': '"production"'
    // }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/[contenthash:8].[name].css',{
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
}

