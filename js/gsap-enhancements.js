(function () {
  "use strict";

  if (!window.gsap) {
    return;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasScrollTrigger = Boolean(window.ScrollTrigger);
  var hasScrollTo = Boolean(window.ScrollToPlugin);

  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (hasScrollTo) {
    gsap.registerPlugin(ScrollToPlugin);
  }

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function storageGet(key) {
    try {
      return window.sessionStorage && window.sessionStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      }
    } catch (error) {}
  }

  function createLoader() {
    var page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    var isHomePage = page === "index.html" || page === "";
    var hasSeenLoader = storageGet("portfolioLoaderSeen") === "true";

    if (reduceMotion || !isHomePage || hasSeenLoader || document.body.classList.contains("gsap-loader-ready")) {
      return;
    }

    var loader = document.createElement("div");
    loader.className = "gsap-loader";
    loader.setAttribute("aria-hidden", "true");

    ["Hello", "Welcome", "Yashodhar"].forEach(function (word) {
      var el = document.createElement("div");
      el.className = "gsap-loader__word";
      el.innerHTML = word + '<span class="gsap-loader__dot"></span>';
      loader.appendChild(el);
    });

    document.body.prepend(loader);
    document.body.classList.add("gsap-loader-ready");
    storageSet("portfolioLoaderSeen", "true");

    var words = qsa(".gsap-loader__word", loader);
    var tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: function () {
        loader.remove();
      }
    });

    words.forEach(function (word, index) {
      tl.fromTo(word, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.34 }, index ? ">-0.05" : 0)
        .to(word, { y: -24, opacity: 0, duration: 0.28 }, ">0.12");
    });

    tl.to(loader, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, ">-0.05");
  }

  function createProgress() {
    if (!hasScrollTrigger || reduceMotion) {
      return;
    }

    var bar = document.createElement("div");
    bar.className = "gsap-progress";
    document.body.appendChild(bar);

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2
      }
    });
  }

  function createCursor() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    var cursor = document.createElement("div");
    var label = document.createElement("div");
    cursor.className = "gsap-cursor";
    label.className = "gsap-cursor__label";
    label.textContent = "View";
    document.body.append(cursor, label);

    var cursorX = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
    var cursorY = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });
    var labelX = gsap.quickTo(label, "x", { duration: 0.3, ease: "power3.out" });
    var labelY = gsap.quickTo(label, "y", { duration: 0.3, ease: "power3.out" });

    document.addEventListener("pointermove", function (event) {
      cursorX(event.clientX - 9);
      cursorY(event.clientY - 9);
      labelX(event.clientX - 34);
      labelY(event.clientY - 34);
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    });

    qsa("a, button, .work, .articles__col, [data-modal], .btn").forEach(function (target) {
      target.addEventListener("pointerenter", function () {
        gsap.to(cursor, { scale: 2.35, duration: 0.25, ease: "power3.out" });
      });

      target.addEventListener("pointerleave", function () {
        gsap.to(cursor, { scale: 1, duration: 0.25, ease: "power3.out" });
      });
    });

    qsa(".work, .articles__col").forEach(function (target) {
      target.addEventListener("pointerenter", function () {
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 });
      });

      target.addEventListener("pointerleave", function () {
        gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
      });
    });
  }

  function animateIntro() {
    if (reduceMotion) {
      return;
    }

    var introItems = qsa(".header__inner, .intro__subtitle, .intro__title, .intro__text, .social__link, .intro .image, .about__photo_2, .about__content_2 > *, .container_contact > *");

    gsap.from(introItems, {
      y: 28,
      opacity: 0,
      duration: 0.85,
      stagger: 0.055,
      ease: "power3.out",
      delay: document.querySelector(".gsap-loader") ? 1.25 : 0.1
    });
  }

  function animateOnScroll() {
    if (!hasScrollTrigger || reduceMotion) {
      return;
    }

    qsa(".about__inner_2, .news__header, .portfolio__col, .articles__col, .slot-card, .note-card, .card-slot, .section-head, .sidebar-box").forEach(function (el) {
      if (el.closest(".modal")) {
        return;
      }

      gsap.from(el, {
        y: 54,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse"
        }
      });
    });

    qsa(".responsive-image, .work__image, .articles__photo, .spot-thumb").forEach(function (img) {
      gsap.fromTo(img, { scale: 1.08 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6
        }
      });
    });
  }

  function magneticButtons() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    qsa(".btn, .nav_2__link, .footer__nav_2-link, .works__nav_2-link, .social__link, .meta-chip, .chip").forEach(function (el) {
      el.classList.add("magnetic");
      el.addEventListener("pointermove", function (event) {
        var rect = el.getBoundingClientRect();
        var strength = el.classList.contains("btn") ? 0.32 : 0.22;
        var x = (event.clientX - rect.left - rect.width / 2) * strength;
        var y = (event.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(el, { x: x, y: y, duration: 0.35, ease: "power3.out" });
      });
      el.addEventListener("pointerleave", function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.35)" });
      });
    });
  }

  function smoothScroll() {
    if (!hasScrollTo || reduceMotion) {
      return;
    }

    qsa('a[href^="#"]:not([href="#"])').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) {
          return;
        }

        event.preventDefault();
        gsap.to(window, { duration: 0.9, scrollTo: { y: target, offsetY: 80 }, ease: "power3.inOut" });
      });
    });
  }

  function menuOverlay() {
    var nav = document.querySelector("#nav_2");
    var toggle = document.querySelector("#nav_2Toggle");
    if (!nav || !toggle) {
      return;
    }

    var overlay = document.createElement("div");
    overlay.className = "gsap-menu-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = [
      '<button class="gsap-menu-overlay__close" type="button" aria-label="Close menu">X</button>',
      '<div class="gsap-menu-overlay__inner">',
      '<div class="gsap-menu-overlay__label">Navigation</div>',
      '<nav class="gsap-menu-overlay__links"></nav>',
      '<div class="gsap-menu-overlay__socials"></div>',
      '</div>'
    ].join("");

    var linksWrap = overlay.querySelector(".gsap-menu-overlay__links");
    qsa("a", nav).forEach(function (link) {
      var clone = link.cloneNode(true);
      clone.removeAttribute("class");
      linksWrap.appendChild(clone);
    });

    var socials = overlay.querySelector(".gsap-menu-overlay__socials");
    qsa(".footer__social a").forEach(function (link) {
      var clone = link.cloneNode(true);
      clone.textContent = link.getAttribute("href").replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
      socials.appendChild(clone);
    });

    document.body.appendChild(overlay);

    var close = overlay.querySelector(".gsap-menu-overlay__close");
    var overlayLinks = qsa("a", overlay);
    var tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });

    tl.fromTo(overlay, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.75 })
      .from(overlay.querySelector(".gsap-menu-overlay__label"), { y: 20, opacity: 0, duration: 0.45 }, "-=0.35")
      .from(overlayLinks, { y: 38, opacity: 0, stagger: 0.055, duration: 0.55 }, "-=0.25");

    function openMenu(event) {
      event.preventDefault();
      nav.classList.remove("show");
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      tl.play(0);
    }

    function closeMenu() {
      tl.eventCallback("onReverseComplete", function () {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
      });
      tl.reverse();
    }

    toggle.addEventListener("click", openMenu);
    close.addEventListener("click", closeMenu);
    overlayLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  function hoverPreview() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    var items = qsa(".work, .articles__col");
    if (!items.length) {
      return;
    }

    var preview = document.createElement("div");
    var img = document.createElement("img");
    preview.className = "gsap-hover-preview";
    preview.appendChild(img);
    document.body.appendChild(preview);

    var moveX = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3.out" });
    var moveY = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3.out" });

    items.forEach(function (item) {
      var source = item.querySelector("img");
      if (!source) {
        return;
      }

      item.addEventListener("pointerenter", function () {
        img.src = source.currentSrc || source.src;
        gsap.to(preview, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" });
        gsap.fromTo(img, { scale: 1.18 }, { scale: 1.04, duration: 0.55, ease: "power3.out" });
      });

      item.addEventListener("pointermove", function (event) {
        moveX(event.clientX + 24);
        moveY(event.clientY - 72);
      });

      item.addEventListener("pointerleave", function () {
        gsap.to(preview, { opacity: 0, scale: 0.94, duration: 0.2, ease: "power3.out" });
      });
    });
  }

  function enhanceFiltering() {
    qsa("[data-filter]").forEach(function (filter) {
      filter.addEventListener("click", function () {
        window.setTimeout(function () {
          qsa("[data-cat]:not(.hide)").forEach(function (item) {
            gsap.fromTo(item, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.38, ease: "power3.out" });
          });
          if (hasScrollTrigger) {
            ScrollTrigger.refresh();
          }
        }, 20);
      });
    });
  }

  function animateModals() {
    qsa(".modal .timeline__item, .modal .progress-bar__item, .modal .modal-work__content > *").forEach(function (el) {
      gsap.set(el, { clearProps: "all" });
    });
  }

  function activePageLinks() {
    var page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    qsa(".nav_2__link, .footer__nav_2-link").forEach(function (link) {
      if ((link.getAttribute("href") || "").toLowerCase().endsWith(page)) {
        link.classList.add("is-active");
      }
    });
  }

  ready(function () {
    createLoader();
    createProgress();
    createCursor();
    animateIntro();
    animateOnScroll();
    magneticButtons();
    smoothScroll();
    menuOverlay();
    hoverPreview();
    enhanceFiltering();
    animateModals();
    activePageLinks();
  });
})();
