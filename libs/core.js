'use strict';

var path = require('path'),
pluralize = require('pluralize'),
fileSystem = require('fs'),
fileSystemExtensions = require('./file-system-extensions');

var ROOT_MODULE_SUFIX =  '-module.js';


var copyUtilitiesConfigs = function(yeomanGenerator) {
  yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_.bowerrc'), '.bowerrc');
  yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_bower.json'), 'bower.json');
  yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_.jshintrc'), '.jshintrc');
  yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, '_.gitignore'), '.gitignore');
  yeomanGenerator.copy(path.join(fileSystemExtensions.templatesDirectoryPath, 'sources/_.jshintrc'), path.join(fileSystemExtensions.sourcesDirectory,'.jshintrc'));
  yeomanGenerator.template(path.join(fileSystemExtensions.templatesDirectoryPath, '_index.html'), path.join(fileSystemExtensions.sourcesDirectory, 'index.html'));
  yeomanGenerator.template(path.join(fileSystemExtensions.templatesDirectoryPath, '_Gruntfile.js'), 'Gruntfile.js');

  yeomanGenerator.template(path.join(fileSystemExtensions.templatesDirectoryPath, '_package.json'), 'package.json');
  yeomanGenerator.mkdir(fileSystemExtensions.jsRootDirectoryPath);
  yeomanGenerator.mkdir(path.join(fileSystemExtensions.sourcesDirectory, 'views'));
};

var createApplicationFiles = function(yeomanGenerator) {
  var routingConfigTemplatePath = path.join(fileSystemExtensions.templatesDirectoryPath, 'config/routing-configuration.tmp');
  var routingConfigPath = path.join(fileSystemExtensions.jsRootDirectoryPath, 'config/routing-configuration.js');
  yeomanGenerator.copy(routingConfigTemplatePath, routingConfigPath);

  var moduleFactoryTemplatePath = path.join(fileSystemExtensions.templatesDirectoryPath, 'utilities/module-factory.tmp');
  var moduleFactoryPath = path.join(fileSystemExtensions.jsRootDirectoryPath, 'utilities/module-factory.js');
  yeomanGenerator.copy(moduleFactoryTemplatePath, moduleFactoryPath);

  var sandBoxTemplatePath = path.join(fileSystemExtensions.templatesDirectoryPath, 'utilities/sandbox.tmp');
  var sandBoxPath = path.join(fileSystemExtensions.jsRootDirectoryPath, 'utilities/sandbox.js');
  yeomanGenerator.copy(sandBoxTemplatePath, sandBoxPath);

  var messagingBusTemplatePath = path.join(fileSystemExtensions.templatesDirectoryPath, 'utilities/messaging-bus.tmp');
  var messagingBusPath = path.join(fileSystemExtensions.jsRootDirectoryPath, 'utilities/messaging-bus.js');
  yeomanGenerator.copy(messagingBusTemplatePath, messagingBusPath);

  var messagingBusConfigurationTemplatePath = path.join(
    fileSystemExtensions.templatesDirectoryPath, 
    'config/messaging-bus-configuration.tmp'
  );
  var messagingBusConfigurationPath = path.join(fileSystemExtensions.jsRootDirectoryPath, 'config/messaging-bus-configuration.js');
  yeomanGenerator.copy(messagingBusConfigurationTemplatePath, messagingBusConfigurationPath);

  yeomanGenerator.directory(path.join(fileSystemExtensions.templatesDirectoryPath, 'grunt-tasks-configurations'), 'grunt-tasks-configurations');
  yeomanGenerator.directory(path.join(fileSystemExtensions.templatesDirectoryPath, 'grunt-tasks-configurations'), 'grunt-tasks-configurations');

  var entryPointTemplateFilePath = path.join(fileSystemExtensions.templatesDirectoryPath, 'entry-point.tmp');
  var entryPointDestinationFilePath = path.join(fileSystemExtensions.jsRootDirectoryPath, 'entry-point.js');
  yeomanGenerator.template(entryPointTemplateFilePath, entryPointDestinationFilePath);
};

