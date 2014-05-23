'use strict';

var fileCreator = require('./file-creator');
var pluralize = require('pluralize');
var fileSystem = require('fs');

var updateRootModule = function(parameters) {
  parameters.rootJsDirectory = parameters.rootJsDirectory + '/' || '';

  var pluralModuleType = pluralize.plural(parameters.moduleType);
  var exsistingModules = fileSystem.readdirSync(parameters.rootJsDirectory + pluralModuleType);


  var rootModuleDependencies = exsistingModules.map(function(module) {
    var moduleName = module.substr(0, module.lastIndexOf('.'));
    return '    \'' + pluralModuleType + '/' + moduleName + '\'';
  });

  var dependenciesString = (rootModuleDependencies.length > 0) ? 
    ',\n' + rootModuleDependencies.join(',\n') :
    ''; 

  fileCreator.createFile({
    templateFilePath: parameters.generatorDirectory + '/templates/root-module.tmp',
    destinationFilePath: parameters.rootJsDirectory + pluralModuleType + '-module.js',
    mappings: { 
      dependencies: dependenciesString,
      moduleType: parameters.moduleType,
      pluralModuleType: pluralModuleType
    }
  });
};

module.exports = {
  updateRootModule: updateRootModule
};
