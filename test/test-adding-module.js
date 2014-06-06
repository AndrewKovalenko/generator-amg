/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('amg:add generator', function () {
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

      done();
      
    }.bind(this));
  });

  it('adds new controller', function (done) {
    var expected = [
      // add files you expect to exist here.
      'sources/js/controllers/new-controller.js'
    ];

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('sources/js/controllers-module.js',
                                  /controllers\/new-controller/);
                                  done();
    });
  });
});
