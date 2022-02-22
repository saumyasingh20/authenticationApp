const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const del = require('del');
//minifying css
gulp.task('css',function(done){
    console.log('minifying css....');
    gulp.src('./assets/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
})

gulp.task('build',gulp.series('clean:assets','css'),function(done){
    console.log('Building assets');
    done();
})