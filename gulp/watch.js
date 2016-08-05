import {join} from 'path';

export default (gulp, plugins, state) => {
  gulp.task('watch-styles', () => {
    gulp.start(['styles']);
    gulp.watch([
      join(state.src, './**/*.less'),
      '!./node_modules/**/*',
      '!./gulp/**/*',
      '!./dist/**/*'
    ], () => {
      gulp.start(['styles']);
    });
  });
};
