(function(require, karma){
  'use strict';


  karma.loaded = function(){};
  var filesToLoad = [];
  for (var file in karma.files) {
    if (karma.files.hasOwnProperty(file)) {
      if (/-test\.js$/.test(file)) {
        filesToLoad.push(file);
      }
    }
  }

  require.config({
    // Karma serves files from '/base'
    baseUrl: '/base',
    paths: {
      'angular': 'sources/js/libs/vendors/angular/angular',
      'config/messaging-bus-configuration': 'sources/js/config/messaging-bus-configuration'
    },
    shim:{ 
      'angular':{
        exports: 'angular'
      }
    },

    // ask Require.js to load these files (all our filesToLoad)
    deps: filesToLoad,
    // start test run, once Require.js is done
    callback: karma.start
  });
})(window.require, window.__karma__);
