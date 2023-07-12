const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer')
const minify = require('gulp-clean-css')
const terser = require('gulp-terser')
const imagewebp = require('gulp-webp')

function compilescss(){
    return src('*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(dest('dist/css'))
}

function jsmin(){
    return src('*.js')
    .pipe(terser())
    .pipe(dest('dist/js'))
}

function webpImage() {
    return src('img/*.png')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}

function watchTask(){
    watch('*.scss', compilescss)
    watch('*.js', jsmin)
    watch('img/*.png', webpImage)
}

exports.default = series (
    compilescss, 
    jsmin, 
    webpImage, 
);