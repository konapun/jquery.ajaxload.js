var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');

gulp.task('minify', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      message: 'Finished minifying'
    }));
});

gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('default', function() {
  gulp.run('minify');
});
