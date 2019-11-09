'use strict';

(function () {
  var pinHandle = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelBlock = document.querySelector('.img-upload__effect-level ');
  var imageUploadPreview = document.querySelector('.img-upload__preview img');
  var effectsRadioArray = document.querySelectorAll('.effects__radio');
  var lineValue = document.querySelector('.effect-level__depth');
  var FILTER_DEFAULT_VALUE = 100;
  var currentEffect = 'none';
  var percents;
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var STEP = 25;

  var ValueType = {
    MAX_VALUE: 100,
    MIN_VALUE: 25
  };

  var getEffect = function (value, _percents) {
    var map = {
      'chrome': 'grayscale(' + (_percents * 1 / 100) + ')',
      'sepia': 'sepia(' + (_percents * 1 / 100) + ')',
      'marvin': 'invert(' + (_percents * 100 / 100) + '%)',
      'phobos': 'blur(' + (_percents * 3 / 100) + 'px)',
      'heat': 'brightness(' + (_percents * 3 / 100) + ')',
      'none': '',
    };
    var result = map[value];
    return result;
  };

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

      percents = Math.round((pinHandle.offsetLeft - shift.x) * 100 / effectLevelLine.getBoundingClientRect().width);
      document.querySelector('input[name=effect-level]').setAttribute('value', percents);
      imageUploadPreview.style.filter = getEffect(currentEffect, percents);
      lineValue.style.width = pinHandle.style.left;
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

  filterHandler();

  effectsRadioArray.forEach(function (element) {
    element.addEventListener('click', function (evt) {
      currentEffect = evt.target.value;
      filterHandler();
      imageUploadPreview.className = '';
      imageUploadPreview.classList.add('effects__preview--' + currentEffect);
      pinHandle.style.left = FILTER_DEFAULT_VALUE + '%';
      lineValue.style.width = FILTER_DEFAULT_VALUE + '%';
      percents = FILTER_DEFAULT_VALUE;
      imageUploadPreview.style.filter = getEffect(currentEffect, percents);
    });
  });

  var setImageScale = function (scale) {
    scaleControlValue.setAttribute('value', scale + '%');
    imageUploadPreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  var onClickScale = function (vector) {
    var value = parseInt(scaleControlValue.value, 10);
    var futureValue = value + vector * STEP;
    if (futureValue >= ValueType.MIN_VALUE && futureValue <= ValueType.MAX_VALUE) {
      setImageScale(futureValue);
    }
  };

  var clearScaleControl = function () {
    setImageScale(ValueType.MAX_VALUE);
  };

  scaleControlSmaller.addEventListener('click', function () {
    onClickScale(-1);
  });

  scaleControlBigger.addEventListener('click', function () {
    onClickScale(1);
  });

  window.clearScaleControl = clearScaleControl;

})();
