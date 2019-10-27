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

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var openPhoto = function (index) {
    return function () {
      bigPhoto.classList.remove('hidden');
      photoWrapper.src = window.rawPhotos[index].url;
      photoLikes.textContent = window.rawPhotos[index].likes;
      countPhotoComments.textContent = '' + window.rawPhotos[index].comments.length;
      photoDescription.textContent = window.rawPhotos[index].description;
      cleanComments();
      renderComment(index);
    };
  };

  var cleanComments = function () {
    var comments = commentsBlock.querySelectorAll('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      commentsBlock.removeChild(comments[i]);
    }
  };

  var renderComment = function (index) {
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.rawPhotos[index].comments.length; i++) {
      var element = commentTemplate.cloneNode(true);
      element.querySelector('.social__picture').src = window.rawPhotos[index].comments[i].avatar;
      element.querySelector('.social__picture').alt = window.rawPhotos[index].comments[i].name;
      element.querySelector('.social__text').textContent = window.rawPhotos[index].comments[i].message;
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
    if (evt.keyCode === KeyCode.ESC) {
      closeBigPhoto();
    }
  };

  bigPhotoCancel.addEventListener('click', onCloseBigPhoto);
  document.addEventListener('keydown', onPressEscBigPhoto);

  window.openPhoto = openPhoto;

})();
