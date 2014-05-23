'use strict';

var yeoman = require('yeoman-generator');
var amgConfiguration = require('../libs/amg-configuration');
var fileCreator = require('../libs/file-creator');
var pluralize = require('pluralize');
var rootModuleUpdater = require('../libs/root-module-updater');
var chalk = require('chalk');

var AddGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    var moduleType = this.name;

    if(!moduleType || !amgConfiguration.templateFiles[moduleType]) {
      console.error(chalk.red('No such module'));
      return;
    }

    var moduleName = this.args[1];

    if(!moduleName || moduleName == '') {
      console.error(chalk.red('Module name can\'t be empty'));
      return;
    }

    console.log(chalk.cyan('Creating body of ' + chalk.green(moduleName)));

    var moduleDirectory = pluralize.plural(moduleType);
    fileCreator.createFile({
      templateFilePath: __dirname + '../templates/' + amgConfiguration.templateFiles[moduleType];
      destinationFilePath: moduleDirectory + '/' + moduleName + '-' + moduleType + '.js',
      mappings: {
        moduleName: moduleName
      }
    });

    console.log(chalk.cyan('Updating root module for ' + chalk.green(moduleType)));

    rootModuleUpdater.updateRootModule({
      generatorDirectory: __dirname + '/..',
      moduleType: moduleType
    });

    this.log('Done!');

  }
});

module.exports = AddGenerator;
