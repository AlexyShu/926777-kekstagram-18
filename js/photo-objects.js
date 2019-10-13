'use strict';

/* // модуль photo-objects
(function () {
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
})(); */

