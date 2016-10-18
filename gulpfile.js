const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: '.'
        },
        files: ['./index.html', './css/*.css', './javascript/*.js']
    });
});

gulp.task('default', ['browser-sync']);
