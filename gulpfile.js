// Include gulp
let gulp              = require('gulp');

 // Include plugins
let plumber           = require('gulp-plumber');
let notify            = require('gulp-notify');
let concat            = require('gulp-concat');
let stylus            = require('gulp-stylus');
let autoprefixer      = require('autoprefixer-stylus');
let path              = require('path');
let browserSync       = require('browser-sync').create();
let cleanCSS          = require('gulp-clean-css');
let uglify            = require('gulp-uglify-es').default;
let sourcemaps        = require('gulp-sourcemaps');

// Errornotification
let onError = function(err) {
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
  return gulp.src(['./assets/scripts/lib/*.js', './assets/scripts/*.js'])
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
  // Watch .html files and reload
  gulp.watch('*.html', browserSync.reload);
});

// Default Task
gulp.task('default', ['watch', 'browser-sync']);
