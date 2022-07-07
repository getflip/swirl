// gulpfile.js
const gulp = require('gulp');
const theo = require('gulp-theo');

const configSrc = 'src/token-config/swirl-tokens.yml';

// Transform design/props.yml to dist/props.scss:
gulp.task('tokens:css', () =>
  gulp.src(configSrc)
    .pipe(theo({
      transform: { type: 'web' },
      format: { type: 'custom-properties.css' }
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('tokens:json', () =>
  gulp.src(configSrc)
    .pipe(theo({
      transform: { type: 'web' },
      format: { type: 'json' }
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('default', gulp.series('tokens:css', 'tokens:json'));