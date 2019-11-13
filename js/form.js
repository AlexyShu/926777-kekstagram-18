'use strict';

(function () {

  var uploadFileElement = document.querySelector('.img-upload__input');
  var uploadPopupElement = document.querySelector('.img-upload__overlay');
  var uploadPopupCloseElement = document.querySelector('.img-upload__cancel');
  var formElement = document.querySelector('.img-upload__form');
  var mainBlock = document.querySelector('.main');
  var successBtn;
  var errorBtn;

  var ErrorMessage = {
    HASHTAG_SIMBOL: 'Хэш-тег начинается с символа # (решётка)',
    HASHTAG_ONLY_SIMBOL: 'Хеш-тег не может состоять только из одной решётки;',
    HASHTAG_SPACES: 'Хэш-теги разделяются пробелами',
    HASHTAG_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    HASHTAG_TOO_MUCH: 'Нельзя указать больше пяти хэш-тегов',
    HASHTAG_TOO_LONG: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
  };

  var TextLimitations = {
    MAX_LENGTH: 20,
    MIN_LENGTH: 1,
    MAX_AMOUNT: 5,
    MAX_LENGTH_COMMENT: 140,
  };

  var textHashtagsInput = document.querySelector('.text__hashtags');
  var commentWindow = document.querySelector('.text__description');

  var closeForm = function () {
    uploadPopupElement.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
  };

  var openForm = function () {
    uploadPopupElement.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
  };

  uploadFileElement.addEventListener('change', function () {
    openForm();
  });

  var onFormEscPress = function (evt) {
    window.util.isEscPressed(evt, closeForm);
  };

  var onFieldFocus = function (evt) {
    window.util.isEscPressed(evt, function () {
      evt.stopPropagation();
    });
  };

  uploadPopupCloseElement.addEventListener('click', function () {
    closeForm();
  });

  var hashtagValidity = function (target, value) {
    var hashtagsArray = value.toLowerCase().split(' ').filter(function (it) {
      return it !== '';
    });
    var validTagsCount = 0;
    var textError = '';
    while (hashtagsArray.length) {
      var hashtag = hashtagsArray.splice(0, 1)[0];
      if (hashtag[0] !== '#') {
        textError = ErrorMessage.HASHTAG_SIMBOL;
        break;
      } else if (hashtag.length > TextLimitations.MAX_LENGTH) {
        textError = ErrorMessage.HASHTAG_TOO_LONG;
        break;
      } else if (hashtag.length === TextLimitations.MIN_LENGTH) {
        textError = ErrorMessage.HASHTAG_ONLY_SIMBOL;
        break;
      } else if (hashtagsArray.indexOf(hashtag) > -1) {
        textError = ErrorMessage.HASHTAG_REPEAT;
        break;
      }
      validTagsCount++;
    }
    if (validTagsCount > TextLimitations.MAX_AMOUNT) {
      textError = ErrorMessage.HASHTAG_TOO_MUCH;
    }
    target.setCustomValidity(textError);
    textHashtagsInput.style.outlineColor = (textError === '') ? '' : 'red';
  };

  textHashtagsInput.addEventListener('input', function (evt) {
    var hashtags = textHashtagsInput.value.trim().toLowerCase();
    var target = evt.target;

    hashtagValidity(target, hashtags);
  });

  commentWindow.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length >= TextLimitations.MAX_LENGTH_COMMENT) {
      target.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      target.reportValidity();
      commentWindow.style.outlineColor = 'red';
    } else {
      target.setCustomValidity('');
      commentWindow.style.outlineColor = '';
    }
  });

  textHashtagsInput.addEventListener('keydown', onFieldFocus);
  commentWindow.addEventListener('keydown', onFieldFocus);

  formElement.addEventListener('submit', function (evt) {
    if (formElement.checkValidity()) {
      evt.preventDefault();
      window.xhr.upload(new FormData(formElement), createSuccessMessage, createErrorMessage);
      closeForm();
    }
  });

  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var fragment = document.createDocumentFragment(section);
    var section = successTemplate.cloneNode(true);
    fragment.appendChild(section);
    mainBlock.appendChild(fragment);
    successBtn = mainBlock.querySelector('.success__button');
    successBtn.addEventListener('click', cleanSuccessMessage);
    mainBlock.addEventListener('click', cleanSuccessMessage);
    document.addEventListener('keydown', onSuccessMessaEscPress);
  };

  var cleanSuccessMessage = function () {
    var successMessagPopup = mainBlock.querySelector('.success');
    mainBlock.removeChild(successMessagPopup);
    successBtn.removeEventListener('click', cleanSuccessMessage);
    mainBlock.removeEventListener('click', cleanSuccessMessage);
  };

  var onSuccessMessaEscPress = function (evt) {
    window.util.isEscPressed(evt, cleanSuccessMessage);
  };

  var createErrorMessage = function () {
    var ErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    var fragment = document.createDocumentFragment(section);
    var section = ErrorTemplate.cloneNode(true);
    fragment.appendChild(section);
    mainBlock.appendChild(fragment);
    errorBtn = mainBlock.querySelector('.error__button');
    errorBtn.addEventListener('click', cleanErrorMessage);
    mainBlock.addEventListener('click', cleanErrorMessage);
    document.addEventListener('keydown', errorMessageEscPress);
  };

  var cleanErrorMessage = function () {
    var errorMessagePopup = mainBlock.querySelector('.error');
    mainBlock.removeChild(errorMessagePopup);
    errorBtn.removeEventListener('click', cleanErrorMessage);
    mainBlock.removeEventListener('click', cleanErrorMessage);
    document.removeEventListener('keydown', errorMessageEscPress);

  };

  var errorMessageEscPress = function (evt) {
    window.util.isEscPressed(evt, cleanErrorMessage);
  };

})();
