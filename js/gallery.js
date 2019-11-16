'use strict';

(function () {

  var onSuccess = function (photos) {
    window.renderPic.renderPhotos(photos);
    window.btnFilters.showFilters(photos);
  };

  var onError = function (text) {
    var onTryAgainBtnClick = function () {
      window.xhr.load(onSuccess, onError);
    };
    window.error.showError(text, onTryAgainBtnClick);
  };

  window.xhr.load(onSuccess, onError);

})();
