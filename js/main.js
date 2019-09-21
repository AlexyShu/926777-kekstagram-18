'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var PICTURE_OBJECTS = 25;
var ARRAY_URL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
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

// массив коментарий
var createCommentObject = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
    message: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
    name: NAMES[Math.floor(Math.random() * NAMES.length)]
  };
  return comment;
};

var commentObjects = [];
for (var g = 0; g < 6; g++) {
  commentObjects.push(createCommentObject());
}

// функция создающая объект
var createPhotoDescription = function () {
  for (var j = 0; j < ARRAY_URL.length; j++) {
    var photoUrl = ARRAY_URL[j];
  }

  var photo = {
    url: 'hotos/' + photoUrl + '.jpg',
    description: 'описание фотографии.',
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: commentObjects[Math.floor(Math.random() * commentObjects.length)]
  };
  return photo;
};

// создаю объект
var photoObjects = [];
for (var i = 0; i < PICTURE_OBJECTS; i++) {
  photoObjects.push(createPhotoDescription());
}


// отрисовываю элементы
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var blockPictures = document.querySelector('.pictures');

var renderPhoto = function () {
  var element = photoTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photoObjects.url;
  element.querySelector('.picture__likes').textContent = photoObjects.likes;
  element.querySelector('.picture__comments').textContent = photoObjects.comments;
  return element;
};

var pictures = createPhotoDescription(PICTURE_OBJECTS);
var fragment = document.createDocumentFragment();

for (var t = 0; t < pictures.length; t++) {
  fragment.appendChild(renderPhoto(pictures[t]));
}

blockPictures.appendChild(fragment);
