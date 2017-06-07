var gulp = require('gulp');
var webpack = require('webpack');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var ftp = require( 'vinyl-ftp' );
var deploy = require('./deploy.config.json');
var deploy_remote_path = "/public/17zt/viewer"
var webpack_config_demo = require('./webpack.config.example.js');
// var webpack_config_dist = require('./webpack.config.dist.js');

gulp.task("clean:demo", function(){
  return gulp.src('./demo', {read: false})
    .pipe(clean());
})

gulp.task('build:demo', ['clean:demo'], function(callback) {
  webpack(webpack_config_demo, function (error,status) {
    //gulp 异步任务必须明确执行 callback() 否则 gulp 将一直卡住
    callback()
  });
});

gulp.task('deploy:demo', ['build:demo'], function () {
  deploy.log = gutil.log;

  var conn = ftp.create(deploy);

  return gulp.src('demo/**')
    .pipe(conn.dest(deploy_remote_path))
})

gulp.task('demo', ['deploy:demo']);