'use strict';

(function () {
  var fullScreenPhoto = document.querySelector('.big-picture');

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
        fullScreenPhoto.classList.remove('hidden');
      });

      fragment.appendChild(element);
    }
    picturesBlock.appendChild(fragment);
  };

  window.renderPhotos = renderPhotos;

})();
