// Include gulp
let gulp              = require('gulp');

 // Include plugins
let plumber           = require('gulp-plumber');
let notify            = require('gulp-notify');
let concat            = require('gulp-concat');
let stylus            = require('gulp-stylus');
let autoprefixer      = require('autoprefixer-stylus');
let path              = require('path');
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

 // Concatenate, minify and sourcemap JS Files
gulp.task('scripts', function() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/handlebars/dist/handlebars.js',
    './node_modules/moment/min/moment-with-locales.js',
    './public/assets/scripts/*.js'])
  .pipe(plumber({errorHandler: onError}))
  .pipe(sourcemaps.init())
  .pipe(concat('functions.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/dist/scripts'))
});

// Compile, prefix, minify, concatenate and sourcemap Stylus files
gulp.task('stylus', function () {
  return gulp.src([
    './node_modules/normalize.css/normalize.css',
    './public/assets/styles/*.styl'])
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
  .pipe(gulp.dest('./public/dist/css'))
});

// Watch Task
gulp.task('watch', function() {
  // Watch .js files
  gulp.watch('public/assets/scripts/*.js', ['scripts']);
  // Watch .styl files
  gulp.watch('public/assets/styles/*.styl', ['stylus']);
});

// Default Task
gulp.task('default', ['watch']);
