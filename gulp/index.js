import findFiles from 'find';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {basename, resolve, join} from 'path';
import minimist from 'minimist';
import pkg from '../package.json';
import {lookup} from 'dns';

const root = join(__dirname, '../');
const src = join(root, './src');
const DEFAULT_DEST = join(root, './dist');

const argv = minimist(process.argv.slice(2));

let dest;
if (argv.out) {
  dest = resolve(argv.out);

  const tailname = `/${pkg.name}/`;
  const needsTail = dest.indexOf(tailname) !== (dest.length - tailname.length);

  if (needsTail) {
    if (!/[\/\\]node_modules[\/\/]?$/.test(dest)) {
      dest = join(dest, 'node_modules/');
    }

    dest = join(dest, tailname);
  }

} else {
  dest = DEFAULT_DEST;
}

function stripRoot(p = '') {
  return p.replace(root, '');
}

const plugins = gulpLoadPlugins();
const state = {
  dest,
  root,
  src,
  connected: true,
  failLint: false,
  logOutput(d) {
    const p = d.path.replace(src, dest.replace(/\/$/, ''));
    return `  - ${stripRoot(d.path)}\n    └─ ${stripRoot(p)}\n`;
  }
};

/**
 * Automatically find task scripts in current directory and require them
 */
findFiles
  .fileSync(/^((?!index).)*.js$/, __dirname)
  .forEach(file => {
    const taskPath = basename(file, '.js');
    const task = require(`./${taskPath}`);
    (typeof task === 'function' ? task : task.default)(gulp, plugins, state);
  });

gulp.task('default', [
  'styles'
]);

gulp.task('watch', [
  'watch-styles'
]);

gulp.task('_check_status', cb => {
  lookup('www.google.com', err => {
    if (err && err.code === "ENOTFOUND") {
      state.connected = false;
    }

    cb();
  });
});

gulp.task('watch:build', [
  'watch-styles'
]);
