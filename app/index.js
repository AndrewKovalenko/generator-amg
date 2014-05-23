'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var pluralize = require('pluralize');
var chalk = require('chalk');
var fileCreator = require('../libs/file-creator');
var amgConfiguration = require('../libs/amg-configuration');
var rootModuleUpdater = require('../libs/root-module-updater');

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
    for (var moduleType in amgConfiguration.templateFiles) {
      var pluralModuleTypeName = pluralize.plural(moduleType);

      this.mkdir(amgConfiguration.rootJsDirectory);
      this.mkdir(amgConfiguration.rootJsDirectory + '/libs');
      this.mkdir(amgConfiguration.rootJsDirectory + '/' + pluralModuleTypeName);
      rootModuleUpdater.updateRootModule({
        generatorDirectory: __dirname + '/..',
        moduleType: moduleType,
        rootJsDirectory: amgConfiguration.rootJsDirectory
      });
    }
    this.directory(amgConfiguration.rootJsDirectory + '/config');
    this.directory(amgConfiguration.rootJsDirectory + '/utilities');

    fileCreator.createFile({
      templateFilePath: __dirname + '/../templates/entry-point.tmp',
      destinationFilePath: amgConfiguration.rootJsDirectory + '/entry-point.js',
      mappings: {applicationName: this.newApplicationName}
    });

    this.copy('_.bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
    this.template('_index.html', 'index.html');
  },

  projectfiles: function () {
  }
});

module.exports = AmgGenerator;
