"use strict"

const gutil               = require('gulp-util');
const webpack             = require('webpack');
const webpackConfig       = require('./webpack.config.js');
const webpackDevConfig    = require('./webpack.dev.config.js');
const gulp                = require('gulp');
const webpackDevServer    = require('webpack-dev-server');
const clean               = require('gulp-clean');

/**
 * clean
 */
gulp.task('clean', () => {
  return gulp.src('dest', {read: false})
    .pipe(clean());
});

/**
 * webpack pro build
 */
gulp.task('webpack:build', callback => {
  var config = Object.create(webpackConfig);
  // run webpack
  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

/**
 * webpack dev server
 */
gulp.task("webpack-dev-server", callback => {
  var config = Object.create(webpackDevConfig);
  config.devtool = "source-map";

  config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");

  var compiler = webpack(config);
  new webpackDevServer(compiler, {
    hot: true,
    //publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
  });
});

/**
 * quick
 */
gulp.task('dev', ['webpack-dev-server']);
gulp.task('build', ['clean', 'webpack:build']);
gulp.task('default', () => {
  console.log('缺少指令！please use:  [gulp dev] OR  [gulp build]');
});

function errorHandler(error) {
  console.log(error.message);
  console.log(error.fileName);
  console.log('line:', error.line, 'column:', error.column);
  this.emit('end');
}
