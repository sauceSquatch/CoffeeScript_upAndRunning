var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

var sassSources = [
  'components/sass/*.scss'
]

var coffeeSources = [
  'components/coffee/*.coffee'
];

var jsSources = [
  'components/scripts/*.js'
];

gulp.task('run_coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare:true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('run_sass', function() {
  gulp.src(sassSources)
    .pipe(sass({style: 'expanded', lineNumbers:true})
      .on('error', gutil.log))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
})

gulp.task('run_js', function() {
  gulp.src(jsSources)
          .pipe(uglify())
          .pipe(concat('script.js'))
          .pipe(gulp.dest('js'))
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(sassSources, ['run_sass']);
  gulp.watch(coffeeSources, ['run_coffee']);
  gulp.watch(jsSources, ['run_js']);
  gulp.watch(['js/script.js', '*.html'], function(e) {
    server.changed(e.path);
  })
})

gulp.task('default', ['run_sass', 'run_coffee', 'run_js', 'watch']);
