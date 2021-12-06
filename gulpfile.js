var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var pug = require("gulp-pug");
const { src, dest } = require("gulp");
var sass = require("gulp-sass")(require("sass"));

// Server

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "./",
    },
  });

  gulp.watch("build/**/*").on("change", browserSync.reload);
});

// Pug compile

exports.views = () => {
  return src("./source/templates/index.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest("build"));
};

// Styles

gulp.task("styles:compile", function () {
  return gulp
    .src("source/styles/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(".build/css"));
});

// Images

gulp.task("copy:images", function () {
  return gulp.src("./source/images/**/*.*").pipe(gulp.dest("build/images"));
});

// Fonts

gulp.task("copy:fonts", function () {
  return gulp.src("./source/fonts/**/*.*").pipe(gulp.dest("build/fonts"));
});

//Copy
gulp.task("copy", gulp.parallel("copy:fonts", "copy:images"));

// watchers

gulp.task("watch", function () {
  gulp.watch("source/template/**/*.pug", gulp.series("templates:compile"));
  gulp.watch("source/template/**/*.scss", gulp.series("styles:compile"));
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("templates:compile", "styles:compile", "copy"),
    gulp.parallel("watch", "server")
  )
);
