'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
const tasksConfig = require('./tasks.config');
const clientTasks = require('boar-tasks-client').getTasks(gulp, tasksConfig);
const serverTasks = require('boar-tasks-server').getTasks(gulp, tasksConfig);
var argv = require('yargs').argv;

gulp.task('default', ['start']);

gulp.task('build', ['build-clean'], function(cb) {
  runSequence(['client-build'], cb);
});

gulp.task('start', ['build'], function(done) {
  runSequence(['client-watch', 'start-fake-server'], done);
});

gulp.task('test', [
  'client-test',
  'client-codestyle'
]);

// Helper
gulp.task('build-clean', function(cb) {
  clientTasks.build.clean(cb);
});

gulp.task('client-test', clientTasks.client.test);
gulp.task('client-code-style', function() { return clientTasks.client.codeStyle(); });

// Client Tasks
gulp.task('client-build', [
  'client-build-scripts'
]);
gulp.task('client-build-scripts', function(cb) { return clientTasks.client.buildScripts(cb); });
gulp.task('client-build-scripts-deny-errors', function() { return clientTasks.client.buildScriptsDenyErrors(); });
gulp.task('client-codestyle', function() { return clientTasks.client.codeStyle(); });

gulp.task('client-watch', function() {
  gulp.watch(clientTasks.config.client.app.watchPattern, ['client-build-scripts-deny-errors']);
});


gulp.task('deploy', clientTasks.build.deploy);

gulp.task('publish', ['publish-s3', 'publish-redirector']);
gulp.task('publish-s3', function() { return clientTasks.s3.publish(); });
gulp.task('publish-redirector', function() { return clientTasks.redirector.save(); });

gulp.task('start-fake-server', serverTasks.server.start);
