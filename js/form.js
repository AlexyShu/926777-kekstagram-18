'use strict';

(function () {
  var ESC_KEYCODE = 27;
  // задаю переменную для input
  var uploadFileElement = document.querySelector('.img-upload__input');
  // задаю переменную для - Формы редактирования изображения
  var uploadPopupElement = document.querySelector('.img-upload__overlay');
  // задаю переменную для кнопки закрытия формы
  var uploadPopupCloseElement = document.querySelector('.img-upload__cancel');

  var errorMessage = {
    HASHTAG_SIMBOL: 'Хэш-тег начинается с символа # (решётка)',
    HASHTAG_ONLY_SIMBOL: 'Хеш-тег не может состоять только из одной решётки;',
    HASHTAG_SPACES: 'Хэш-теги разделяются пробелами',
    HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    HASHTAG_TOO_MUCH: 'Нельзя указать больше пяти хэш-тегов',
    HASHTAG_TOO_LONG: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
    HASHTAGS_SUCCESS: 'Ok!'
  };

  var textLimitations = {
    MAX_LENGTH: 20,
    MIN_LENGTH: 1,
    MAX_AMOUNT: 5
  };

  // функция-обработчик закрытия формы при нажатии esc
  // к форме добавляю класс hidden
  var closeForm = function () {
    uploadPopupElement.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
  };

  // функция открытия формы
  var openForm = function () {
    uploadPopupElement.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
  };

  uploadFileElement.addEventListener('change', function () {
    openForm();
  });

  // закрытие формы при нажатие на esc
  var onFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeForm();
    }
  };

  // закрытие формы по клику
  uploadPopupCloseElement.addEventListener('click', function () {
    closeForm();
  });

  // Валидация Хештегов
  var textHashtagsInput = document.querySelector('.text__hashtags'); // input в разделе - Добавление хэш-тегов и комментария к изображению

  var hashtagValidity = function (target, value) {
    var hashtagsArray = value.split(' ');
    var textError = 'Ok';

    for (var i = 0; i < hashtagsArray.length; i++) {
      var hashtag = hashtagsArray[i];

      if (hashtag[0] !== '#') {
        textError = errorMessage.HASHTAG_SIMBOL;
        break;
      } else if (hashtag.length > textLimitations.MAX_LENGTH) {
        textError = errorMessage.HASHTAG_TOO_LONG;
        break;
      } else if (hashtagsArray.length > textLimitations.MAX_AMOUNT) {
        textError = errorMessage.HASHTAG_TOO_MUCH;
        break;
      } else if (hashtag.length === textLimitations.MIN_LENGTH) {
        textError = errorMessage.HASHTAG_ONLY_SIMBOL;
        break;
      } else if (hashtag.indexOf(hashtag) !== i) {
        textError = errorMessage.HASHTAG_REPEAT;
        break;
      }
      textError = errorMessage.HASHTAGS_SUCCESS;
    }
    target.setCustomValidity(textError);
  };

  textHashtagsInput.addEventListener('input', function (evt) {
    var hashtags = textHashtagsInput.value.trim().toLowerCase();
    var target = evt.target;

    hashtagValidity(target, hashtags);
  });

})();
