'use strict';

(function () {

  var FILTER_DEFAULT_VALUE = 100;
  var STEP = 25;
  var pinHandle = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelBlock = document.querySelector('.img-upload__effect-level ');
  var imageUploadPreview = document.querySelector('.img-upload__preview img');
  var effectsRadioArray = document.querySelectorAll('.effects__radio');
  var lineValue = document.querySelector('.effect-level__depth');
  var currentEffect = 'none';
  var percents;
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  var ValueType = {
    MAX_VALUE: 100,
    MIN_VALUE: 25
  };

  var getEffect = function (value, percent) {
    var map = {
      'chrome': 'grayscale(' + (percent * 1 / 100) + ')',
      'sepia': 'sepia(' + (percent * 1 / 100) + ')',
      'marvin': 'invert(' + (percent * 100 / 100) + '%)',
      'phobos': 'blur(' + (percent * 3 / 100) + 'px)',
      'heat': 'brightness(' + (percent * 3 / 100) + ')',
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

  var repeatStyle = function () {
    imageUploadPreview.className = '';
    pinHandle.style.left = FILTER_DEFAULT_VALUE + '%';
    lineValue.style.width = FILTER_DEFAULT_VALUE + '%';
  };

  filterHandler();

  effectsRadioArray.forEach(function (element) {
    element.addEventListener('click', function (evt) {
      currentEffect = evt.target.value;
      filterHandler();
      repeatStyle();
      imageUploadPreview.classList.add('effects__preview--' + currentEffect);
      percents = FILTER_DEFAULT_VALUE;
      imageUploadPreview.style.filter = getEffect(currentEffect, percents);
    });
  });

  var restartStyle = function () {
    repeatStyle();
    imageUploadPreview.classList.remove('effects__preview--' + currentEffect);
    imageUploadPreview.classList.add('effects__preview--none');
    imageUploadPreview.style.filter = '';
    effectLevelBlock.classList.add('hidden');
  };

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

  window.formFilters = {
    clearScaleControl: clearScaleControl,
    restartStyle: restartStyle,
  };

})();
