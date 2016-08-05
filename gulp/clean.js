import del from 'del';

export default (gulp, plugins, state) => {
  gulp.task('clean', cb => {
    // only clean if connected to internet...
    if (state.connected) {
      del.sync(state.dest, {force: true});
    }

    cb();
  });
};
