const gulp = require('gulp'); 
const sass = require('gulp-sass'); 
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps'); 
const postcss = require('gulp-postcss'); 
const autoprefixer = require('autoprefixer'); 
const notify = require('gulp-notify');

sourceDir = './site/'; 
destDir = './site/'; 
stylesSrc = sourceDir + 'scss/**/*.scss'; 
stylesDest = destDir + 'css/';

// function handleErrors(error){
//     notify().write(error);
//     console.log(error);
// }

function style(){
    return gulp.src(stylesSrc)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.')) // Needs to be before dest()
        .pipe(gulp.dest(stylesDest))
        .pipe(browserSync.stream())
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