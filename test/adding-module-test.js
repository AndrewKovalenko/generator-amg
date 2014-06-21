/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var testUtilities = require('./utilities');

describe('uamg:add generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('amg:add', [
        '../../add'
      ], 
      [
        'controller', 
        'new'
      ]);


      var applicationGenerator = helpers.createGenerator('amg:app', [
        '../../app'
      ]);

      applicationGenerator.options['skip-install'] = true;
      helpers.mockPrompt(applicationGenerator, {
        'applicationName': 'testApplication'
      });

      applicationGenerator.run({}, function() {
        done();
      });

    }.bind(this));
  });


  it('calls command to add new controller from sub-directory of application', function (done) {
    var expected = [
      // add files you expect to exist here.
      'sources/js/controllers/new-controller.js'
    ];

    this.app.options['skip-install'] = true;

    var subdirectory = path.join(
      process.cwd(), 'sources/js/controllers'
    );
    process.chdir(subdirectory);

    this.app.run({}, function () {

      process.chdir('../../..');

      testUtilities.checkApplicationFiles(helpers);

      helpers.assertFile(expected);
      helpers.assertFileContent(
        'sources/js/controllers-module.js',
        /'controllers\/new-controller'/
      );

      helpers.assertFileContent(
        'sources/js/controllers/new-controller.js',
        /'new'/
      );

      done();
    });

  });


  it('calls command to add new controller from root directory of application', function (done) { 
    var expected = [
      // add files you expect to exist here.
      'sources/js/controllers/new-controller.js'
    ];

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      testUtilities.checkApplicationFiles(helpers);

      helpers.assertFile(expected);
      helpers.assertFileContent(
        'sources/js/controllers-module.js',
        /'controllers\/new-controller'/
      );

      helpers.assertFileContent(
        'sources/js/controllers/new-controller.js',
        /'new'/
      );

      done();
    });
  }); 
});
