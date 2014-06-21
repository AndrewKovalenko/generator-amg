'use strict';

var applicationFiles = [
  'package.json',
  'Gruntfile.js',
  'bower.json',
  '.jshintrc',
  '.gitignore',
  '.bowerrc',
  'tests/bootstrap-tests.js',
  'tests/.jshintrc',
  'tests/unit-tests/karma-config.js',
  'grunt-tasks-configurations/connect.json',
  'grunt-tasks-configurations/requirejs.json',
  'grunt-tasks-configurations/copy.json',
  'sources/index.html',
  'sources/.jshintrc',
  'sources/js/controllers-module.js',
  'sources/js/entry-point.js',
  'sources/js/directives-module.js',
  'sources/js/factories-module.js',
  'sources/js/services-module.js',
  'sources/js/filters-module.js',
  'sources/js/config/routing-configuration.js',
  'sources/js/utilities/sandbox.js',
  'sources/js/utilities/module-factory.js',
  'sources/js/utilities/messaging-bus.js',
  'sources/js/config/messaging-bus-configuration.js'
];

var checkApplicationFiles = function(helpers) {
  helpers.assertFile(applicationFiles);
};

module.exports = {
  checkApplicationFiles: checkApplicationFiles
};
