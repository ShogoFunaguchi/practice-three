var gulp = require('gulp');
var ts = require('gulp-typescript');
var target = ['./scripts/*.ts', './scripts/**/*.ts'];

gulp.task('watch', function() {
  gulp.watch(target, ['typescript']);
});

gulp.task('typescript', function() {
  return gulp.src(target)
        .pipe(ts({
          lib: ["es2015", "es2015.iterable", "dom"],
        }))
        .pipe(gulp.dest('built'));
});

gulp.task('default', ['typescript', 'watch']);