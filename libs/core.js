'use strict';

var path = require('path');
var pluralize = require('pluralize');
var fileSystem = require('fs');

var updateModuleFilesList = function(parameters) {
  var moduleName = pluralize.plural(parameters.moduleType);

  //TODO update this code to read filenames recursively
  var exsistingModules = fileSystem.readdirSync(path.join(parameters.rootJsDirectory, moduleName));

  var rootModuleDependencies = exsistingModules.map(function(module) {
    var fileName = module.substr(0, module.lastIndexOf('.'));
    return '    \'' + moduleName + '/' + fileName + '\'';
  });

  var dependenciesString = (rootModuleDependencies.length > 0) ? 
    ',\n' + rootModuleDependencies.join(',\n') :
    ''; 

  parameters.yeomanGenerator.module = {
    dependencies: dependenciesString,
    moduleType: parameters.moduleType,
    moduleName: moduleName
  };

  var templatePath = path.join(parameters.generatorDirectory, 'templates/root-module.tmp');
  var destinationFilePath = path.join(parameters.rootJsDirectory, moduleName + '-module.js');

  parameters.yeomanGenerator.template(templatePath, destinationFilePath);
};

var initializeModuleType = function(parameters) {

  var pluralModuleTypeName = pluralize.plural(parameters.moduleType);

  parameters.yeomanGenerator.mkdir(parameters.rootJsDirectory);
  parameters.yeomanGenerator.mkdir(path.join(parameters.rootJsDirectory, 'libs'));
  parameters.yeomanGenerator.mkdir(path.join(parameters.rootJsDirectory, pluralModuleTypeName));

  updateModuleFilesList({
    yeomanGenerator: parameters.yeomanGenerator,
    generatorDirectory: path.join(__dirname, '/..'),
    moduleType: parameters.moduleType,
    rootJsDirectory: parameters.rootJsDirectory
  });
};

var initializeApplicationConfigAndUtilities = function(parameters) {
  parameters.yeomanGenerator.directory(path.join(__dirname, '..', 'templates/config'), path.join(parameters.rootJsDirectory, 'config'));
  parameters.yeomanGenerator.directory(path.join(__dirname, '..', 'templates/utilities'), path.join(parameters.rootJsDirectory, 'utilities'));

  var entryPointTemplateFilePath = path.join(__dirname, '..', 'templates/entry-point.tmp');
  console.log(entryPointTemplateFilePath);
  var entryPointDestinationFilePath = path.join(parameters.rootJsDirectory, 'entry-point.js');
  parameters.yeomanGenerator.template( entryPointTemplateFilePath, entryPointDestinationFilePath);

  parameters.yeomanGenerator.copy('_.bowerrc', '.bowerrc');
  parameters.yeomanGenerator.copy('_bower.json', 'bower.json');
  parameters.yeomanGenerator.template('_index.html', 'index.html');

};

var initializeApplicationInfrastructure = function(parameters) {
  parameters.moduleTypes.forEach(function(moduleType) {
    initializeModuleType({
      moduleType: moduleType,
      rootJsDirectory: parameters.rootJsDirectory,
      yeomanGenerator: parameters.yeomanGenerator
    });
  });

  initializeApplicationConfigAndUtilities({ 
    rootJsDirectory: parameters.rootJsDirectory,
    yeomanGenerator: parameters.yeomanGenerator
  });

};

var removeFileFromModule = function(parameters) {
  var moduleDirectory = pluralize.plural(parameters.moduleType);
  var fileToDelete = path.join(parameters.rootJsDirectory, moduleDirectory, parameters.moduleName + '-' + parameters.moduleType + '.js');
    fileSystem.unlinkSync(fileToDelete);
};

var addFileToModule = function(parameters) {
  var moduleDirectory = pluralize.plural(parameters.moduleType); 
  var templateFilePath = path.join(__dirname, '..', 'templates/regular-module.tmp');
  var destinationFilePath = path.join(parameters.rootJsDirectory, moduleDirectory, parameters.moduleName + '-' + parameters.moduleType + '.js');

  parameters.yeomanGenerator.module = {
    moduleName: parameters.moduleName
  };
  parameters.yeomanGenerator.template(templateFilePath, destinationFilePath);
};

module.exports = {
  updateModuleFilesList: updateModuleFilesList,
  initializeApplicationInfrastructure: initializeApplicationInfrastructure,
  addFileToModule: addFileToModule,
  removeFileFromModule: removeFileFromModule
};

