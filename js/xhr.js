'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var blockPictures = document.querySelector('.pictures');


  // функция случайных лайков и аватарок
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // функция случайных индексов
  var getRandomIndex = function (arr) {
    var minIndex = 0;
    var maxIndex = arr.length - 1;
    return arr[getRandomNumber(minIndex, maxIndex)];
  };


  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    var error;
    switch (xhr.status) {
      case 200:
        var photos = xhr.response;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < photos.length; i++) {
          var photo = photos[i];
          var element = photoTemplate.cloneNode(true);
          element.querySelector('.picture__img').src = photo.url;
          element.querySelector('.picture__likes').textContent = photo.likes;
          element.querySelector('.picture__comments').textContent = getRandomIndex(photo.comments);
          fragment.appendChild(element);
        }
        blockPictures.appendChild(fragment);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      case 500:
        error = 'Ошибка сервера';
        break;

      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
  });

  xhr.open('GET', URL);
  xhr.send();

})();

