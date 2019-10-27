'use strict';

(function () {

  var onSuccess = function (photos) { // photos - это мой xhr.response
    window.renderPhotos(photos);
    window.showFilters(photos);
  };

  var onError = function (text) {
    var onTryAgainBtnClick = function () {
      window.xhr.load(onSuccess, onError);
    };
    window.showError(text, onTryAgainBtnClick);
  };

  window.xhr.load(onSuccess, onError);

})();
