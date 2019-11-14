'use strict';

(function () {

  var TIMEOUT = 10000;
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
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
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
    window.fileChooser.value = '';
  };

  window.xhr = {
    load: load,
    upload: upload
  };

})();
