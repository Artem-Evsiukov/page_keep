(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _tabs = _interopRequireDefault(require("./components/tabs"));

var _slider = _interopRequireDefault(require("./components/slider"));

var _popup = _interopRequireDefault(require("./components/popup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.
(function ($) {
  // When DOM is ready
  $(function () {
    _tabs["default"].init();

    _slider["default"].init();

    _popup["default"].init();
  });
})(jQuery);

Fancybox.bind('[data-fancybox="gallery"]', {
  Thumbs: false,
  Toolbar: false,
  Image: {
    zoom: false,
    click: false,
    wheel: 'slide'
  }
});

},{"./components/popup":2,"./components/slider":3,"./components/tabs":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var POPUP_SHOW = document.querySelectorAll('.js-show-popup');
var POPUPS = document.querySelectorAll('[data-popup]');
var OVERLAY = document.querySelector('.js-overlay');
var BODY = document.querySelector('body');
var CLOSE_BTN = document.querySelectorAll('.js-popup-close');
var CLASS_ACTIVE = 'active';
var CLASS_OVERFLOW = 'overflow';

var popups = function () {
  if (!POPUPS.length) return;

  function fadeOut(el) {
    var changeOpasity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -0.8;
    if (!el) return;
    requestAnimationFrame(function anim() {
      var opacity = +window.getComputedStyle(el).opacity;

      if (opacity <= 0) {
        el.style.opacity = 0;
        el.style.display = 'none';
        el.classList.remove(CLASS_ACTIVE);
        return;
      }

      el.style.opacity = opacity + changeOpasity;
      if (opacity > 0) requestAnimationFrame(anim);
    });
  }

  function fadeIn(el) {
    var changeOpasity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.8;
    if (!el) return;
    el.style.display = 'block';
    el.classList.add(CLASS_ACTIVE);
    requestAnimationFrame(function anim() {
      var opacity = +window.getComputedStyle(el).opacity;

      if (opacity >= 1) {
        el.style.opacity = 1;
        return;
      }

      el.style.opacity = opacity + changeOpasity;
      if (opacity < 1) requestAnimationFrame(anim);
    });
  }

  var hidePopup = function hidePopup() {
    fadeOut(OVERLAY);
    BODY.classList.remove(CLASS_OVERFLOW);
    POPUPS.forEach(function (popup) {
      return fadeOut(popup);
    });
  };

  var showPopup = function showPopup(target) {
    fadeIn(OVERLAY);
    BODY.classList.add(CLASS_OVERFLOW);
    var currentPopup = document.querySelector("[data-popup=\"".concat(target, "\"]"));
    fadeIn(currentPopup);
  };

  var showPopupInit = function showPopupInit() {
    if (POPUP_SHOW.length) {
      POPUP_SHOW.forEach(function (opener) {
        opener.addEventListener('click', function () {
          showPopup(this.dataset.trigger);
        });
      });
    }

    if (OVERLAY) {
      OVERLAY.addEventListener('click', function () {
        hidePopup();
      });
    }

    if (CLOSE_BTN.length) {
      CLOSE_BTN.forEach(function (closure) {
        closure.addEventListener('click', function () {
          hidePopup();
        });
      });
    }
  };

  var init = function init() {
    if (POPUPS.length) {
      showPopupInit();
    }
  };

  return {
    init: init,
    showPopup: showPopup
  };
}();

var _default = popups;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var swiperSlider = function () {
  var introSwiper = new Swiper('.js-intro-slider', {
    slidesPerView: 1.3,
    spaceBetween: 10,
    speed: 1000,
    centeredSlides: true,
    autoplay: false,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 40
      }
    }
  });
  var popupSwiper = new Swiper('.js-popup-slider', {
    slidesPerView: 1,
    speed: 1000,
    centeredSlides: true,
    autoplay: false,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  var init = function init() {};

  return {
    init: init
  };
}();

var _default = swiperSlider;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_ACTIVE = 'active';
var wrapList = document.querySelectorAll('.js-tabs');

var tabs = function () {
  var tabsInit = function tabsInit() {
    if (!wrapList.length) return;
    wrapList.forEach(function (wrap) {
      return attachEvents(wrap);
    });

    function attachEvents(parent) {
      var tabList = parent.querySelectorAll('[data-tab]'),
          contentList = parent.querySelectorAll('[data-content]');
      if (!tabList.length) return;
      tabList.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          tabList.forEach(function (btn) {
            return btn.classList.remove(CLASS_ACTIVE);
          });
          e.currentTarget.classList.add(CLASS_ACTIVE);
          var idContent = e.currentTarget.dataset.tab;

          if (idContent === 'all') {
            contentList.forEach(function (content) {
              return content.classList.add(CLASS_ACTIVE);
            });
          } else {
            var currentContentList = document.querySelectorAll("[data-content=\"".concat(idContent, "\"]"));
            contentList.forEach(function (content) {
              return content.classList.remove(CLASS_ACTIVE);
            });
            currentContentList.forEach(function (content) {
              return content.classList.add(CLASS_ACTIVE);
            });
          }
        });
      });
    }
  };

  var init = function init() {
    tabsInit();
  };

  return {
    init: init
  };
}();

var _default = tabs;
exports["default"] = _default;

},{}]},{},[1]);
