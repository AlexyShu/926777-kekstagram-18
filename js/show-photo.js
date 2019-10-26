'use strict';

(function () {

  var bigPhoto = document.querySelector('.big-picture');
  var photoWrapper = document.querySelector('.big-picture__img img');
  var photoLikes = document.querySelector('.likes-count');
  var countPhotoComments = document.querySelector('.comments-count');
  var photoDescription = document.querySelector('.social__caption');
  var socialCommentsElement = document.querySelector('.social__comments');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var openPhoto = function () {
    bigPhoto.classList.remove('hidden');
    photoWrapper.src = window.rawPhotos[0].url;
    photoLikes.textContent = window.rawPhotos[0].likes;
    countPhotoComments.textContent = '' + window.rawPhotos[0].comments.length;
    photoDescription.textContent = window.rawPhotos[0].description;
    renderComment();
  };

  // socialCommentCount.add.classList('visually-hidden');
  // commentsLoader.add.classList('visually-hidden');

  var renderComment = function () {
    var socialCommentElement = socialCommentsElement.querySelector('.social__comment');
    for (var i = 0; i < window.rawPhotos[0].comments.length; i++) {
      socialCommentElement.querySelector('.social__picture').src = window.rawPhotos[0].comments[i].avatar;
      socialCommentElement.querySelector('.social__picture').alt = window.rawPhotos[0].comments[i].name;
      socialCommentElement.querySelector('.social__text').textContent = window.rawPhotos[0].comments[i].message;
    }
    return socialCommentElement;
    console.log(socialCommentElement)
  };

  var bigPhotoCancel = bigPhoto.querySelector('.big-picture__cancel');

  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('click', onCloseBigPhoto);
  };

  var onCloseBigPhoto = function () {
    closeBigPhoto();
  };

  var onPressEscBigPhoto = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      closeBigPhoto();
    }
  };

  bigPhotoCancel.addEventListener('click', onCloseBigPhoto);
  document.addEventListener('keydown', onPressEscBigPhoto);

  window.openPhoto = openPhoto;

})();
