(function (define) {
  'use strict';

  define(function(){
    return {
      name: 'dishesRepository',
      body: function () {
        return {
          getDishes: function (fn) {
            fn([
              { 'id': 1, 'name': 'First dishes'},
              { 'id': 2, 'name': 'Second dishes'},
              { 'id': 3, 'name': 'Third dishes'}
            ]);
          }
        };
      }
    };
  });
})(window.define);
