var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var _ = require('lodash');

var config = require('./config.json');

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
    .pipe(concat(config.cssName))
    .pipe(minifycss({}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.cssDist));
});

gulp.task('default', function(a){
  gulp.run('jsmin');
  gulp.run('cssmin');
});