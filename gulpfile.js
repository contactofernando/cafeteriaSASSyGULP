const {src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css( done) {
    //compilar SASS
    //pasos: 1 - Identificar archivos, 2 - Compilar, 3 - Guardar el .css

    src('src/scss/app.scss')
        .pipe( sass().on('error', sass.logError))
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css') )
        
    done();
}

function dev() {
    watch( 'src/scss/**/*.scss', css);
}

exports.css = css;
exports.dev = dev;
exports.default = series( css, dev);

//series - Se inicia una tarea y cuando finaliza sigue con la otra
//parallel - Todas las tareas inician al mismo tiempo