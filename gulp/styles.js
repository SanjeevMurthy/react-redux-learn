import less from 'gulp-less';
import path from 'path';
import concat from 'gulp-concat';
import {Writable, Readable} from 'stream';

export default (gulp, plugins, state) => {
  gulp.task('styles', cb => {
    const data = [];

    let ended = false;
    function end(err) {
      if (!ended) {
        ended = true;
        cb(err);
      }
    }

    gulp.src('./src/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .on('error', function (err) {
      this.end();
      end(err);
    })
    .pipe(new Writable({
      objectMode: true,
      write(d, e, n) {
        data.push(d);
        n();
      }
    }))
    .on('finish', () => {
      new Readable({
        objectMode: true,
        read() {
          const c = data.shift();
          this.push(c || null);
        }
      })
      .pipe(concat('styles.css'))
      .pipe(gulp.dest(state.dest))
      .on('finish', end);
    });
  });
};
