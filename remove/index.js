'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var configuration = require('../libs/configuration');
var pluralize = require('pluralize');
var core  = require('../libs/core');
var path = require('path');



var RemoveGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    var moduleType = this.name;

    if(!moduleType || configuration.moduleTypes.indexOf(moduleType) === -1) {
      console.error('No such module');
      return;
    }

    var moduleName = this.args[1];

    if(!moduleName || moduleName === '') {
      console.log('Module name can\'t be empty');
      return;
    }

    var moduleDirectory = pluralize.plural(moduleType);

    console.log(chalk.cyan('Updating root module for ' + chalk.green(moduleDirectory)));
    
    core.removeFileFromModule({
      moduleType: moduleType,
      moduleName: moduleName,
      rootJsDirectory: configuration.rootJsDirectory
    });

    core.updateModuleFilesList({
      moduleType: moduleType,
      rootJsDirectory: configuration.rootJsDirectory,
      yeomanGenerator: this,
      generatorDirectory: path.join(__dirname, '/..'),
    });

    this.log('Done!');
  }
});

module.exports = RemoveGenerator;
