/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var testUtilities = require('./utilities');

describe('generate new application', function () {
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

  it('creates files for new application', function (done) {
    helpers.mockPrompt(this.app, {
      'applicationName': 'testApplication'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      testUtilities.checkApplicationFiles(helpers);
      done();
    });
  });
});
