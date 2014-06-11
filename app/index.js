'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var core = require('../libs/core');
var configuration = require('../libs/configuration');

var AmgGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        console.log(chalk.cyan('Installing dependencies...'));

        this.installDependencies({
          callback: function() {
            console.log(chalk.cyan('Dependencies installed!'));
          }
        });
      }  
    });
  },
  askFor: function () {
    var done = this.async();

    this.log(this.yeoman);

    this.log(chalk.magenta('Greetings form Angular Modules Generator :-)'));

    var prompts = [{
      name: 'applicationName',
      message: 'How do you want to name your new application?'
    }];

    this.prompt(prompts, function (props) {
      this.applicationName = props.applicationName;

      done();
    }.bind(this));
  },

  app: function () {
    core.initializeApplicationInfrastructure({
      moduleTypes: configuration.moduleTypes,
      yeomanGenerator: this
    });
  },

  projectfiles: function () {
  }
});

module.exports = AmgGenerator;
