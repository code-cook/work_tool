"use strict"


const gutil               = require('gulp-util');
const webpack             = require('webpack');
const webpackConfig       = require('./webpack.config.js');
const gulp                = require('gulp');
const webpackDevServer    = require('webpack-dev-server');
const clean               = require('gulp-clean');
const gulp_postcss        = require('gulp-postcss');
const autoprefixer        = require('autoprefixer');                // 浏览器前缀
const mqpacker            = require('css-mqpacker');                // MQ 包装器
const cssimport           = require('postcss-import');              // css import
const nested              = require('postcss-nested');              // 支持css嵌套

/**
 * CSS DEV
 */
gulp.task('postcss', () => {
  var processors = [
    cssimport,
    nested,
    mqpacker,
    autoprefixer
  ];
  return gulp.src('./src/css/main.css')
          .pipe(gulp_postcss(processors))
          .on('error', errorHandler)
          .pipe(gulp.dest('./src/html/'))
});

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
gulp.task("webpack:dev", callback => {
  var config = Object.create(webpackConfig);

  config.devtool = "source-map";

  config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");

  var compiler = webpack(config);
  new webpackDevServer(compiler, {
    //publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
  });
});

gulp.task('watch', () => {
  gulp.watch(['./src/css/**/*.css'], ['postcss']);
});

/**
 * quick
 */
gulp.task('dev', ['webpack:dev']);
gulp.task('build', ['clean', 'webpack:build']);
gulp.task('default', () => {
  console.log('缺少指令！please use:  [gulp dev] OR  [gulp build]');
});

function errorHandler(error) {
  this.emit('end');
}
