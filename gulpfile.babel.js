import gulp        from 'gulp'
import clean       from 'gulp-clean'
import ts          from 'gulp-typescript'
import nodemon     from 'gulp-nodemon'
import notify      from 'gulp-notify'
import livereload  from 'gulp-livereload'
import browserSync from 'browser-sync'

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
        .pipe(notify({
            message: "O build foi gerado. Aguarde 5 segundos para testar."
        }))
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

gulp.task('server', ['build'], () => {
    livereload.listen()
    let stream = nodemon({
        script: "dist/index.js",
        watch: "dist",
        tasks: ["build"],
        env: { "DEBUG": "Application,Request,Response" }
    }).on('restart', () => {
        gulp.src(`${dirs.dest}/index.js`)
            //.pipe(wait(5000))
            .pipe(livereload())
            .pipe(notify({
                message: "Generated file: <%= file.relative %>"
            }))
    });
    return stream
    /*livereload.listen()

    nodemon({
        script: `${dirs.dest}/index.js`,
        ext: 'js'
    }).on('restart', () => {
        gulp.src(`${dirs.dest}/index.js`)
            //.pipe(wait(5000))
            .pipe(livereload())
            .pipe(notify({
                message: "Generated file: <%= file.relative %>"
            }))
    })*/
})

gulp.task('default', ['watch'])