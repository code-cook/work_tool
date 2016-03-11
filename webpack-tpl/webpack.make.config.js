var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer      = require('autoprefixer');
var cssimport         = require('postcss-import');
var px2rem            = require('postcss-px2rem');

var uglifyJsPlugin    = webpack.optimize.UglifyJsPlugin;

var makeConfig = options => {
  return {
    entry: {
      app: ['./src/js/main.js']
    },
    output: {
      path: path.resolve(__dirname, 'dest'),
      publicPath: options.debug ? 'http://localhost:8080/' : '/',
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
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015']
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
          autoprefixer,
          // px2rem({  // 视项目情况添加
          //   remUnit: 75
          // })
        ];
    },
    plugins: [
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
        //favicon: 'src/favicon.ico',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      })
    ]
  }
}

module.exports = makeConfig;