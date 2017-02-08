'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    del = require('del'),
    rename = require('gulp-rename');

var path = {
    build: {
        lib: 'build/lib/',
        js: 'build/js/',
        jsname: 'app.js'
    },
    src: {
        js: ['src/module.js', 'src/**/*.js']
    },
    watch: {
        js: 'src/**/*.js'
    },
    libs: {
        bowerDir: 'bower_components',
        bowerJson: 'bower.json'
    },
    clean: {
        toDel: 'build/js',
        toIgnoreLib: '!build/js/lib/**'
    }
};

var config = {
    server: {
        baseDir: "./build"
    },
    //tunnel: true,
    injectChanges: true,
    host: 'v',
    port: 9003,
    logPrefix: "am"
};





//gulp.task('js:deps', function(){
//
//	var bowerWithMin = mainBowerFiles(path.libs).map(function(pathB, index, arr) {
//		var newPath = pathB.replace(/.([^.]+)$/g, '.min.$1');
//		return exists(newPath) ? newPath : pathB;
//	});
//
//	return gulp.src(bowerWithMin)
//		.pipe(gulp.dest(path.build.lib));
//});

gulp.task('assets:build', function(){
    return gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('build/assets/'));
});
//gulp.task('img:build', function(){
//	return gulp.src('src/assets/images/*.*')
//		.pipe(gulp.dest('build/assets/'));
//});

gulp.task('libs:inject', ['html:build', 'js:build', 'js:deps'], function(){

    var bowerWithMin = mainBowerFiles(path.libs).map(function(pathB, index, arr) {
        var newPath = pathB.replace(/.([^.]+)$/g, '.min.$1');
        return newPath.length ? newPath : pathB;
    });

    return gulp.src('build/index.html')
        .pipe(inject(gulp.src(bowerWithMin)))
        .pipe(gulp.dest('build/index.html'));
});
/*'js:deps',*/
gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        //.pipe(sourcemaps.init())
        .pipe(concat(path.build.jsname))
        .pipe(ngAnnotate())
        .pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.build.js));
    //.pipe(reload({stream: true}));
});


gulp.task('clean', function () {
    del.sync([
        path.clean.toDel+'/**',
        '!'+path.clean.toDel,
        path.clean.toIgnoreLib

    ]);
});

gulp.task('build', ['clean','js:build']);

gulp.task('serve', ['build'], function () {
    //browserSync(config);


    gulp.watch(path.watch.js, ['js:build']);
    //gulp.watch('src/assets/**/*.*', ['assets:build']);
    //gulp.watch('build/**/*').on('change', reload);
});

gulp.task('watch', function(){
    //watch([path.watch.html], function(event, cb) {
    //	gulp.start('html:build');
    //});
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});



gulp.task('default', ['build', 'serve']);