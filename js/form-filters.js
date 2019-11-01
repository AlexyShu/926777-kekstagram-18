'use strict';

(function () {
  // Слайдер для фильтра
  // пин слайдера
  var pinHandle = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelBlock = document.querySelector('.img-upload__effect-level ');
  var imageUploadPreview = document.querySelector('.img-upload__preview img'); // CSS-стили картинки
  var effectsRadioArray = document.querySelectorAll('.effects__radio'); // input наложение эффекта на изображение
  var FILTER_DEFAULT_VALUE = 100;
  var currentEffect = 'none';

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

      // получаю процент где находится пин
      var percents = Math.round((pinHandle.offsetLeft - shift.x) * 100 / effectLevelLine.getBoundingClientRect().width);
      document.querySelector('input[name=effect-level]').setAttribute('value', percents);
      imageUploadPreview.style.filter = getEffect(currentEffect, percents);
    };

    // глубина эффекта
    var getEffect = function (value, percents) {
      switch (value) {
        case 'chrome':
          return 'grayscale(' + (percents * 1 / 100) + ')';
        case 'sepia':
          return 'sepia(' + (percents * 1 / 100) + ')';
        case 'marvin':
          return 'invert(' + (percents * 100 / 100) + '%)';
        case 'phobos':
          return 'blur(' + (percents * 3 / 100) + 'px)';
        case 'heat':
          return 'brightness(' + (percents * 3 / 100) + 'px)';
        // case 'none':
        //   return '';
        default:
          return '';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var filterHandler = function () {
    if (currentEffect !== 'none') {
      effectLevelBlock.classList.remove('hidden');
    } else {
      effectLevelBlock.classList.add('hidden');
    }
  };

  // Выбор фильтра для фото
  effectsRadioArray.forEach(function (element) { // выполняет указанную функцию один раз для каждого элемента в массиве
    element.addEventListener('click', function (evt) {
      imageUploadPreview.className = '';
      imageUploadPreview.classList.add('effects__preview--' + evt.target.value);
      currentEffect = evt.target.value;
      filterHandler();
      pinHandle.style.left = FILTER_DEFAULT_VALUE + '%';
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
