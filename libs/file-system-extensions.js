'use strict';

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

var readFileTreeRecurcively = function(rootDirectory) {
  return readFileTree({
    currentDirectory: rootDirectory
  });
};

var getPathRelativeToRootJsDirectory = function(parameters) {
  var prefix = '';

  do {
    if(fileSystem.existsSync(path.join(prefix, parameters.rootJsDirectory, 'entry-point.js'))){
      return path.join(prefix, parameters.rootJsDirectory);
    }

    prefix = path.join(prefix, '..');

  } while (path.resolve(prefix) !== '/');

  throw new Error('Amg application not found.');

};

module.exports = {
  readFileTree: readFileTreeRecurcively,
  getPathRelativeToRootJsDirectory: getPathRelativeToRootJsDirectory
};
