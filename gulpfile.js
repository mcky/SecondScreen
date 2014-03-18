var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function () {
    gulp.src('./public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['./public/style.css', 'views/**/*.html'], {
        proxy: {
            host: 'sec.dev',
            port: 3700
        },
        ghostMode: {
          clicks: true,
          links: true,
          forms: true,
          scroll: true
        }
    });
});

gulp.task('default', function(){
    gulp.run('browser-sync');
    gulp.watch('./public/scss/**/*.scss', function(){
        gulp.run('sass');
    });
});
