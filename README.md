# generator-amg 
![logo](https://raw.githubusercontent.com/AndrewKovalenko/generator-amg/master/logo.jpg)

## What is this?

This is [Yeoman-based](http://yeoman.io) scaffolding tool which allows you to create and manage front-end application based on [angularjs](https://angularjs.org/) and [requirejs](http://requirejs.org/). I took [this template](https://github.com/AndrewKovalenko/AngularJs-Application-Template) as basic idea of this application archiecture.

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
├── bower.json
├── Gruntfile.js
├── package.json
├── .bowerrc
├── .jshintrc
└── .gitignore
```
#### How to use?

1. Install [yeoman](http://yeoman.io/) `$ npm install -g yo`
2. Install *amg* `$ npm install -g generator-amg`
2. Create directory for your angular application `mkdir someApp`
2. Create amg application `cd someApp && yo amg`
3. Enter application name

To add new controller type in console `yo amg:add controller some`
and just start writing your code in js/controllers/some-controller.js

`yo amg:remove controller some` allows you to delete your exsisting controller.

`grunt run` command allows you to run your application.
If you want to run optimized version of your application, use `grunt run --release`.


For now *amg* can generate:
* controllers
* services
* factoriess
* filters
* directives

## License

MIT
