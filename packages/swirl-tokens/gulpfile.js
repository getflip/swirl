// gulpfile.js
const gulp = require("gulp");
const theo = require("gulp-theo");
// const bump = require("gulp-bump");
// const jsonToYaml = require("gulp-json-to-yaml");
const renameCssCustomProperties = require("./tokens/scripts/renameCssCustomProperties");

const configSrc = "./tokens/tokens.yml";

/**
 * HELPER TASKS
 */
gulp.task("tokens:renameproperties", () =>
  renameCssCustomProperties("dist/tokens.custom-properties.css")
);

/**
 * GENERATE TOKENS
 */
gulp.task("tokens:css", () =>
  gulp
    .src(configSrc)
    .pipe(
      theo({
        transform: { type: "web" },
        format: { type: "custom-properties.css" },
      })
    )
    .pipe(gulp.dest("dist"))
);

gulp.task("tokens:json", () =>
  gulp
    .src(configSrc)
    .pipe(
      theo({
        transform: { type: "web" },
        format: { type: "json" },
      })
    )
    .pipe(gulp.dest("dist"))
);

/**
 * BUILD TASKS
 */
gulp.task(
  "default",
  gulp.series("tokens:css", "tokens:renameproperties", "tokens:json")
);
