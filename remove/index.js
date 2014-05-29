'use strict';

var chalk = require('chalk');
var fileSystem = require('fs');
var yeoman = require('yeoman-generator');
var amgConfiguration = require('../libs/amg-configuration');
var pluralize = require('pluralize');
var rootModuleUpdater = require('../libs/root-module-updater');



var RemoveGenerator = yeoman.generators.NamedBase.extend({
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

    console.log(chalk.cyan('Updating root module for ' + chalk.green(moduleDirectory)));
    
    fileSystem.unlinkSync(amgConfiguration.rootJsDirectory + '/' + moduleDirectory + '/' + moduleName + '-' + moduleType + '.js');

    rootModuleUpdater.updateRootModule({ 
      generatorDirectory: __dirname + '/..',
      moduleType: moduleType,
      rootJsDirectory: amgConfiguration.rootJsDirectory
    });

    this.log('Done!');
  }
});

module.exports = RemoveGenerator;
