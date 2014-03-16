var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync.init(['app/**/*.{jade,html,js,css}'], {
        proxy: {
            host: 'thequestion.dev'
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
    // gulp.watch(theme +'/scss/**/*.scss', function(){
        // gulp.run('sass');
    // });
});
