/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('amg generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('amg:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.gitignore',
      'Gruntfile.js',
      'grunt-tasks-configurations/connect.json',
      'grunt-tasks-configurations/copy.json',
      'sources/index.html',
      'sources/.jshintrc',
      'sources/js/controllers-module.js',
      'sources/js/directives-module.js',
      'sources/js/factories-module.js',
      'sources/js/services-module.js',
      'sources/js/filters-module.js',
      'sources/js/config/routing-configuration.js'
    ];

    helpers.mockPrompt(this.app, {
      'applicationName': 'testApplication'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
