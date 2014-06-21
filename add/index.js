'use strict';

var yeoman = require('yeoman-generator');
var configuration = require('../libs/configuration');
var chalk = require('chalk');
var core = require('../libs/core');
var path = require('path');
var pluralize = require('pluralize');

var AddGenerator = yeoman.generators.NamedBase.extend({
  app: function() {
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
      moduleName: moduleName
    });


  }, 

  updateRootModuleDependencies: function() {
    var moduleType = this.name;

    console.log(chalk.cyan('Updating root module for ' + chalk.green(pluralize.plural(moduleType))));

    core.updateModuleFilesList({
      moduleType: moduleType,
      yeomanGenerator: this,
      generatorDirectory: path.join(__dirname, '/..')
    });


  }
 });

module.exports = AddGenerator;
