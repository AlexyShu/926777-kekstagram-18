'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var blockPictures = document.querySelector('.pictures');
  // Блок: Сообщение с ошибкой загрузки изображения
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorPopupTitle = errorPopup.querySelector('.error__title');
  var errorPopupButtons = errorPopup.querySelector('.error__buttons');
  var errorPopupTryAgainBtn = errorPopupButtons.children[0];

  function onTryAgainBtnClick() {
    window.location.reload();
  }

  errorPopupButtons.removeChild(errorPopupButtons.children[1]);
  errorPopupTryAgainBtn.addEventListener('click', onTryAgainBtnClick);

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        var photos = xhr.response;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < photos.length; i++) {
          var photo = photos[i];
          var element = photoTemplate.cloneNode(true);
          element.querySelector('.picture__img').src = photo.url;
          element.querySelector('.picture__likes').textContent = photo.likes;
          element.querySelector('.picture__comments').textContent = photo.comments.length;
          fragment.appendChild(element);
        }
        blockPictures.appendChild(fragment);
        break;
      case 300:
        errorPopupTitle.textContent = 'Ошибка: Запрос был перенаправлен сервером.';
        break;
      case 400:
        errorPopupTitle.textContent = 'Ошибка в запросе.';
        break;
      case 404:
        errorPopupTitle.textContent = 'Ошибка в запросе.';
        break;
      case 500:
        errorPopupTitle.textContent = 'Ошибка: Проблемы на сервере, повторите позже..';
        break;
    }
  });

  xhr.open('GET', URL);
  xhr.send();

})();

