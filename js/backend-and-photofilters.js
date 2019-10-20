'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  // Блок: Сообщение с ошибкой загрузки изображения
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorPopupTitle = errorPopup.querySelector('.error__title');
  var errorPopupButtons = errorPopup.querySelector('.error__buttons');
  var errorPopupTryAgainBtn = errorPopupButtons.children[0];

  // фильтр фото
  var imgFilters = document.querySelector('.img-filters');
  var filterRandomPhotos = document.querySelector('#filter-random');
  var filterDiscussedPhotos = document.querySelector('#filter-discussed');
  var filterPopularPhotos = document.querySelector('#filter-popular');

  imgFilters.classList.remove('img-filters--inactive');

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

  // функция "взболтать массив"
  function shuffle(photos) {
    var j; var x; var i;
    for (i = photos.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = photos[i];
      photos[i] = photos[j];
      photos[j] = x;
    }
    return photos;
  }

  filterRandomPhotos.addEventListener('click', function () {
    window.debounce(function () {
      var randomPhotos = shuffle(window.photos);
      window.renderPhotos(randomPhotos.slice(0, 10));
    })();
  });

  filterPopularPhotos.addEventListener('click', function () {
    window.debounce(function () {
      window.photos.sort(function (a, b) {
        return b.likes - a.likes;
      });
      window.renderPhotos(window.photos);
    })();
  });

  filterDiscussedPhotos.addEventListener('click', function () {
    window.debounce(function () {
      window.photos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.renderPhotos(window.photos);
    })();
  });
})();
