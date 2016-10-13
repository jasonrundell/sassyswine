var gulp = require('gulp'),
  sass = require('gulp-sass'),
  del = require('del');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

// Config
var appConnectPort = 8080;
var appDestinationFolder = 'dist';
var appSourceFolder = 'src';
var appBrowser = 'chrome'; // others: 'google-chrome' (Linux), 'chrome' (Windows), 'firefox'

// SASS
gulp.task('sass', function() {
  return gulp.src(appSourceFolder + '/sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(appDestinationFolder + '/css'))
    .pipe(plugins.connect.reload())
    .pipe(plugins.notify({ message: 'Styles task complete' }));
});

// Pug (formerly Jade)
gulp.task('pug', function() {
  var YOUR_LOCALS = {};

  gulp.src(appSourceFolder + '/pug/**/*.pug')
    .pipe(plugins.pug({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(appDestinationFolder))
    .pipe(plugins.connect.reload())
    .pipe(plugins.notify({ message: 'Pug task complete' }));
});

// JavaScript
gulp.task('js', function() {
  return gulp.src(['node_modules/angular/angular.js',appSourceFolder + '/js/**/*.js'])
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('scripts.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(appDestinationFolder + '/js'))
    .pipe(plugins.connect.reload())
    .pipe(plugins.notify({ message: 'JS task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(appSourceFolder + '/images/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(appDestinationFolder + '/images'))
    .pipe(plugins.connect.reload())
    .pipe(plugins.notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
  del([appDestinationFolder + '/css', appDestinationFolder + '/js', appDestinationFolder + '/images'], cb)
});

// start web server
gulp.task('connect', function() {
  plugins.connect.server({ root: appDestinationFolder, port: appConnectPort, livereload: true });
});


// open
gulp.task('open', function(){
  var options = {
    url: 'http://localhost:8080',
    app: appBrowser
  };
  gulp.src('dist/index.html')
    .pipe(plugins.open('', options));
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('sass', 'pug', 'js', 'images', 'connect', 'open', 'watch');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(appSourceFolder + '/sass/**/*.scss', ['sass']);

  // Watch .pug files
  gulp.watch(appSourceFolder + '/pug/**/*.pug', ['pug']);

  // Watch .js files
  gulp.watch(appSourceFolder + '/js/**/*.js', ['js']);

  // Watch image files
  gulp.watch(appSourceFolder + '/images/**/*', ['images']);

  plugins.livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch([appDestinationFolder + '/**']).on('change', plugins.livereload.changed);

});