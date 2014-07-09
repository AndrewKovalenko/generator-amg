'use strict';

var copyConfiguration = require('./grunt-tasks-configurations/copy'),
watchConfig = require('./grunt-tasks-configurations/watch'),
connectConfiguration = require('./grunt-tasks-configurations/connect'),
requirejsBuildConfiguration = require('./grunt-tasks-configurations/requirejs'),
html2jsConfiguration = require('./grunt-tasks-configurations/html2js');

module.exports = function(grunt) {
  var initializeGruntConfigurationVariables = function(parameters) {
    var deploymentDirectory = parameters.release ?
      'builds/release' :
      'builds/debug';

    grunt.config('deploymentDirectory', deploymentDirectory);
    grunt.config('moduleName', '<%= applicationName %>');

  };

  var buildTaskList = function(grunt, run) {
    var release = grunt.option('release') || false;

    initializeGruntConfigurationVariables({
      release: release
    });

    var tasksToRun = ['copy:debug'];

    if (release) {
      tasksToRun = tasksToRun.concat(['requirejs:release', 'copy:release']);
    }

    tasksToRun = tasksToRun.concat(['html2js']);

    if (run) {
      tasksToRun = tasksToRun.concat(['connect', 'watch']);
    }

    return tasksToRun;
  };

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');

  requirejsBuildConfiguration.done = function(done, output) {
    var duplicates = require('rjs-build-analysis').duplicates(output);

    if (duplicates.length > 0) {
      grunt.log.subhead('Duplicates found in requirejs build:');
      grunt.log.warn(duplicates);
      done(new Error('r.js built duplicate modules, please check the excludes option.'));
    }

    done();
  };

  grunt.registerTask('build', function() {
    var tasksToRun = buildTaskList(grunt);


    grunt.task.run(tasksToRun);
  });

  grunt.registerTask('run', function() {
    var tasksToRun = buildTaskList(grunt, true);


    grunt.task.run(tasksToRun);
  });

  grunt.registerTask('default', ['run']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: watchConfig,
    connect: connectConfiguration,
    copy: copyConfiguration,
    requirejs: requirejsBuildConfiguration,
    html2js: html2jsConfiguration,
  });
};
