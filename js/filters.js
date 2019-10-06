'use strict';

(function () {
  // Слайдер для фильтра
  // пин слайдера
  var pinHandle = document.querySelector('.effect-level__pin');
  // var effectLine = document.querySelector('.effect-level__line');

  // передвижение пина
  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Выбор фильтра для фото
  var imageUploadPreview = document.querySelector('.img-upload__preview img'); // CSS-стили картинки
  var effectsRadioArray = document.querySelectorAll('.effects__radio'); // input наложение эффекта на изображение

  effectsRadioArray[0].addEventListener('click', function () {
  });

  effectsRadioArray.forEach(function (element) { // выполняет указанную функцию один раз для каждого элемента в массиве
    element.addEventListener('click', function (evt) {
      imageUploadPreview.className = '';
      imageUploadPreview.classList.add('effects__preview--' + evt.target.value);
    });
  });

  // Масштаб фотографии
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var STEP = 25; // Значение должно изменяться с шагом 25
  var MAX_VALUE = '100%';
  var MIN_VALUE = '25%';
  scaleControlValue.value = MAX_VALUE;
  imageUploadPreview.style.transform = 'scale(1)';

  var onDoSmaller = function () {
    var valueInPercentSmaller = parseInt(scaleControlValue.value, 10);
    if (scaleControlValue.value === MIN_VALUE) {
      return scaleControlValue.value;
    }
    scaleControlValue.value = valueInPercentSmaller - STEP + '%';
    imageUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
    return scaleControlValue.value;
  };

  var onDoBigger = function () {
    var valueInPercentBigger = parseInt(scaleControlValue.value, 10);
    if (scaleControlValue.value === MAX_VALUE) {
      return scaleControlValue.value;
    }
    scaleControlValue.value = valueInPercentBigger + STEP + '%';
    imageUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
    return scaleControlValue.value;
  };

  scaleControlSmaller.addEventListener('click', onDoSmaller);
  scaleControlBigger.addEventListener('click', onDoBigger);

})();
