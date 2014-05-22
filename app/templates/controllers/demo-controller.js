(function(define){
  'use strict';

  var controllerBody = function($scope){
    $scope.model = {
      message: 'This is dynamic message from Angular controller scope.'
    };
  };

  define(function(){
    return {
      name: 'demoController', 
      body: ['$scope', controllerBody]
    };
  });
})(window.define);
