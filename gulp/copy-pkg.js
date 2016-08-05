import {join, dirname} from 'path';
import {Transform} from 'stream';
import {spawn} from 'child_process';
import gutil from 'gulp-util';

const ignore = [
  'devDependencies',
  'scripts'
];

const overrides = {
  browser: './ui-components.min.js'
};

const updatePkg = (pkg) => Object.keys(pkg).reduce((newPkg, key) => {
    if (!~ignore.indexOf(key)) {
      newPkg[key] = (key in overrides) ? overrides[key] : pkg[key];
    }
    return newPkg;
}, {});

export default (gulp, plugins, state) => {
  gulp.task('copy-package-json', () => {
    const output = [];

    return gulp.src(join(state.root, 'package.json'))
      .pipe(new Transform({
        objectMode: true,
        transform(d, e, n) {
          const pkg = JSON.parse(d.contents.toString('utf8'));
          output.push(state.logOutput(d));
          d.contents = new Buffer(JSON.stringify(updatePkg(pkg)));
          n(null, d);
        }
      }))
      .pipe(gulp.dest(state.dest))
      .on('finish', () => process.stdout.write(output.join('')));
  });

  gulp.task('copy-install', ['copy-package-json'], done => {
    if (!state.connected) {
      gutil.log('could not install as not connected to internet');
      done();
      return;
    }

    const pkgPath = join(state.dest, 'package.json');
    const cwd = dirname(pkgPath);
    const args = ['install'];

    spawn('npm', args, {
      cwd,
      env: process.env,
      stdio: 'inherit'
    })
    .on('end', code => done(code > 0 ? new gutil.PluginError('copy-install failed') : ''));
  });
};
