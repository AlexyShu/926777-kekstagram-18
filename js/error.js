'use strict';

(function () {

  window.error = {
    showError: function (text, onTryAgainBtnClick) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorPopup = errorTemplate.cloneNode(true);
      var errorPopupTitle = errorPopup.querySelector('.error__title');
      var errorPopupButtons = errorPopup.querySelector('.error__buttons');
      var errorPopupTryAgainBtn = errorPopupButtons.children[0];

      errorPopupTitle.textContent = text;

      errorPopupButtons.removeChild(errorPopupButtons.children[1]);
      errorPopupTryAgainBtn.addEventListener('click', onTryAgainBtnClick);
    },
  };
})();
