"use strict";

var gulp         = require('gulp');
var clean        = require('gulp-clean');
var rename       = require('gulp-rename');
var babel= require('gulp-babel');

gulp.task('clean', function(){
  return gulp.src('./build')
        .pipe(clean());
});

gulp.task('es6', ['clean'],  function(){
  return gulp.src('./src/**/*.js', { base: process.cwd() })
        .pipe(babel())
        .on('error', errorHandler)
        .pipe(rename({
          dirname: './build'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function(){
  gulp.watch([
    './src/**/*.js'
  ], ['es6']);
});0

gulp.task('default', ['es6']);

function errorHandler(error){
  console.log('Error:' + error.message);
  this.emit('end');
}