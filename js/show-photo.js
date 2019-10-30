'use strict';

(function () {

  var bigPhoto = document.querySelector('.big-picture');
  var photoWrapper = document.querySelector('.big-picture__img img');
  var photoLikes = document.querySelector('.likes-count');
  var countPhotoComments = document.querySelector('.comments-count');
  var photoDescription = document.querySelector('.social__caption');
  var commentsBlock = document.querySelector('.social__comments');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var openPhoto = function (photo) {
    return function () {
      bigPhoto.classList.remove('hidden');
      photoWrapper.src = photo.url;
      photoLikes.textContent = photo.likes;
      countPhotoComments.textContent = '' + photo.comments.length;
      photoDescription.textContent = photo.description;
      cleanComments();
      renderComment(photo);
    };
  };

  var cleanComments = function () {
    var comments = commentsBlock.querySelectorAll('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      commentsBlock.removeChild(comments[i]);
    }
  };

  var renderComment = function (photo) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      var element = commentTemplate.cloneNode(true);
      element.querySelector('.social__picture').src = photo.comments[i].avatar;
      element.querySelector('.social__picture').alt = photo.comments[i].name;
      element.querySelector('.social__text').textContent = photo.comments[i].message;
      fragment.appendChild(element);
    }
    commentsBlock.appendChild(fragment);
  };

  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');

  var bigPhotoCancel = bigPhoto.querySelector('.big-picture__cancel');

  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('click', onCloseBigPhoto);
  };

  var onCloseBigPhoto = function () {
    closeBigPhoto();
  };

  var onPressEscBigPhoto = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE) {
      closeBigPhoto();
    }
  };

  var onEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY_CODE) {
      openPhoto();
    }
  };

  bigPhotoCancel.addEventListener('click', onCloseBigPhoto);
  document.addEventListener('keydown', onPressEscBigPhoto);
  document.addEventListener('keydown', onEnterPress);

  window.openPhoto = openPhoto;

})();
