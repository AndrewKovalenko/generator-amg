// NOTE this module is created just in case we have lot of
// controllers to make code more readable
(function (define) {
  'use strict';
  define(
    [
    'utilities/moduleFactory'
  ],

  function (moduleFactory) {
    return moduleFactory.createNewModule({
      type: 'filter',
      dependencies: Array.prototype.slice.call(arguments, 1, arguments.length),
      name: 'app.filters'
    });
  });
})(window.define);
