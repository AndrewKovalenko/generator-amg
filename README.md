# generator-amg 
![logo](https://raw.githubusercontent.com/AndrewKovalenko/generator-amg/master/logo.jpg)

## What is this?

This is [Yeoman](http://yeoman.io) generator which allow you to create and manage front-end application based on [angularjs](https://angularjs.org/) and [requirejs](http://requirejs.org/). I took [this template](https://github.com/AndrewKovalenko/AngularJs-Application-Template) as basic idea of this application archiecture.

#####This generator is in **ALPHA TEST**! 
**So possibly it has some bugs!** Feel free to notify me about bugs which you've found and I'll fix them ASAP.

## Generated application structure

.
├── index.html
├── bower.json
└── js
    ├── controllers
    ├── controllers-module.js
    ├── directives
    ├── directives-module.js
    ├── factories
    ├── factories-module.js
    ├── filters
    ├── filters-module.js
    ├── services
    ├── services-module.js
    ├── libs
    ├── config
    |   └── routing-cinfiguration.js
    ├── 
    |   └── module-factory.js
    └── entry-point.js

#### How to use?
To add new controller type in console `yo amg:add controller some`
and just start writing your code in js/controllers/some-controller.js

`yo amg:remove controller some` allows you to delete your exsisting controller.


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-amg from npm, run:

```
$ npm install -g generator-amg
```

Finally, initiate the generator:

```
$ yo amg
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
