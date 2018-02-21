import gulp  from 'gulp'
import clean from 'gulp-clean'
import ts    from 'gulp-typescript'

const tsProject = ts.createProject('tsconfig.json')

const dirs = {
        src: 'src',
    srcJson: 'src/**/*.json',
      srcTS: 'src/**/*.ts',
       dest: 'dist'
}

gulp.task('scripts', ['static'], () => {
    const tsResult = tsProject.src()
        .pipe(tsProject())

    return tsResult.js
        .pipe(gulp.dest(dirs.dest))
})

gulp.task('static', ['clean'], () => {
    return gulp
        .src([dirs.srcJson])
        .pipe(gulp.dest(dirs.dest))
})

gulp.task('clean', () => {
    return gulp
        .src(dirs.dest)
        .pipe(clean())
})

gulp.task('build', ['scripts'])

gulp.task('watch', ['build'], () => {
    return gulp.watch([dirs.srcTS, dirs.srcJson], ['build'])
})

gulp.task('default', ['watch'])