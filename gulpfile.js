/* gulpfile.js */

/* Local Variables */
var paths = {
  // Static files to be copied to build folder
  assets: [
    './client/assets/**/*.*',
    '!./client/assets/{styles,scripts}/**/*.*'
  ],
  // Jade will check here for .jade files
  jade: [
    './client/*.jade'
  ],
  // Jade will check these folders for .jade files
  templates: [
    './client/components/**/*.jade',
    './client/shared/**/*.jade'
  ],
  // Sass will check these folders for files when you use @import
  sass: [
    './client/assets/styles/main.sass'
  ],
  // These files are for your app's JavaScript
  scripts: [
    './client/assets/scripts/**/*.js',
    './client/*.js',
    './client/shared/**/*.js',
    './client/components/**/*.js'
  ],
}

/* Required Packages */
var $ = require('gulp-load-plugins')();
    argv = require('yargs').argv;
    gulp = require('gulp');
    rimraf = require('rimraf');
    sequence = require('run-sequence');

/* Check for --production flag */
var isProduction = !!(argv.production);

/* Task to Whipe out the build folder */
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

/* Task to copy files in the client folder except templates, Sass, and JavaScript */
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './client/'
  })
    .pipe(gulp.dest('./build'));
});

/* Task to convert jade to html */
gulp.task('jade', function() {

  var ga = $.if(isProduction, $.ga({
    url: 'auto',
    uid: 'UA-72894654-1',
    tag: 'body',
    sendPageView: true,
    anonymizeIp: false
  })
    .on('error', function (e) {
      console.log(e);
    }));

  // Convert Angular includes from jade to html
  gulp.src('./client/shared/**/*.jade')

  // Convert jade files to html
  .pipe($.jade({
    /* TODO: Non-minified HTML. Change this to false for production? */
		pretty: true
	}))
  // Publish the partial html page(s) under the deployment folder
  .pipe(gulp.dest('./build/templates/'));

  // Same as above for non-shared components
  gulp.src('./client/components/**/*.jade')
  .pipe($.jade({
		pretty: true
	}))
  .pipe(gulp.dest('./build/templates/'));

  // Convert base jade files (index.jade) to html
  // index.jade contains imports for all partials
  return gulp.src(paths.jade)

  // Convert jade files to html
  .pipe($.jade({
    /* TODO: Non-minified HTML. Change this to false for production? */
		pretty: true
	}))

  // Add Google Analytics for production builds
  .pipe(ga)

  .pipe(gulp.dest('./build/'));
});

/* Task to convert SASS to CSS */
gulp.task('styles', function() {
  var minifyCss = $.if(isProduction, $.minifyCss());

  // Convert the sass files directly under assets/styles
  // main.sass contains imports for all partials
  return gulp.src(paths.sass)

  // Convert SASS to CSS
	.pipe($.sass())

  // Concatenate all the CSS files into main.css
	.pipe($.concat('main.css'))

  // Add prefixes, like -webkit, -moz, etc
  .pipe($.autoprefixer({
    browsers: ['last 2 versions'],
    /* TODO: Research this attribute further */
    cascade: false
  }))

  .pipe(minifyCss)

  // Publish the final main.css to the deployment folder
	.pipe(gulp.dest('./build/assets/css'));
});

/* Task to compile js into a single file */
gulp.task('scripts', function() {
  var uglify = $.if(isProduction, $.uglify({
    mangle: false
  })
    .on('error', function (e) {
      console.log(e);
    }));

	return gulp.src(paths.scripts)
    .pipe(uglify)
    .pipe($.concat('app.js'))
  	.pipe(gulp.dest('./build/assets/js'));
});

/* Task to uglify JavaScript */
gulp.task('uglify', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.scripts)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./build/assets/js/'));
});

/* gulp server -  Starts a server on http://localhost:8079 */
gulp.task('server', ['build'], function() {
  gulp.src('./build')
    .pipe($.webserver({
      port: 8079,
      host: 'localhost',
      fallback: 'index.html',
      livereload: false,
      open: false
    }))
  ;
});

/* gulp build - Builds app without starting a server */
gulp.task('build', function(cb) {
  // sequence('clean', ['copy', 'sass', 'uglify'], 'jade', cb);
  sequence('clean', ['jade', 'styles', 'scripts'], 'copy', cb);
});

/* gulp watch - Watch task to run above tasks on file changes */
gulp.task('watch', function() {
  // Watch Jade
  gulp.watch([paths.jade, paths.templates], ['jade']);

  // Watch Sass
  gulp.watch([paths.sass, './client/assets/styles/**/*'], ['styles']);

  // Watch JavaScript
  gulp.watch(paths.scripts, ['scripts']);

  // Watch static files
  gulp.watch(paths.assets, ['copy']);
});

// Default task when typing 'gulp'
gulp.task('default', ['server', 'watch'])
