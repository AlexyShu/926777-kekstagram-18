'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
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
        photos.sort(function (a, b) {
          return b.likes - a.likes;
        });
        window.photos = photos;
        window.renderPhotos(photos);
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
  xhr.addEventListener('timeout', function () {
    errorPopupTitle.textContent = 'Запрос не успел выполниться за ' + xhr.timeout + 'мс';
  });
  xhr.addEventListener('error', function () {
    errorPopupTitle.textContent = 'Произошла ошибка соединения';
  });

  xhr.timeout = 10000; // 10s
  xhr.open('GET', URL);
  xhr.send();

})();