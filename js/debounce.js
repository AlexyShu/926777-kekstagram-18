'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function debounce(func) {
    var timeout;
    return function () {
      var context = null;
      var args = arguments;
      var later = function () {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, DEBOUNCE_INTERVAL);
      if (!timeout) {
        func.apply(context, args);
      }
    };
  };

})();
