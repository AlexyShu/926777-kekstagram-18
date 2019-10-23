'use strict';

(function () {

  window.showError = function (text, onTryAgainBtnClick) {
  // Блок: Сообщение с ошибкой загрузки изображения
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorPopup = errorTemplate.cloneNode(true);
    var errorPopupTitle = errorPopup.querySelector('.error__title');
    var errorPopupButtons = errorPopup.querySelector('.error__buttons');
    var errorPopupTryAgainBtn = errorPopupButtons.children[0];

    errorPopupTitle.textContent = text;

    errorPopupButtons.removeChild(errorPopupButtons.children[1]);
    errorPopupTryAgainBtn.addEventListener('click', onTryAgainBtnClick);
  };
})();
