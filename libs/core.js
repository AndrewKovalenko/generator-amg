'use strict';

var path = require('path');
var pluralize = require('pluralize');
var fileSystem = require('fs');
var fileSystemExtensions = require('./file-system-extensions');

var updateModuleFilesList = function(parameters) {
  var moduleName = pluralize.plural(parameters.moduleType);
  var rootJsDirectory = fileSystemExtensions.getPathRelativeToRootJsDirectory();

  var templatePath = path.join(parameters.generatorDirectory, 'templates/root-module.tmp');
  var destinationFilePath = path.join(rootJsDirectory, moduleName + '-module.js');

  if(fileSystem.existsSync(destinationFilePath)){
    fileSystem.unlinkSync(destinationFilePath);
  }

  var exsistingModules = fileSystemExtensions.readFileTree(path.join(rootJsDirectory, moduleName));

  var rootModuleDependencies = exsistingModules.map(function(module) {
    var fullFileName = module.substr(0, module.lastIndexOf('.'));
    var relativeFileName = path.relative(rootJsDirectory, fullFileName);
    return '    \'' + relativeFileName + '\'';
  });

  var dependenciesString = (rootModuleDependencies.length > 0) ? 
    ',\n' + rootModuleDependencies.join(',\n') :
    ''; 

  parameters.yeomanGenerator.module = {
    dependencies: dependenciesString,
    moduleType: parameters.moduleType,
    moduleName: moduleName
  };

  parameters.yeomanGenerator.template(templatePath, destinationFilePath);
};

var initializeModuleType = function(parameters) {
  var pluralModuleTypeName = pluralize.plural(parameters.moduleType);

  parameters.yeomanGenerator.mkdir(fileSystemExtensions.jsRootDirectoryPath);
  parameters.yeomanGenerator.mkdir(path.join(fileSystemExtensions.jsRootDirectoryPath, 'libs/vendors'));
  parameters.yeomanGenerator.mkdir(path.join(fileSystemExtensions.jsRootDirectoryPath, pluralModuleTypeName));

  updateModuleFilesList({
    yeomanGenerator: parameters.yeomanGenerator,
    generatorDirectory: path.join(__dirname, '/..'),
    moduleType: parameters.moduleType
  });
};

var initializeApplicationConfigAndUtilities = function(parameters) {
  parameters.yeomanGenerator.directory(path.join(fileSystemExtensions.templatesDirectoryPath, 'config'), 
                                       path.join(fileSystemExtensions.jsRootDirectoryPath, 'config'));
  parameters.yeomanGenerator.directory(path.join(fileSystemExtensions.templatesDirectoryPath, 'utilities'), 
                                       path.join(fileSystemExtensions.jsRootDirectoryPath, 'utilities'));
  parameters.yeomanGenerator.directory(path.join(fileSystemExtensions.templatesDirectoryPath, 'grunt-tasks-configurations'),
                                       'grunt-tasks-configurations');

  var entryPointTemplateFilePath = path.join(__dirname, '..', 'templates/entry-point.tmp');
  var entryPointDestinationFilePath = path.join(fileSystemExtensions.jsRootDirectoryPath, 'entry-point.js');
  parameters.yeomanGenerator.template(entryPointTemplateFilePath, entryPointDestinationFilePath);

  parameters.yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_.bowerrc'), '.bowerrc');
  parameters.yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_bower.json'), 'bower.json');
  parameters.yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_.jshintrc'), '.jshintrc');
  parameters.yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_.gitignore'), '.gitignore');
  parameters.yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_Gruntfile.js'), 'Gruntfile.js');
  parameters.yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, 'sources/_.jshintrc'), 
                                  path.join(fileSystemExtensions.sourcesDirectory,'.jshintrc'));
  parameters.yeomanGenerator.template(path.join(fileSystemExtensions.templatesDirectoryPath, '_index.html'), 
                                      path.join(fileSystemExtensions.sourcesDirectory, 'index.html'));

  parameters.yeomanGenerator.template(path.join(fileSystemExtensions.templatesDirectoryPath, '_package.json'), 
                                      'package.json');
};

var initializeApplicationInfrastructure = function(parameters) {
  parameters.moduleTypes.forEach(function(moduleType) {
    initializeModuleType({
      moduleType: moduleType,
      yeomanGenerator: parameters.yeomanGenerator
    }); 
  }); 

  initializeApplicationConfigAndUtilities({ 
    yeomanGenerator: parameters.yeomanGenerator
  });

};

var removeFileFromModule = function(parameters) {
  var moduleDirectory = pluralize.plural(parameters.moduleType);
  var rootJsDirectory = fileSystemExtensions.getPathRelativeToRootJsDirectory();
  var fileToDelete = path.join(rootJsDirectory, moduleDirectory, parameters.moduleName + '-' + parameters.moduleType + '.js');

  if(fileSystem.existsSync(fileToDelete)){
    fileSystem.unlinkSync(fileToDelete);
  }
};

var addFileToModule = function(parameters) {
  var moduleDirectory = pluralize.plural(parameters.moduleType); 
  var rootJsDirectory = fileSystemExtensions.getPathRelativeToRootJsDirectory();
  var templateFilePath = path.join(__dirname, '..', 'templates/regular-module.tmp');
  var destinationFilePath = path.join(rootJsDirectory, moduleDirectory, parameters.moduleName + '-' + parameters.moduleType + '.js');

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

