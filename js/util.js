
'use strict';

(function () {

  var KeyCode = {
    ENTER: 13,
    ESC: 27,
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    isEnterPressed: function (evt, action) {
      if (evt.keyCode === KeyCode.ENTER) {
        action();
      }
    },
    isEscPressed: function (evt, action) {
      if (evt.keyCode === KeyCode.ESC) {
        action();
      }
    }
  };

})();
