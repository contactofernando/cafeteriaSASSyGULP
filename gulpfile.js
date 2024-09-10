const {src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css( done) {
    //pasos: 1 - Identificar archivos, 2 - Compilar, 3 - Guardar el .css
    src('src/scss/app.scss')
        .pipe( sass().on('error', sass.logError))
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css') )
        
    done();
}
function imagenes () {
    return src( 'src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest( 'build/img'));
}
function versionWebp () {
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp() )
        .pipe( dest( 'build/img') )
}

function dev() {
    watch( 'src/scss/**/*.scss', css);
    watch( 'src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series( imagenes, versionWebp, css, dev);

//series - Se inicia una tarea y cuando finaliza sigue con la otra
//parallel - Todas las tareas inician al mismo tiempo