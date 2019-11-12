var gulp = require("gulp");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var paths = {
    pages: ['src/*.html']
};

var tsProject = ts.createProject({
    declaration: true
});

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

// src/*html파일은 그대로 dist에 복사
gulp.task("copy-html", function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist"));
};

gulp.task("transpile", function() {
    return gulp.src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
});

gulp.task("default", gulp.series(["copy-html"], bundle));
gulp.task("watch", gulp.series(["transpile"], function() {
    gulp.watch("src/*.ts", gulp.series(["transpile"]));
}));
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
