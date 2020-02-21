const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


//compile scss into class
function style() {
  //where is the scss file
  return gulp.src('./scss/**/*.scss')
  //pass through sass compiler
  .pipe(sass())
  //where to save compiled css
  .pipe(gulp.dest('./css'))
  //stream changes to all browsers
  .pipe(browserSync.stream());
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
  gulp.watch('./scss/**/*.scss', style);
  //stream changes if html changes
  gulp.watch('./*html').on('change', browserSync.reload);
  //stream changes if js changes
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
