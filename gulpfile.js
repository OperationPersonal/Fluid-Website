var gulp = require('gulp');
var sass = require('gulp-sass');
var jsdoc = require('gulp-jsdoc3');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack-stream');
var del = require('del');

var config = require('./config/gulp');

gulp.task('clean', function(){
  return del(['dist']);
});

gulp.task('sass', function() {
  return gulp.src('./public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./public/sass/*.scss', ['sass']);
});

gulp.task('bootstrap-copy', function(){
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  return nodemon(config.nodemon)
    .on('restart', function() { console.log('restarted!'); });
});

gulp.task('doc', function(done) {
  return gulp.src(['./**/*.js*', '!gulpfile.js', '!node_modules/**/*'], { read: false })
    .pipe(jsdoc(config.jsdoc, done));
});

gulp.task('default', ['watch', 'sass:watch', 'webpack', 'bootstrap-copy']);

gulp.task('webpack', function() {
  return gulp.src(['./public/js/**/*.js'])
    .pipe(webpack(config.webpack))
    .on('error', function(err) {
      this.emit(err);
    })
    .pipe(gulp.dest('./dist/js'));
});
