# generator-amg 
![logo](https://raw.githubusercontent.com/AndrewKovalenko/generator-amg/master/logo.jpg)

## What is this?

Briefly, this is console tool "kinda rails scaffolding", which allows you to create and manage [angularjs](https://angularjs.org/) application with [requirejs](http://requirejs.org/) as top-level dependency management tool. 
Top-level means, that this tool use [requirejs](http://requirejs.org/) for managing dependecies between files but not angular module dependencies. 

#####This generator is in **ALPHA TEST**! 
**So possibly it has some bugs!** Feel free to notify me about bugs which you've found and I'll fix them ASAP.

## Generated application structure
```
.
├── builds
|   ├── debug                             
|   └── release
├── grunt-tasks-configuration             
|   ├── connect.json
|   ├── copy.json
|   └── requirejs.json
├── node_modules
├── sources
|   ├── index.html
|   └── js
|       ├── controllers
|       ├── controllers-module.js
|       ├── directives
|       ├── directives-module.js
|       ├── factories
|       ├── factories-module.js
|       ├── filters
|       ├── filters-module.js
|       ├── services
|       ├── services-module.js
|       ├── libs
|       |   └── vendors
|       |       ├── angular-ui-router
|       |       ├── angular
|       |       └── requirejs
|       ├── config
|       |   ├── routing-cinfiguration.js
|       |   └── messaging-bus-configuration.js
|       ├── utilities
|       |   ├── module-factory.js
|       |   ├── messaging-bus.js
|       |   └── sandbox.js
|       └── entry-point.js
├── tests    
|   ├── bootstrap-tests.js
|   └── unit-tests
|       ├── karma-config.js
|       └── messaging-bus-test.js
├── bower.json
├── Gruntfile.js
├── package.json
├── .bowerrc
├── .jshintrc
└── .gitignore
```

#### Why do you need it?

If you don't want to spend time on creating infrastructure of your front-end application but want to concentrate on development of domain features, this tool will do almost all routine work for you.

##### Features

* generates good-structured application
* provides configurations for grunt tasks to *build* and *run* generated application "from the box"
* provides *debug* and *release* mode of building/running
* provides generator to automaticaly add controller/directive/factory and so on to your app
* automatically updates dependencies for new controllers/directives/factories etc.
* provides messaging-bus to comunicate between different modules of your application
* provides configuration for testing framework and working examples of unot-tests

#### How to use?

1. Install [yeoman](http://yeoman.io/) `$ npm install -g yo`
2. Install *amg* `$ npm install -g generator-amg`
3. Create directory for your angular application `mkdir someApp`
4. Create amg application `cd someApp && yo amg`
5. Enter application name

**Done!!!** Now you can run your app using `grunt run`.
If you want to add *controller, factory, directive etc.* to your app,
use `yo amg:add *<controller, directive, factory, ...>* *<name>*`.

*Example:*
`yo amg:add controller home` will generate new file `sources/js/controllers/home-controller.js`
and add *requirejs* dependency for it to `sources/js/controllers-module.js`.

`yo amg:remove controller home` will remove *home-controller.js* and it's dependency on 
`sources/js/controllers-module.js`.


`grunt run` command allows you to run your application.
If you want to run optimized version of your application(bundled and uglified), use `grunt run --release`.

To run unit-tests use `karma start tests/unit-tests/karma-config.js`


For now *amg* can generate:
* controllers
* services
* factoriess
* filters
* directives

## License

MIT
