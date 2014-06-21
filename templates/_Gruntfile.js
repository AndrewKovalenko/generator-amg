'use strict';

var copyConfiguration = require('./grunt-tasks-configurations/copy'),
connectConfiguration = require('./grunt-tasks-configurations/connect'),
extend = require('extend'),
requirejsBuildConfiguration = require('./grunt-tasks-configurations/requirejs');


module.exports = function(grunt) {
  var getPathAliases = function() {
    global.window = {
      define: function(callback) {
        global.pathConfiguration = callback();
      }
    };

    var pathAliasConfiguration = require('./sources/js/config/requirejs-path');
    return global.pathConfiguration;
  };

  var initializeGruntConfigurationVariables = function(parameters) {
    var deploymentDirectory = parameters.release ?
      'builds/release' :
      'builds/debug';

    var webServerRootDirectory = parameters.release ?
      'builds/release/web/' :
      'sources/';

    grunt.config('deploymentDirectory', deploymentDirectory);
    grunt.config('webServerRootDirectory', webServerRootDirectory);
    grunt.config('moduleName', 'test-module');
  };

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  requirejsBuildConfiguration.done = function(done, output) {
    var duplicates = require('rjs-build-analysis').duplicates(output);

    if (duplicates.length > 0) {
      grunt.log.subhead('Duplicates found in requirejs build:');
      grunt.log.warn(duplicates);
      done(new Error('r.js built duplicate modules, please check the excludes option.'));
    }

    done();
  };

  grunt.registerTask('run', function() {
    var release = grunt.option('release') || false;

    initializeGruntConfigurationVariables({
      release: release
    });

    var runTasks = [];

    if (release) {
      runTasks = runTasks.concat(['copy:release', 'requirejs:release']);
    }
    else {
      runTasks = runTasks.concat(['copy:debug']);
    }

    runTasks.push('connect');

    grunt.task.run(runTasks);
  });

  var pathAliases = getPathAliases();
  extend(requirejsBuildConfiguration.release.options.paths, pathAliases);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: connectConfiguration,
    copy: copyConfiguration,
    requirejs: requirejsBuildConfiguration
  });
};
