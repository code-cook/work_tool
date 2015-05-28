var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

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
    .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(config.imageDist));
});

gulp.task('default', function(a){
  gulp.run('jsmin');
  gulp.run('cssmin');
  gulp.run('imagemin');
});