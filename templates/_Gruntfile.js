'use strict';
 var copyConfiguration = require('./grunt-tasks-configurations/copy');
 var connectConfiguration = require('./grunt-tasks-configurations/connect');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('run:debug', ['copy:debug', 'connect:debug']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    debugWebBuildDirectory: 'builds/debug/web',

    connect: connectConfiguration,
    copy: copyConfiguration 
  });
};