var createTestsFiles = function(yeomanGenerator) {
  var testsTemplatesDirectory = path.join(fileSystemExtensions.templatesDirectoryPath, 'tests');
  var applicationTestsDirectory = 'tests';

  yeomanGenerator.directory(testsTemplatesDirectory, applicationTestsDirectory);
};

var getRequireJsModuleName = function(fileName) {
  var baseDirectory = path.dirname(fileName);
  var extension = path.extname(fileName);
  var baseName = path.basename(fileName, extension);

  return path.join(baseDirectory, baseName);
};

var updateModuleFilesList = function(parameters) {
  var moduleName = pluralize.plural(parameters.moduleType);
  var rootJsDirectory = null;

  try {
    rootJsDirectory = fileSystemExtensions.getPathRelativeToRootJsDirectory();
  } catch (err) {
    console.error(err.toString());
    return;
  }

  var templatePath = path.join(parameters.generatorDirectory, 'templates/root-module.tmp');
  var destinationFilePath = path.join(rootJsDirectory, moduleName + ROOT_MODULE_SUFIX);

  if(fileSystem.existsSync(destinationFilePath)){
    fileSystem.unlinkSync(destinationFilePath);
  }

  var exsistingModules = fileSystemExtensions.readFileTree(path.join(rootJsDirectory, moduleName));

  var rootModuleDependencies = exsistingModules.map(function(module) {
    var fullFileName = getRequireJsModuleName(module);
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

  parameters.yeomanGenerator.mkdir(path.join(fileSystemExtensions.jsRootDirectoryPath, pluralModuleTypeName));

  updateModuleFilesList({
    yeomanGenerator: parameters.yeomanGenerator,
    generatorDirectory: path.join(__dirname, '/..'),
    moduleType: parameters.moduleType
  });
};

var initializeApplicationStructure = function(parameters) {
  var yeomanGenerator = parameters.yeomanGenerator;

  createApplicationFiles(yeomanGenerator);
  copyUtilitiesConfigs(yeomanGenerator);
  createTestsFiles(yeomanGenerator);
};

var removeFileFromModule = function(parameters) {
  var moduleDirectory = pluralize.plural(parameters.moduleType);
  var rootJsDirectory = null;

  try {
    rootJsDirectory = fileSystemExtensions.getPathRelativeToRootJsDirectory();
  } catch (err) {
    console.error(err.toString());
    return;
  }

  var fileToDelete = path.join(rootJsDirectory, moduleDirectory, parameters.moduleName + '-' + parameters.moduleType + '.js');

  if(fileSystem.existsSync(fileToDelete)){
    fileSystem.unlinkSync(fileToDelete);
  }
};

var addFileToModule = function(parameters) {
  var moduleDirectory = pluralize.plural(parameters.moduleType); 
  var moduleFileName = parameters.moduleName + '-' + parameters.moduleType;
  var rootJsDirectory = null;

  try {
    rootJsDirectory = fileSystemExtensions.getPathRelativeToRootJsDirectory();
  } catch (err) {
    console.error(err.toString());
    return;
  }

  var templateFilePath = path.join(__dirname, '..', 'templates/regular-module.tmp');
  var destinationFilePath = path.join(rootJsDirectory, moduleDirectory, moduleFileName + '.js');

  parameters.yeomanGenerator.module = {
    moduleName: parameters.moduleName,
    requirejsModuleName: path.join(
      moduleDirectory,
      moduleFileName
    )
  };
  parameters.yeomanGenerator.template(templateFilePath, destinationFilePath);
};

module.exports = {
  updateModuleFilesList: updateModuleFilesList,
  initializeApplicationStructure: initializeApplicationStructure,
  initializeModuleType: initializeModuleType,
  addFileToModule: addFileToModule,
  removeFileFromModule: removeFileFromModule
};
