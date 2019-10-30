'use strict';

(function () {

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    ESC_KEY_CODE: 27,
    ENTER_KEY_CODE: 13,
  };

})();
