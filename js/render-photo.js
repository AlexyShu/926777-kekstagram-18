'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var renderPhotos = function (photos) {
    var picturesBlock = document.querySelector('.pictures');
    var photosTemplate = document.querySelector('#picture').content.querySelector('.picture');
    window.photosTemplate = photosTemplate;
    var photosCurrent = picturesBlock.querySelectorAll('.picture');
    for (var j = 0; j < photosCurrent.length; j++) {
      picturesBlock.removeChild(photosCurrent[j]);
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var element = photosTemplate.cloneNode(true);
      element.querySelector('.picture__img').src = photo.url;
      element.querySelector('.picture__likes').textContent = photo.likes;
      element.querySelector('.picture__comments').textContent = photo.comments.length;
      // показываем фотов в полном экране
      element.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
      });

      fragment.appendChild(element);
    }
    picturesBlock.appendChild(fragment);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('click', onCloseBigPicture);
  };

  var onCloseBigPicture = function () {
    closeBigPicture();
  };

  var onPressEscBigPicture = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      closeBigPicture();
    }
  };

  bigPictureCancel.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onPressEscBigPicture);

  window.renderPhotos = renderPhotos;


})();
