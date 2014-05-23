(function(define){
  'use strict';
  define(function(){
    return ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('index',{
        url: '/',
        views: {
          'test-section': {
            templateUrl: "views/test.html",
            controller: 'demoController'
          }
        }
      });
    }];
  });
})(window.define);
