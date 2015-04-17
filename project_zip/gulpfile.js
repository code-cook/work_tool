var gulp = require('gulp');
var uglify = require('gulp-uglify');

var basePath = 'D:/GitHub/work_tool/project_zip/';

var path = {
  js : 'lib/*.js'
}

gulp.task('compress', function() {
  return gulp.src(basePath + path.js) // 指定源
    .pipe(uglify({
      compress: true
    }))
    .pipe(gulp.dest(basePath + '/dist')); // 指定输出
});

gulp.task('default', function(a){
  gulp.start('compress');
});