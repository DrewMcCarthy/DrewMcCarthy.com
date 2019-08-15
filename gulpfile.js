const gulp = require('gulp'); 
const sass = require('gulp-sass'); 
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps'); 
const autoprefixer = require('gulp-autoprefixer'); 
var plumber = require('gulp-plumber');

sourceDir = './site/'; 
destDir = './site/'; 
stylesSrc = sourceDir + 'scss/**/*.scss'; 
stylesDest = destDir + 'css/';

function handleErrors(error){
    console.log(error);
}

function style(){
    return gulp.src(stylesSrc)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('.')) // Needs to be before dest()
        .pipe(gulp.dest(stylesDest))
        .pipe(browserSync.stream())
        .pipe(plumber({
            errorHandler: handleErrors
        }))
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch(stylesSrc, style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./site/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;