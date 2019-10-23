'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError(xhr.responseText);
      }
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');

    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };

  window.xhr = {
    load: load
  };

})();
