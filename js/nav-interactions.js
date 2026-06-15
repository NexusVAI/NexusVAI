(function () {
  "use strict";

  var blogOrigin = (window.CANCRI_SITE && window.CANCRI_SITE.blogOrigin) || "https://www.nexusvai.xyz";
  var chatOrigin = (window.CANCRI_SITE && window.CANCRI_SITE.chatOrigin) || "https://www.nexusvai.xyz/chat";

  function rewriteBlogLinks() {
    document.querySelectorAll('a[href*="nexusvai.xyz"]').forEach(function (anchor) {
      var href = anchor.getAttribute("href");
      if (!href) return;

      var next = href
        .replace(/^https?:\/\/www\.nexusvai\.xyz\/chat\//, chatOrigin + "/")
        .replace(/^https?:\/\/www\.nexusvai\.xyz\//, blogOrigin + "/");

      if (next !== href) anchor.setAttribute("href", next);
    });
  }

  function closeAllDropdowns(exceptToggle) {
    document.querySelectorAll(".nav_dropdown_component .w-dropdown-toggle").forEach(function (toggle) {
      if (toggle === exceptToggle) return;
      toggle.classList.remove("w--open");
      toggle.setAttribute("aria-expanded", "false");
      var list = toggle.parentElement && toggle.parentElement.querySelector(".w-dropdown-list");
      if (list) list.classList.remove("w--open");
    });
  }

  function initDesktopDropdowns(root) {
    root.querySelectorAll(".nav_wrap.is-desktop .nav_dropdown_component").forEach(function (component) {
      var toggle = component.querySelector(".w-dropdown-toggle");
      var list = component.querySelector(".w-dropdown-list");
      if (!toggle || !list || toggle.dataset.cancriDropdownInit === "1") return;
      toggle.dataset.cancriDropdownInit = "1";

      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        closeAllDropdowns(toggle);

        if (isOpen) {
          toggle.classList.remove("w--open");
          toggle.setAttribute("aria-expanded", "false");
          list.classList.remove("w--open");
          return;
        }

        toggle.classList.add("w--open");
        toggle.setAttribute("aria-expanded", "true");
        list.classList.add("w--open");
      });
    });
  }

  function initMobileNav() {
    var nav = document.querySelector(".nav_wrap.is-mobile.w-nav");
    if (!nav || nav.dataset.cancriMobileNav === "1") return;
    nav.dataset.cancriMobileNav = "1";

    var button = nav.querySelector(".w-nav-button");
    var menu = nav.querySelector(".w-nav-menu");
    if (!button || !menu) return;

    var menuHome = menu.parentNode;
    var menuNext = menu.nextSibling;
    var navComponent = nav.closest(".nav_component");
    var menuDuration = 400;

    function getOverlay() {
      var overlay = nav.querySelector(".w-nav-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "w-nav-overlay";
        overlay.id = button.getAttribute("aria-controls") || "w-nav-overlay-0";
        nav.appendChild(overlay);
      }
      return overlay;
    }

    function restoreMenuHome() {
      if (!menuHome || menu.parentNode === menuHome) return;
      if (menuNext) menuHome.insertBefore(menu, menuNext);
      else menuHome.appendChild(menu);
    }

    function setOpen(open) {
      var overlay = getOverlay();

      if (navComponent) navComponent.classList.remove("is-nav-closing");

      if (open) {
        overlay.style.display = "block";
        if (menu.parentNode !== overlay) overlay.appendChild(menu);
        button.classList.add("w--open");
        button.setAttribute("aria-expanded", "true");
        menu.classList.add("w--open");
        menu.style.animation = "none";
        void menu.offsetWidth;
        menu.style.animation = "";
        document.body.style.overflow = "hidden";
        return;
      }

      button.classList.remove("w--open");
      button.setAttribute("aria-expanded", "false");
      if (navComponent) navComponent.classList.add("is-nav-closing");

      window.setTimeout(function () {
        if (navComponent) navComponent.classList.remove("is-nav-closing");
        menu.classList.remove("w--open");
        menu.style.animation = "";
        overlay.style.display = "none";
        restoreMenuHome();
        document.body.style.overflow = "";
      }, menuDuration);
    }

    function toggleMenu() {
      setOpen(!button.classList.contains("w--open"));
    }

    button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        toggleMenu();
      },
      true
    );

    button.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleMenu();
    });

    getOverlay().addEventListener("click", function (event) {
      if (event.target === getOverlay()) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && button.classList.contains("w--open")) {
        setOpen(false);
      }
    });

    setOpen(false);
  }

  function initMobileDropdowns(root) {
    root.querySelectorAll(".nav_wrap.is-mobile .nav_dropdown_component").forEach(function (component) {
      var toggle = component.querySelector(".w-dropdown-toggle");
      var list = component.querySelector(".w-dropdown-list");
      if (!toggle || !list || toggle.dataset.cancriMobileDropdownInit === "1") return;
      toggle.dataset.cancriMobileDropdownInit = "1";

      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        closeAllDropdowns(toggle);

        if (isOpen) {
          toggle.classList.remove("w--open");
          toggle.setAttribute("aria-expanded", "false");
          list.classList.remove("w--open");
          return;
        }

        toggle.classList.add("w--open");
        toggle.setAttribute("aria-expanded", "true");
        list.classList.add("w--open");
      });
    });
  }

  function boot() {
    rewriteBlogLinks();
    initDesktopDropdowns(document);
    initMobileDropdowns(document);
    initMobileNav();
  }

  document.addEventListener("DOMContentLoaded", boot);
  window.addEventListener("load", boot);

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav_dropdown_component")) {
      closeAllDropdowns(null);
    }
  });
})();
