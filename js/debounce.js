'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (cb) {
    return function () {
      var parameters = arguments;
      if (window.lastTimeout) {
        window.clearTimeout(window.lastTimeout);
      }
      window.lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
        window.lastTimeout = null;
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
