'use strict';

var yeoman = require('yeoman-generator');
var configuration = require('../libs/configuration');
var chalk = require('chalk');
var core = require('../libs/core');
var path = require('path');

var AddGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    var moduleType = this.name;

    if(!moduleType || configuration.moduleTypes.indexOf(moduleType) === -1) {
      console.error(chalk.red('No such module'));
      return;
    }

    var moduleName = this.args[1];

    if(!moduleName || moduleName === '') {
      console.error(chalk.red('Module name can\'t be empty'));
      return;
    }

    console.log(chalk.cyan('Creating body of ' + chalk.green(moduleName)));

    core.addFileToModule({
      yeomanGenerator: this,
      moduleType: moduleType,
      moduleName: moduleName,
      rootJsDirectory: configuration.rootJsDirectory
    });

    console.log(chalk.cyan('Updating root module for ' + chalk.green(moduleType)));

    core.updateModuleFilesList({
      moduleType: moduleType,
      rootJsDirectory: configuration.rootJsDirectory,
      yeomanGenerator: this,
      generatorDirectory: path.join(__dirname, '/..'),
    });

    this.log('Done!');
  }
});

module.exports = AddGenerator;
