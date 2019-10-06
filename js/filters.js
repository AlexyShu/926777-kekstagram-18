'use strict';

(function () {
  // Слайдер для фильтра
  // пин слайдера
  var effectLevelPinHandler = document.querySelector('.effect-level__pin');

  effectLevelPinHandler.addEventListener('mouseup', function () {
  // добавим на пин слайдера .effect-level__pin обработчик события mouseup, который будет согласно ТЗ изменять уровень насыщенности фильтра для изображения
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
