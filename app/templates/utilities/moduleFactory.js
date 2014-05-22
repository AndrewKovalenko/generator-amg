(function(define){
  'use strict';

  var createNewModule = function(angular){
    return function(parameters){
      var newModule = angular.module(parameters.name, []);

      angular.forEach(parameters.dependencies, function(dependencyInstance){
        newModule[parameters.type].call(newModule, 
                                           dependencyInstance.name, 
                                           dependencyInstance.body);
      });

      return newModule;
    };
  };

  define(['angular'], function(angular){
    return {
      createNewModule: createNewModule(angular)
    }; 
  });
})(window.define);
