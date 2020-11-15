const gulp = require("gulp"),
             fileinclude = require('gulp-file-include');

const folder = {
    src: "", // source files
    dist: "dist/", // build files
    dist_assets: "dist/assets/" //build assets files
};

function html() {
    var out = folder.dist;

    return gulp
        .src([
            folder.src + "*.html"
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest(out));
}

function css() {
    var out = folder.dist + "/css";
    return gulp.src('css/*.css')    
      .pipe(gulp.dest(out))
}

function jsVendor() {
    var out = folder.dist + "js/vendor";
    return gulp.src('js/vendor/*.js')    
      .pipe(gulp.dest(out))
}

function js() {
    var out = folder.dist + "/js";
    return gulp.src('js/*.js')    
      .pipe(gulp.dest(out))
}

function asset() {
    var out = folder.dist + "/images";
    return gulp.src('images/**')    
      .pipe(gulp.dest(out))
}

function fonts() {
    var out = folder.dist + "/fonts";
    return gulp.src('fonts/**')    
      .pipe(gulp.dest(out))
}

// build
gulp.task(
    "build",
    gulp.series(html, css, jsVendor, js, asset, fonts)
);