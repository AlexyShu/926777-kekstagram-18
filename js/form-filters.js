'use strict';

// модуль filters
(function () {
  // Слайдер для фильтра
  // пин слайдера
  var pinHandle = document.querySelector('.effect-level__pin');
  // var effectLine = document.querySelector('.effect-level__line');

  // передвижение пина
  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
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
  var MAX_VALUE = 100;
  var MIN_VALUE = 25;
  scaleControlValue.value = MAX_VALUE + '%';

  var setImageScale = function (scale) {
    imageUploadPreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  setImageScale(MAX_VALUE);

  var onClickScale = function (vector) {
    var value = parseInt(scaleControlValue.value, 10);
    var futureValue = value + vector * STEP;
    if (futureValue >= MIN_VALUE && futureValue <= MAX_VALUE) {
      scaleControlValue.value = futureValue + '%';
      setImageScale(futureValue);
    }
  };

  scaleControlSmaller.addEventListener('click', function () {
    onClickScale(-1);
  });

  scaleControlBigger.addEventListener('click', function () {
    onClickScale(1);
  });


})();
