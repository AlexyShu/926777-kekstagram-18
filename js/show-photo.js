'use strict';

(function () {

  var bigPhoto = document.querySelector('.big-picture');
  var photoWrapper = document.querySelector('.big-picture__img img');

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var openPhoto = function () {
    bigPhoto.classList.remove('hidden');
    photoWrapper.src = window.rawPhotos[0].url;
  };


  var bigPhotoCancel = bigPhoto.querySelector('.big-picture__cancel');

  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('click', onCloseBigPhoto);
  };

  var onCloseBigPhoto = function () {
    closeBigPhoto();
  };

  var onPressEscBigPhoto = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      closeBigPhoto();
    }
  };

  bigPhotoCancel.addEventListener('click', onCloseBigPhoto);
  document.addEventListener('keydown', onPressEscBigPhoto);

  window.openPhoto = openPhoto;

})();
