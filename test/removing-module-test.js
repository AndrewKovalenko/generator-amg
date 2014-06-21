/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var testUtilities = require('./utilities');

describe('amg:remove generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('amg:remove', [
        '../../remove/'
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

      var addNewModuleGenerator = helpers.createGenerator('amg:add', [
        '../../add'
      ], 
      [
        'controller', 
        'new'
      ]);

      applicationGenerator.run({}, function() {
        addNewModuleGenerator.run({}, function() {
          done();
        });

      });

    }.bind(this));
  });

  it('calls command to remove controller from sub-directory of application', function (done) {
    var expected = [
      // add files you expect to exist here.
      'sources/js/controllers/new-controller.js'
    ];

    helpers.assertFile(expected);
    helpers.assertFileContent(
      'sources/js/controllers-module.js',
      /'controllers\/new-controller'/
    );

    testUtilities.checkApplicationFiles(helpers);

    this.app.options['skip-install'] = true;

    process.chdir('sources/js/controllers');

    this.app.run({}, function () {
      process.chdir('../../..');

      helpers.assertNoFile(expected);
      helpers.assertNoFileContent(
        'sources/js/controllers-module.js',
        /'controllers\/new-controller'/
      );

      testUtilities.checkApplicationFiles(helpers);

      done();
    });
  });


  it('calls command to remove controller from root directory of application', function (done) {
    var expected = [
      // add files you expect to exist here.
      'sources/js/controllers/new-controller.js'
    ];

    helpers.assertFile(expected);
    helpers.assertFileContent(
      'sources/js/controllers-module.js',
      /controllers\/new-controller/
    );

    testUtilities.checkApplicationFiles(helpers);

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertNoFile(expected);
      helpers.assertNoFileContent(
        'sources/js/controllers-module.js',
        /'controllers\/new-controller'/
      );

      testUtilities.checkApplicationFiles(helpers);

      done();
    });
  });
});
