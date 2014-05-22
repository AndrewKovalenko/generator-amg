'use strict';

var fileSystem = require('fs');
var mustache = require('mustache');

var creteFileFromTemplate = function (parameters) {
  var template = fileSystem.readFileSync(parameters.templateFilePath, {
    encoding: 'utf8'
  });
  var destinationFileBody = mustache.render(template, parameters.mappings);
  fileSystem.writeFileSync(parameters.destinationFilePath, destinationFileBody);
};

module.exports = {
  createFile: creteFileFromTemplate
};
