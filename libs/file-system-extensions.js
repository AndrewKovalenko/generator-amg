'use strict';

var configuration = require('./configuration');
var fileSystem = require('fs');
var path = require('path');

function readFileTree (parameters) {
  var currentDirectory = parameters.currentDirectory;
  var result = [];

  var directoryContent = fileSystem.readdirSync(currentDirectory);

  directoryContent.forEach(function(item) {
    if(item[0] === '.') {
      return; 
    }

    var stats = fileSystem.statSync(path.join(currentDirectory, item));

    if(stats.isDirectory()){
      var contentOfSubDirectory = readFileTree({
        currentDirectory: path.join(currentDirectory, item)
      });

      result = result.concat(contentOfSubDirectory);

    } else {
      result.push(path.join(currentDirectory, item));
    }
  });
  return result;
}

var getTemplatesDirectoryPath = function() {
  return path.join(__dirname, '../templates/');
};

var jsRootDirectoryPath = function() {
  return path.join(configuration.sourcesDirectory, configuration.rootJsDirectory);
};

var readFileTreeRecurcively = function(rootDirectory) {
  return readFileTree({
    currentDirectory: rootDirectory
  });
};

var getPathRelativeToRootJsDirectory = function() {
  var prefix = '';

  do {
    if(fileSystem.existsSync(path.join(prefix, jsRootDirectoryPath(), 'entry-point.js'))){
      return path.join(prefix, jsRootDirectoryPath());
    }

    prefix = path.join(prefix, '..');

  } while (path.resolve(prefix) !== '/');

  return path.join(jsRootDirectoryPath());

};

module.exports = {
  readFileTree: readFileTreeRecurcively,
  getPathRelativeToRootJsDirectory: getPathRelativeToRootJsDirectory,
  jsRootDirectoryPath: jsRootDirectoryPath(),
  sourcesDirectory: configuration.sourcesDirectory,
  templatesDirectoryPath: getTemplatesDirectoryPath()
};
