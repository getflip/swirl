// gulpfile.js
const gulp = require('gulp');
const theo = require('gulp-theo');
const bump = require('gulp-bump');

const configSrc = 'src/token-config/swirl-tokens.yml';

/**
 * GENERATE TOKENS
 */
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

/**
 * VERSION BUMP TASKs
 */
gulp.task('update-package-json:patch', () => 
  gulp.src('./package.json')
    .pipe(bump({ type: 'patch' }))
    .pipe(gulp.dest('./'))
);

gulp.task('update-package-json:minor', () =>
  gulp.src('./package.json')
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'))
);
gulp.task('update-package-json:major', () =>
  gulp.src('./package.json')
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./'))
);

/**
 * BUILD TASKS
 */
gulp.task('default', gulp.series('tokens:css', 'tokens:json'));
gulp.task('patch-release', gulp.series('update-package-json:patch', 'default'));
gulp.task('minor-release', gulp.series('update-package-json:minor', 'default'));
gulp.task('major-release', gulp.series('update-package-json:major', 'default'));