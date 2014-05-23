'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');
var amgConfiguration = require('../libs/amg-configuration');
var fileCreator = require('../libs/file-creator');
var pluralize = require('pluralize');
var rootModuleUpdater = require('../libs/root-module-updater');

var AddGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    var moduleType = this.name;

    if(!moduleType || !amgConfiguration.templateFiles[moduleType]) {
      console.error('No such module');
      return;
    }

    var moduleName = this.args[1];

    if(!moduleName || moduleName == '') {
      console.log('Module name can\'t be empty');
      return;
    }


    var moduleDirectory = pluralize.plural(moduleType);
    fileCreator.createFile({
      templateFilePath: __dirname + '/templates/' + moduleType +'.tmp',
      destinationFilePath: moduleDirectory + '/' + moduleName + '-' + moduleType + '.js',
      mappings: {
        moduleName: moduleName
      }
    });

    rootModuleUpdater.updateRootModule({
      generatorDirectory: __dirname,
      moduleType: moduleType
    });

    console.log('Done!');

  }
});

module.exports = AddGenerator;
