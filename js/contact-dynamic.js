(function () {
  const modalTriggers = document.querySelectorAll("[data-modal]");
  const contactForm = document.getElementById("contact-form_contact");
  const modalForm = document.getElementById("modalContactForm");
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
    const firstField = modal.querySelector("input, textarea, [data-close]");
    if (firstField) firstField.focus({ preventScroll: true });
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

  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.setAttribute("aria-hidden", modal.classList.contains("show") ? "false" : "true");
  });

  document.addEventListener("click", function (event) {
    const modal = event.target.classList && event.target.classList.contains("modal")
      ? event.target
      : event.target.closest("[data-close]") && event.target.closest(".modal");

    if (!modal) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    closeModal(modal);
  }, true);

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".modal.show").forEach(closeModal);
  });

  function showToast(message) {
    let toast = document.getElementById("contactToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "contactToast";
      toast.className = "contact-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3600);
  }

  function setInvalid(field, invalid) {
    if (!field) return;
    field.classList.toggle("is-invalid", invalid);
  }

  function handleContactSubmit(event, fields) {
    event.preventDefault();

    const name = fields.name ? fields.name.value.trim() : "";
    const email = fields.email.value.trim();
    const message = fields.message.value.trim();
    const nameInvalid = fields.name ? !name : false;
    const emailInvalid = !email || !fields.email.checkValidity();
    const messageInvalid = !message;

    setInvalid(fields.name, nameInvalid);
    setInvalid(fields.email, emailInvalid);
    setInvalid(fields.message, messageInvalid);

    if (nameInvalid || emailInvalid || messageInvalid) {
      showToast("Please complete the highlighted fields.");
      return;
    }

    const subjectPrefix = name ? "Contact from " + name : "Quick contact";
    const subject = encodeURIComponent(subjectPrefix + " via portfolio");
    const body = encodeURIComponent(message + "\n\nFrom: " + (name ? name + " <" + email + ">" : email));
    window.location.href = "mailto:mahajan.yash09@gmail.com?subject=" + subject + "&body=" + body;
    showToast("Opening your email client with the message ready.");
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      handleContactSubmit(event, {
        name: document.getElementById("name_contact"),
        email: document.getElementById("email_contact"),
        message: document.getElementById("message_contact")
      });
    });
  }

  if (modalForm) {
    modalForm.addEventListener("submit", function (event) {
      handleContactSubmit(event, {
        email: document.getElementById("input-email"),
        message: document.getElementById("input-text")
      });
    });
  }
}());
