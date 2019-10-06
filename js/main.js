'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var PICTURE_OBJECTS = 25;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// функция случайных лайков и аватарок
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция случайных индексов
var getRandomIndex = function (arr) {
  var minIndex = 0;
  var maxIndex = arr.length - 1;
  return arr[getRandomNumber(minIndex, maxIndex)];
};

// функция создающая комментарий
var createCommentObject = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
    message: getRandomIndex(COMMENTS),
    name: getRandomIndex(NAMES)
  };
  return comment;
};

// массив комментариев
var commentObjects = [];
for (var g = 0; g < 6; g++) {
  commentObjects.push(createCommentObject());
}

// функция создающая объект-фотография
var createPhotoDescription = function (photoIndex) {
  var photo = {
    url: 'photos/' + photoIndex + '.jpg',
    description: 'описание фотографии.',
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: commentObjects[Math.floor(Math.random() * commentObjects.length)]
  };
  return photo;
};

// отрисовываю элементы
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var blockPictures = document.querySelector('.pictures');

var renderPhoto = function (photo) {
  var element = photoTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments;
  return element;
};

var fragment = document.createDocumentFragment();
// создаю объект-фото
var photoObjects = [];

for (var i = 0; i < PICTURE_OBJECTS; i++) {
  photoObjects.push(createPhotoDescription(i + 1));
  fragment.appendChild(renderPhoto(photoObjects[i]));
}

blockPictures.appendChild(fragment);

// задание Обработка событий

// задаю переменную для input
var uploadFileElement = document.querySelector('.img-upload__input');
// задаю переменную для - Формы редактирования изображения
var uploadPopupElement = document.querySelector('.img-upload__overlay');
// задаю переменную для кнопки закрытия формы
var uploadPopupCloseElement = document.querySelector('.img-upload__cancel');

// функция-обработчик закрытия формы при нажатии esc4
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
  if (evt.keyCode === 27) {
    closeForm();
  }
};

// закрытие формы по клику
uploadPopupCloseElement.addEventListener('click', function () {
  closeForm();
});

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


// Валидация Хештегов
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

var textHashtagsInput = document.querySelector('.text__hashtags'); // input в разделе - Добавление хэш-тегов и комментария к изображению

var hashtagValidity = function (target, value) {
  var hashtagsArray = value.split(' ');
  var textError = 'Неверное значение';

  for (var k = 0; k < hashtagsArray; k++) {
    var hashtag = hashtagsArray[k];

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

