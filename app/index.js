'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var pluralize = require('pluralize');
var chalk = require('chalk');
var fileCreator = require('../libs/file-creator');
var amgConfiguration = require('../libs/amg-configuration');

var AmgGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        console.log(chalk.cyan('Installing Bower dependencies...'));

        this.bowerInstall([], {}, function () {
          console.log(chalk.cyan('Dependencies installed!'));
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Greetings form Angular Modules Generator :-)'));

    var prompts = [{
      name: 'newApplicationName',
      message: 'How do you want to name your new application?'
    }];

    this.prompt(prompts, function (props) {
      this.newApplicationName = props.newApplicationName;

      done();
    }.bind(this));
  },

  app: function () {
    for (var moduleName in amgConfiguration.templateFiles) {
      var pluralModuleName = pluralize.plural(moduleName);

      this.mkdir(pluralModuleName);
      this.copy(pluralModuleName + '-module.js');
    }
    this.directory('config');
    this.directory('utilities');
    fileCreator.createFile({
      templateFilePath: __dirname + '/templates/entry-point.tmp',
      destinationFilePath: 'entry-point.js',
      mappings: {applicationName: this.newApplicationName}
    });

    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
  }
});

module.exports = AmgGenerator;
