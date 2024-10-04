const {src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done) {
    //pasos: 1 - Identificar archivos, 2 - Compilar, 3 - Guardar el .css
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass().on('error', sass.logError))
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )
        
    done();
}
// FUNCIONES

function imagenes () {
    return src( 'src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest( 'build/img'));
}
function versionWebp () {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest( 'build/img') )
}
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones) )
        .pipe ( dest( 'build/img') )
}

function dev() {
    watch( 'src/scss/**/*.scss', css);
    watch( 'src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev);

//series - Se inicia una tarea y cuando finaliza sigue con la otra
//parallel - Todas las tareas inician al mismo tiempo