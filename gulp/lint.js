export default (gulp, plugins, state) => {
  gulp.task('lint', () => {
    const stream = gulp.src([
        '**/*.js',
        '!node_modules/**/*',
        '!public/**/*',
        '!gulp/**/*',
        // ignoring index.js this as 'export * as' is not valid ES6 and eslint dont support 'stage 1'
        '!src/index.js'
      ])
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format());

    return state.failLint
      ? stream.pipe(plugins.eslint.failOnError())
      : stream;
  });
};
