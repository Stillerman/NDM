const gulp = require('gulp');
const babel = require('gulp-babel');
var server = require('gulp-server-livereload');

gulp.task('build', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', () => {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true,
      port: 5000
    }));
})
