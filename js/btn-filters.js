'use strict';

(function () {

  // фильтр фото
  var imgFilters = document.querySelector('.img-filters');
  var filterRandomPhotos = document.querySelector('#filter-random');
  var filterDiscussedPhotos = document.querySelector('#filter-discussed');
  var filterPopularPhotos = document.querySelector('#filter-popular');

  imgFilters.classList.remove('img-filters--inactive');

  // функция "взболтать массив"
  function shuffle(photos) {
    var j; var x; var i;
    for (i = photos.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = photos[i];
      photos[i] = photos[j];
      photos[j] = x;
    }
    return photos;
  }

  var renderRandomPhotos = window.debounce(function () {
    var randomPhotos = shuffle(window.photos);
    window.renderPhotos(randomPhotos.slice(0, 10));
  });

  filterRandomPhotos.addEventListener('click', function () {
    renderRandomPhotos();
  });

  filterPopularPhotos.addEventListener('click', function () {
    window.debounce(function () {
      window.photos.sort(function (a, b) {
        return b.likes - a.likes;
      });
      window.renderPhotos(window.photos);
    })();
  });

  filterDiscussedPhotos.addEventListener('click', function () {
    window.debounce(function () {
      window.photos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.renderPhotos(window.photos);
    })();
  });

})();
