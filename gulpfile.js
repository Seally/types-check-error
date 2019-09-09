const gulp = require('gulp');
const git = require('gulp-git');
const del = require('del');

const meta = require('./package.json');

const { series, parallel } = gulp;

exports.release = series(
    () => git.checkout(`v${ meta.version }`, { args: '-b' }),
    exports.dist,
    () => del([
        '**/*',
        '!node_modules/**',
        '!dist/**'
    ]),
    () => gulp.src('dist/**/*').pipe(gulp.dest(process.cwd())),
    () => del([ 'dist/**/*' ])
);

exports.dist = function() {
    return gulp.src([
        'package.json',
        'LICENSE.txt',
        'README.md',
        '.gitignore'
    ]).pipe(gulp.src([
        'types/check-error/**/*.d.ts'
    ], {
        base: 'types/check-error'
    })).pipe(gulp.dest('dist'));
}
