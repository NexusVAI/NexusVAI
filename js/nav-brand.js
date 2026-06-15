(function () {
  "use strict";

  var SCROLL_THRESHOLD = 32;

  function setScrolled(scrolled) {
    document.documentElement.classList.toggle("is-nav-scrolled", scrolled);
  }

  function onScroll() {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-cancri-brand] .cancri-brand__word-wrap").forEach(function (el) {
      el.classList.add("is-in");
    });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });
})();
