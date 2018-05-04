const path        = require('path');
const gulp        = require('gulp');
const concat      = require('gulp-concat');
const concatCss   = require('gulp-concat-css');
const less        = require('gulp-less');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();
const vendor      = require('gulp-concat-vendor');
const babel       = require('gulp-babel');
const uglify      = require('gulp-uglify');
const nodemon     = require('gulp-nodemon');
const sequence    = require('run-sequence');
const mkdirs      = require('mkdirs');
const reload      = browserSync.reload;
const {
  log,
  execute,
  sep
} = require('./local/node_modules/lib/functions');

//                COMPILERS / TRANSFORMERS / COPY

const DOCKER_MONGO_SCRIPT = 'docker run --rm --name mongo-dev -p 27017:27017 mongo';

gulp.task('start-mongo', function() {
  return execute(DOCKER_MONGO_SCRIPT);
});

// Copy Unity-Homes templates to /dist
gulp.task('copy-views', function() {
  return gulp.src('public/views/**/*.ejs')
    .pipe(gulp.dest('dist/views'));
});
// Copy Unity-Homes images to /media/images
gulp.task('copy-images', function() {
  return gulp.src([
    'public/assets/images/**/*.jpg',
    'public/assets/images/**/*.png',
    ]).pipe(gulp.dest('dist/media/images'));
});
// Copy Unity-Homes images to /media/images/favicon
gulp.task('copy-favicon', function() {
  return gulp.src('public/assets/images/favicon/*.ico').pipe(gulp.dest('dist/media/images/favicon'));
});
// Copy minified bootstrap CSS to dist/
gulp.task('copy-bootstrap', function() {
  return gulp.src('public/assets/vendor/bootstrap-4.0.0/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('dist/css'));
});

// Concat minified vendor scripts
//
// Anything added to the array in src() will end
// up in vendor.js, sorted in order of their
// dependencies.
gulp.task('vendor', function() {
   return  gulp.src([
        'public/assets/vendor/jquery/jquery-3.2.1.slim.min.js',
        'public/assets/vendor/popper/popper-1.12.9.min.js',
        'public/assets/vendor/bootstrap-4.0.0/dist/js/bootstrap.min.js',
    ])
    .pipe(vendor('vendor.js'))
    .pipe(gulp.dest('./dist/js'));
});
 // Compile less
gulp.task('compile-less', function() {  
  return gulp.src('./public/assets/less/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'));
});
 // Dev compile less
 // Dev - Transpiles, minifies, and concats custom scripts
// .pipe(browserSync.stream()) guarantees browserSync doesn't
// update before this operation is complete.
gulp.task('dev-compile-less', function() {  
  return gulp.src('./public/assets/less/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});
// Compile sass
gulp.task('compile-sass', function () {
  return gulp.src('./public/assets/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
// Dev compile sass
// Dev - Transpiles, minifies, and concats custom scripts
// .pipe(browserSync.stream()) guarantees browserSync doesn't
// update before this operation is complete.
gulp.task('dev-compile-sass', function () {
  return gulp.src('./public/assets/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});
// Transpiles, minifies, and concats custom scripts
gulp.task('compile-scripts', function() {
  return gulp.src('public/assets/js/*.js', { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/js/'));
});
// Dev - Transpiles, minifies, and concats custom scripts
gulp.task('dev-compile-scripts', function() {
  return gulp.src('public/assets/js/*.js', { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
});

//                    WATCHERS

// Watch and recompile less
gulp.task('watch-less', function() {  
  return gulp.watch('./public/assets/less/**/*.less' , ['dev-compile-less']);
});
// Watch and recompile sass
gulp.task('watch-sass', function () {
  return gulp.watch('./public/assets/sass/**/*.scss', ['dev-compile-sass']);
});
// Watch and retranspile js
gulp.task('watch-js', function () {
  return gulp.watch('./public/assets/js/**/*.js', ['dev-compile-scripts']);
});
 // Watch and copy views
gulp.task('watch-views', function() {  
  return gulp.watch('public/views/**/*.ejs' , ['copy-views']);
});
 // Watch and copy images
gulp.task('watch-images', function() {  
  return gulp.watch(['public/assets/images/**/*.jpg','public/assets/**/*.png'] , ['copy-images']);
});
 // Watch and copy favicon
gulp.task('watch-favicon', function() {  
  return gulp.watch('public/assets/images/favicon/*.ico', ['copy-favicon']);
});

//                          COMPOUND TASKS

// Watches all front end files, will recompile on changes
gulp.task('watch', [
  'watch-less',
  'watch-sass',
  'watch-views',
  'watch-images',
  'watch-favicon'
]);

// Sets up back-end server, watches local files
gulp.task('dev-back', function() {
  let nodemon = require('gulp-nodemon'),
      spawn   = require('cross-spawn'),
      bunyan;

  nodemon({
    script: './dev/dev_server.js',
    watch:    ['./local'],
    stdout:   false,
    readable: false
  })
  .on('readable', function() {

  // free memory 
  bunyan && bunyan.kill()

  bunyan = spawn('./node_modules/bunyan/bin/bunyan', [
    '--output', 'short',
    '--color'
  ])

  bunyan.stdout.pipe(process.stdout)
  bunyan.stderr.pipe(process.stderr)

  this.stdout.pipe(bunyan.stdin)
  this.stderr.pipe(bunyan.stdin)
  });
});

// Servers front end files, re-routes request to back-end server
gulp.task('dev-front', function () {
  browserSync.init({
      proxy: 'localhost:3000'
  });
  // Watch and reload
  gulp.watch("./dist/css/*.css").on("change", reload);
  gulp.watch("./dist/js/*.js").on("change", reload);
  gulp.watch("./dist/views/**/*.ejs").on("change", reload);
});

gulp.task('build', [
  'copy-views',
  'compile-less',
  'compile-sass',
  'copy-bootstrap',
  'vendor',
  'copy-images',
  'copy-favicon',
  'compile-scripts',
]);

gulp.task('dev', function() {
  return sequence(['watch', 'dev-back', 'dev-front'])
});

//                         UNUSED TASKS

// Copy minified bootstrap JS
gulp.task('copy-bootstrap-js', function() {
  return gulp.src('public/assets/vendor/bootstrap-4.0.0/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('dist/js'));
});
// Copy minified jQuery slim
gulp.task('copy-bootstrap-js', function() {
  return gulp.src('public/assets/vendor/jquery/jquery-3.2.1.slim.min.js')
    .pipe(gulp.dest('dist/js'));
});
// Copy minified tether
gulp.task('copy-bootstrap-js', function() {
  return gulp.src('public/assets/vendor/tether/tether-1.4.0.min.js')
    .pipe(gulp.dest('dist/js'));
});
gulp.task('bundle-css', function() {
  return gulp.src('./public/assets/css/*.css')
    .pipe(concatCss('styles.bundle.css'))
    .pipe(gulp.dest('./dist/css/'));
});
