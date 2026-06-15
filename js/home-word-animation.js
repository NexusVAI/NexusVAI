(function () {
  "use strict";

  var CJK_RE = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;

  var WORD_CONFIG = {
    selector:
      "h1:not(.no-animate), .u-display-xxl:not(.no-animate), .u-display-xl:not(.no-animate), .u-animated-text",
    minDelay: 80,
    maxDelay: 420,
    duration: 800,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    translateY: 24,
    threshold: 0.15,
    heroSelector: "h1.u-display-xl",
  };

  var ROTATE_CONFIG = {
    selector: "[data-rotate]",
    interval: 3000,
    duration: 500,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    translateY: 16,
  };

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function randomDelay(min, max) {
    return Math.random() * (max - min) + min;
  }

  /** Split text into animation tokens (Latin words + individual CJK chars). */
  function tokenizeText(text) {
    var tokens = [];
    var i = 0;

    while (i < text.length) {
      var ch = text[i];

      if (/\s/.test(ch)) {
        var wsStart = i;
        while (i < text.length && /\s/.test(text[i])) i++;
        tokens.push({ type: "space", text: text.slice(wsStart, i) });
        continue;
      }

      if (CJK_RE.test(ch)) {
        tokens.push({ type: "word", text: ch });
        i++;
        continue;
      }

      var wordStart = i;
      while (i < text.length && !/\s/.test(text[i]) && !CJK_RE.test(text[i])) i++;
      tokens.push({ type: "word", text: text.slice(wordStart, i) });
    }

    return tokens;
  }

  function appendAnimationStyles() {
    if (document.getElementById("home-word-animation-styles")) return;

    var style = document.createElement("style");
    style.id = "home-word-animation-styles";
    style.textContent =
      ".animate-word{display:inline-block;opacity:0;transform:translateY(" +
      WORD_CONFIG.translateY +
      "px);transition:opacity " +
      WORD_CONFIG.duration +
      "ms " +
      WORD_CONFIG.easing +
      ",transform " +
      WORD_CONFIG.duration +
      "ms " +
      WORD_CONFIG.easing +
      ";will-change:opacity,transform}" +
      ".animate-space{display:inline;opacity:0}" +
      "span.animate-word{text-decoration:inherit}" +
      ".word-animation-processed{opacity:1!important}" +
      ".rotating-text{position:relative;display:inline-block;vertical-align:baseline}" +
      ".rotating-text-item{display:inline-block;opacity:1;transform:translateY(0);transition:opacity " +
      ROTATE_CONFIG.duration +
      "ms " +
      ROTATE_CONFIG.easing +
      ",transform " +
      ROTATE_CONFIG.duration +
      "ms " +
      ROTATE_CONFIG.easing +
      "}" +
      ".rotating-text-item.exit{opacity:0;transform:translateY(-" +
      ROTATE_CONFIG.translateY +
      "px)}" +
      ".rotating-text-item.enter{opacity:0;transform:translateY(" +
      ROTATE_CONFIG.translateY +
      "px)}" +
      "@media (prefers-reduced-motion:reduce){.animate-word,.rotating-text-item{transition:none!important;opacity:1!important;transform:translateY(0)!important}}";

    document.head.appendChild(style);
  }

  function unwrapAnimatedMarkup(element) {
    if (!element.querySelector(".animate-word")) return null;

    var clone = element.cloneNode(true);
    clone.querySelectorAll(".u-sr-only").forEach(function (node) {
      node.remove();
    });
    clone.querySelectorAll(".animate-word, .animate-space").forEach(function (node) {
      var parent = node.parentNode;
      while (node.firstChild) parent.insertBefore(node.firstChild, node);
      parent.removeChild(node);
    });
    return clone.innerHTML;
  }

  function wrapWordsInHTML(html) {
    var temp = document.createElement("div");
    temp.innerHTML = html;

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent;
        if (!text.trim()) return document.createTextNode(text);

        var fragment = document.createDocumentFragment();
        tokenizeText(text).forEach(function (token) {
          var span = document.createElement("span");
          span.textContent = token.text;
          if (token.type === "word") {
            span.className = "animate-word";
            span.style.transitionDelay =
              randomDelay(WORD_CONFIG.minDelay, WORD_CONFIG.maxDelay) + "ms";
          } else {
            span.className = "animate-space";
          }
          fragment.appendChild(span);
        });
        return fragment;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        var clone = node.cloneNode(false);
        Array.from(node.childNodes).forEach(function (child) {
          clone.appendChild(processNode(child));
        });
        return clone;
      }

      return node.cloneNode(true);
    }

    var fragment = document.createDocumentFragment();
    Array.from(temp.childNodes).forEach(function (node) {
      fragment.appendChild(processNode(node));
    });
    return fragment;
  }

  function revealWords(element) {
    element.querySelectorAll(".animate-word").forEach(function (word) {
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
    });
    element.querySelectorAll(".animate-space").forEach(function (space) {
      space.style.opacity = "1";
    });
  }

  function shouldPlayImmediately(element) {
    if (element.matches(WORD_CONFIG.heroSelector)) return true;
    var rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  }

  function initWordAnimations() {
    appendAnimationStyles();

    if (prefersReducedMotion()) {
      document.querySelectorAll(WORD_CONFIG.selector).forEach(function (el) {
        el.classList.add("word-animation-processed");
      });
      return;
    }

    document.querySelectorAll(WORD_CONFIG.selector).forEach(function (element) {
      if (element.getAttribute("aria-hidden") === "true") return;
      if (element.classList.contains("word-animation-processed")) return;

      var sourceHTML = unwrapAnimatedMarkup(element) || element.innerHTML;
      var srOnly = document.createElement("span");
      srOnly.className = "u-sr-only";
      srOnly.innerHTML = sourceHTML;

      element.innerHTML = "";
      element.appendChild(srOnly);
      element.appendChild(wrapWordsInHTML(sourceHTML));
      element.classList.add("word-animation-processed");

      if (shouldPlayImmediately(element)) {
        requestAnimationFrame(function () {
          revealWords(element);
        });
        return;
      }

      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            requestAnimationFrame(function () {
              revealWords(element);
            });
            obs.disconnect();
          });
        },
        { threshold: WORD_CONFIG.threshold, rootMargin: "0px 0px -8% 0px" }
      );

      observer.observe(element);
    });

    var foucStyle = document.getElementById("word-animation-fouc");
    if (foucStyle) foucStyle.remove();
  }

  function initRotatingText() {
    if (prefersReducedMotion()) return;

    document.querySelectorAll(ROTATE_CONFIG.selector).forEach(function (element) {
      var rotateData = element.getAttribute("data-rotate");
      if (!rotateData) return;

      var options = rotateData
        .split(",")
        .map(function (opt) {
          return opt.trim();
        })
        .filter(Boolean);

      if (options.length <= 1) return;

      var originalText = element.textContent.trim();
      element.classList.add("rotating-text");

      var textSpan = document.createElement("span");
      textSpan.className = "rotating-text-item";
      textSpan.textContent = originalText;
      element.innerHTML = "";
      element.appendChild(textSpan);

      var currentIndex = options.indexOf(originalText);
      if (currentIndex === -1) currentIndex = 0;

      function rotateText() {
        var currentSpan = element.querySelector(".rotating-text-item");
        var nextIndex = (currentIndex + 1) % options.length;
        currentSpan.classList.add("exit");

        setTimeout(function () {
          currentSpan.textContent = options[nextIndex];
          currentSpan.classList.remove("exit");
          currentSpan.classList.add("enter");
          requestAnimationFrame(function () {
            currentSpan.classList.remove("enter");
          });
          currentIndex = nextIndex;
        }, ROTATE_CONFIG.duration / 2);
      }

      element._rotationInterval = setInterval(rotateText, ROTATE_CONFIG.interval);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initWordAnimations();
    initRotatingText();
  });
})();
