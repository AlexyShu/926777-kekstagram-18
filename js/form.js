'use strict';

(function () {
  // задаю переменную для input
  var uploadFileElement = document.querySelector('.img-upload__input');
  // задаю переменную для - Формы редактирования изображения
  var uploadPopupElement = document.querySelector('.img-upload__overlay');
  // задаю переменную для кнопки закрытия формы
  var uploadPopupCloseElement = document.querySelector('.img-upload__cancel');
  // форма
  var formElement = document.querySelector('.img-upload__form');
  var mainBlock = document.querySelector('.main');

  var errorMessage = {
    HASHTAG_SIMBOL: 'Хэш-тег начинается с символа # (решётка)',
    HASHTAG_ONLY_SIMBOL: 'Хеш-тег не может состоять только из одной решётки;',
    HASHTAG_SPACES: 'Хэш-теги разделяются пробелами',
    HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    HASHTAG_TOO_MUCH: 'Нельзя указать больше пяти хэш-тегов',
    HASHTAG_TOO_LONG: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
  };

  var textLimitations = {
    MAX_LENGTH: 20,
    MIN_LENGTH: 1,
    MAX_AMOUNT: 5,
    MAX_LENGTH_COMMENT: 140,
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
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      closeForm();
    }
  };

  // Не закрывать форму по escape если фокус в поле
  var onFieldFocus = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  };

  // закрытие формы по клику
  uploadPopupCloseElement.addEventListener('click', function () {
    closeForm();
  });

  // Валидация Хештегов
  var textHashtagsInput = document.querySelector('.text__hashtags'); // input в разделе - Добавление хэш-тегов и комментария к изображению

  var hashtagValidity = function (target, value) {
    var hashtagsArray = value.toLowerCase().split(' ');
    var validTagsCount = 0;
    var textError = '';
    while (hashtagsArray.length) {
      var hashtag = hashtagsArray.splice(0, 1)[0];
      if (hashtag[0] !== '#') {
        textError = errorMessage.HASHTAG_SIMBOL;
        break;
      } else if (hashtag.length > textLimitations.MAX_LENGTH) {
        textError = errorMessage.HASHTAG_TOO_LONG;
        break;
      } else if (hashtag.length === textLimitations.MIN_LENGTH) {
        textError = errorMessage.HASHTAG_ONLY_SIMBOL;
        break;
      } else if (hashtagsArray.indexOf(hashtag) > -1) {
        textError = errorMessage.HASHTAG_REPEAT;
        break;
      }
      validTagsCount++;
    }
    if (validTagsCount > textLimitations.MAX_AMOUNT) {
      textError = textError = errorMessage.HASHTAG_TOO_MUCH;
    }
    target.setCustomValidity(textError);
  };

  textHashtagsInput.addEventListener('input', function (evt) {
    var hashtags = textHashtagsInput.value.trim().toLowerCase();
    var target = evt.target;

    hashtagValidity(target, hashtags);
  });


  // Валидация коментария
  var commentWindow = document.querySelector('.text__description'); // textarea в разделе - Добавление хэш-тегов и комментария к изображению

  commentWindow.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > textLimitations.MAX_LENGTH_COMMENT) {
      target.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      target.reportValidity();
    } else {
      target.setCustomValidity('');
    }
  });

  textHashtagsInput.addEventListener('keydown', onFieldFocus);
  commentWindow.addEventListener('keydown', onFieldFocus);

  // отправка данных формы на сервер

  formElement.addEventListener('submit', function (evt) {
    if (formElement.checkValidity()) {
      evt.preventDefault();
      window.xhr.upload(new FormData(formElement), createSuccessMessage, createErrorMessage);
      closeForm();
    }
  });

  // отрисовка сообщения об успешной отправки
  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var fragment = document.createDocumentFragment(section);
    var section = successTemplate.cloneNode(true);
    fragment.appendChild(section);
    mainBlock.appendChild(fragment);

    var successBtn = mainBlock.querySelector('.success__button');
    successBtn.addEventListener('click', cleanSuccessMessage);
    mainBlock.addEventListener('click', cleanSuccessMessage);
    document.addEventListener('keydown', onSuccessMessaEscPress);
  };

  var cleanSuccessMessage = function () {
    var SuccessMessagPopup = mainBlock.querySelector('.success');
    mainBlock.removeChild(SuccessMessagPopup);
  };

  // закрытие сообщения об отправки данных по esc
  var onSuccessMessaEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      cleanSuccessMessage();
    }
  };

  // отрисовка сообщения об ошибке отправки
  var createErrorMessage = function () {
    var ErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    var fragment = document.createDocumentFragment(section);
    var section = ErrorTemplate.cloneNode(true);
    fragment.appendChild(section);
    mainBlock.appendChild(fragment);

    var errorBtn = mainBlock.querySelector('.error__button');
    errorBtn.addEventListener('click', cleanErrorMessage);
    mainBlock.addEventListener('click', cleanErrorMessage);
    document.addEventListener('keydown', errorMessaEscPress);
  };

  var cleanErrorMessage = function () {
    var errorMessagPopup = mainBlock.querySelector('.error');
    mainBlock.removeChild(errorMessagPopup);
  };

  // закрытие сообщения об отправки данных по esc
  var errorMessaEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      cleanErrorMessage();
    }
  };

})();
