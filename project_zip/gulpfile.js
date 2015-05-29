var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');

var _ = require('lodash');

var config = require('./config.json');

/**
 * JS 文件合并压缩
 * @author codecook
 * @param  {Array}  ) {             var src_arr [description]
 * @return {[type]}   [description]
 */
gulp.task('jsmin', function() {
  var src_arr = [];
  if(_.isArray(config.jsFilter) && config.jsFilter.length > 0){
    _.each(config.jsFilter, function(item, index){
      src_arr.push(config.jsSrc + item);  
    });
  }else{
    src_arr.push(config.jsSrc + '/**/*.js');
  }
  return gulp.src(src_arr) // 指定源
    .pipe(concat(config.jsName))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.jsDist)); // 指定输出
});

/**
 * CSS 文件合并压缩 
 * @author codecook
 * @param  {Array}  ){               var src_arr [description]
 * @return {[type]}     [description]
 */
gulp.task('cssmin', function(){
  var src_arr = [];
  if(_.isArray(config.cssFilter) && config.cssFilter.length > 0){
    _.each(config.cssFilter, function(item, index){
      src_arr.push(config.cssSrc + item);  
    });
  }else{
    src_arr.push(config.cssSrc + '/**/*.css');
  }
  return gulp.src(src_arr)
    .pipe(minifycss({  
      root: config.cssRoot,
      aggressiveMerging: false,
      keepBreaks: false,
      mediaMerging: false,
      compatibility: 'ie7',
      keepSpecialComments: 0
    }))
    .pipe(concat(config.cssName))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.cssDist));
});

/**
 * 图片优化 [ 目前发现 只对png 进行了压缩  ， jpg 没有压缩]
 * @author codecook
 * @param  {[type]} ){               } [description]
 * @return {[type]}     [description]
 */
gulp.task('imagemin', function(){
   return gulp.src( config.imageSrc + '/**/*')
    .pipe(cache(imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest(config.imageDist));
});

gulp.task('default', function(a){
  gulp.run('jsmin');
  gulp.run('cssmin');
  gulp.run('imagemin');
});