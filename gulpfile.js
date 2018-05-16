// Include gulp
var gulp              = require('gulp');

 // Include plugins
var plumber           = require('gulp-plumber');
var notify            = require('gulp-notify');
var concat            = require('gulp-concat');
var stylus            = require('gulp-stylus');
var autoprefixer      = require('autoprefixer-stylus');
var path              = require('path');
var browserSync       = require('browser-sync').create();
var cleanCSS          = require('gulp-clean-css');
var uglify            = require('gulp-uglify');
var sourcemaps        = require('gulp-sourcemaps');

// Errornotification
var onError = function(err) {
  notify.onError({
    title:    'Gulp Fail!',
    subtitle: 'Fehlermeldung:',
    message:  '<%= error.message %>',
    sound:    'Beep'
  })(err);
  console.error('' + err);
  this.emit('end');
};

// Browsersync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

 // Concatenate, minify and sourcemap JS Files
gulp.task('scripts', function() {
  return gulp.src('./assets/scripts/*.js')
  .pipe(plumber({errorHandler: onError}))
  .pipe(sourcemaps.init())
  .pipe(concat('functions.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/scripts'))
  .pipe(browserSync.stream());
});

// Compile, prefix, minify, concatenate and sourcemap Stylus files
gulp.task('stylus', function () {
  return gulp.src(['./assets/styles/lib/*.css', './assets/styles/*.styl'])
  .pipe(plumber({errorHandler: onError}))
  .pipe(sourcemaps.init())
  .pipe(stylus({
    'include css': true,
    compress: false,
    use: autoprefixer()
  }))
  .pipe(concat('styles.min.css'))
  .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream());
});

// Watch Task
gulp.task('watch', function() {
  // Watch .js files
  gulp.watch('assets/scripts/*.js', ['scripts']);
  // Watch .styl files
  gulp.watch('assets/styles/*.styl', ['stylus']);
  // Watch .php files and reload
  gulp.watch('*.html', browserSync.reload);
});

// Default Task
gulp.task('default', ['watch', 'browser-sync']);
