'use strict';

(function () {

  var ELEMENTS_COUNT = 5;
  var bigPhoto = document.querySelector('.big-picture');
  var photoWrapper = document.querySelector('.big-picture__img img');
  var photoLikes = document.querySelector('.likes-count');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var photoDescription = document.querySelector('.social__caption');
  var commentsBlock = document.querySelector('.social__comments');
  var commentsLoader = document.querySelector('.comments-loader');
  var tegBody = document.querySelector('.body');
  var bigPhotoCancel = bigPhoto.querySelector('.big-picture__cancel');
  var commentsBtnClicks;
  var currentPhoto = null;

  var openPhoto = function (photo) {
    return function () {
      bigPhoto.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      photoWrapper.src = photo.url;
      photoLikes.textContent = photo.likes;
      photoDescription.textContent = photo.description;
      cleanComments();
      commentsBtnClicks = 0;
      renderComment(photo);
      currentPhoto = photo;
      tegBody.classList.add('modal-open');
    };
  };

  var cleanComments = function () {
    var comments = commentsBlock.querySelectorAll('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      commentsBlock.removeChild(comments[i]);
    }
  };

  var renderComment = function (photo) {
    var maxIndex = (commentsBtnClicks + 1) * ELEMENTS_COUNT;
    if (maxIndex > photo.comments.length - 1) {
      maxIndex = photo.comments.length;
      commentsLoader.classList.add('hidden');
    }
    socialCommentCount.textContent = maxIndex + ' из ' + photo.comments.length;
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < maxIndex; i++) {
      var element = commentTemplate.cloneNode(true);
      element.querySelector('.social__picture').src = photo.comments[i].avatar;
      element.querySelector('.social__picture').alt = photo.comments[i].name;
      element.querySelector('.social__text').textContent = photo.comments[i].message;
      fragment.appendChild(element);
    }
    commentsBlock.appendChild(fragment);
  };

  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('click', onCloseBigPhoto);
    tegBody.classList.remove('modal-open');
  };

  var onCloseBigPhoto = function () {
    closeBigPhoto();
  };

  var onPressEscBigPhoto = function (evt) {
    window.util.isEscPressed(evt, closeBigPhoto);
  };

  var onEnterPress = function (evt) {
    window.util.isEnterPressed(evt, openPhoto);
  };

  bigPhotoCancel.addEventListener('click', onCloseBigPhoto);
  document.addEventListener('keydown', onPressEscBigPhoto);
  document.addEventListener('keydown', onEnterPress);

  commentsLoader.addEventListener('click', function () {
    commentsBtnClicks += 1;
    cleanComments();
    renderComment(currentPhoto);
  });

  window.showPhoto = {
    openPhoto: openPhoto
  };

})();
