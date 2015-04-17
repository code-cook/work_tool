var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var config = require('./config.json');

var path = {
  js : 'lib/*.js'
}

gulp.task('jsmin', function() {
  return gulp.src(config.jsSrc + path.js) // 指定源
    .pipe(uglify({mangle: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.jsSrc + '/dist')); // 指定输出
});

gulp.task('default', function(a){
  gulp.start('jsmin');
});