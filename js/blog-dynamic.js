(function () {
  const modalTriggers = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const searchInput = document.getElementById("blogSearch");
  const filterButtons = document.querySelectorAll("[data-blog-filter]");
  const cards = document.querySelectorAll("[data-blog-card]");
  const articles = document.querySelector(".articles");
  const contactForm = document.getElementById("blogContactForm");
  const toast = document.getElementById("blogToast");

  let activeFilter = "all";
  let toastTimer = null;

  function getModal(selector) {
    if (!selector || selector === "#") return null;
    try {
      return document.querySelector(selector);
    } catch (error) {
      return null;
    }
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    const closeButton = modal.querySelector("[data-close]");
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      const modal = getModal(trigger.getAttribute("data-modal"));
      if (!modal) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openModal(modal);
    }, true);
  });

  modals.forEach(function (modal) {
    modal.setAttribute("aria-hidden", modal.classList.contains("show") ? "false" : "true");
    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target.closest("[data-close]")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeModal(modal);
      }
    }, true);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".modal.show").forEach(closeModal);
  });

  function ensureEmptyState() {
    if (!articles) return null;
    let empty = articles.querySelector(".blog-empty-state");
    if (!empty) {
      empty = document.createElement("div");
      empty.className = "blog-empty-state";
      empty.textContent = "No posts match that search yet.";
      articles.appendChild(empty);
    }
    return empty;
  }

  function applyFilters() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(function (card) {
      const category = card.dataset.blogCategory || "";
      const haystack = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesQuery = !query || haystack.includes(query);
      const isVisible = matchesFilter && matchesQuery;

      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleCount += 1;
    });

    const empty = ensureEmptyState();
    if (empty) empty.hidden = visibleCount !== 0;
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.dataset.blogFilter || "all";
      filterButtons.forEach(function (filterButton) {
        filterButton.classList.toggle("is-active", filterButton === button);
      });
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  applyFilters();

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3600);
  }

  function setInvalid(field, isInvalid) {
    if (!field) return;
    field.classList.toggle("is-invalid", isInvalid);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = contactForm.querySelector('input[type="email"]');
      const message = contactForm.querySelector("textarea");
      const emailInvalid = !email.value.trim() || !email.checkValidity();
      const messageInvalid = !message.value.trim();

      setInvalid(email, emailInvalid);
      setInvalid(message, messageInvalid);

      if (emailInvalid || messageInvalid) {
        showToast("Please complete the highlighted fields.");
        return;
      }

      const subject = encodeURIComponent("Blog contact from " + email.value.trim());
      const body = encodeURIComponent(message.value.trim() + "\n\nFrom: " + email.value.trim());
      window.location.href = "mailto:mahajan.yash09@gmail.com?subject=" + subject + "&body=" + body;
      showToast("Opening your email client with the message ready.");
    });
  }
}());
