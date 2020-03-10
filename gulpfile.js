const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');


//compile scss into class
function style() {
  //where is the scss file
  return gulp.src('./scss/**/*.scss')
  .pipe(sourcemaps.init())
  //pass through sass compiler
  .pipe(sass({outputStyle: 'nested'}))
  //where to save compiled css
  //.pipe(gulp.dest('./css'))
  //stream changes to all browsers
  .pipe(browserSync.stream())
  .pipe(autoprefixer({cascade:false}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./css'));
}


//watch for changes!
function watch() {
  //initializes the localhost server
  browserSync.init({
    server:{
      baseDir:'./'
    }
  });
  //is there any change to scss? then run style
  gulp.watch('./scss/**/*.scss', {ignoreInitial:false},style);
  //stream changes if html changes
  gulp.watch('./*html').on('change', browserSync.reload);
  //stream changes if js changes
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
