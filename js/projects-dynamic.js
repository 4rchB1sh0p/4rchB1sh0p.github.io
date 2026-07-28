(function () {
  const projectData = {
    "#modal_project_1": {
      title: "Helical Reducer",
      info: "Mechanical design | 2018",
      client: "Academic and workshop build",
      images: ["images/nokia1.JPG", "images/cgb1.JPG"],
      meta: ["Gear train", "CAD", "Manufacturing"],
      text: [
        "This project was one of those useful mechanical problems where the drawing board and the workshop keep correcting each other. A helical reducer looks tidy in a CAD view, but the real learning starts when clearances, bearing fits, lubrication, and manufacturability all ask for attention at the same time.",
        "I treated the reducer as a compact lesson in design discipline: define the load path, respect the geometry, check the interfaces, and keep asking what a technician would need to assemble or service it without guessing.",
        "The result was less about a single shiny model and more about building mechanical judgement. It taught me to look at machines as systems of small promises: every shaft, key, and housing face has to keep its part of the agreement."
      ]
    },
    "#modal_project_2": {
      title: "Classroom Ventilation CFD OpenFOAM",
      info: "Simulation | 2021",
      client: "OpenFOAM study",
      images: [
        "https://github.com/4rchB1sh0p/Classroom-Ventilation-CFD-OpenFOAM/blob/main/images/d2%20geom_2.PNG?raw=true",
        "images/D2_streamlines_final_v2.PNG"
      ],
      meta: ["CFD", "OpenFOAM", "Ventilation"],
      text: [
        "This was a classroom airflow study built around a simple but important question: where does the air actually go once people, walls, inlet positions, and real constraints enter the picture?",
        "Using OpenFOAM, I explored the flow field and visualized how ventilation choices can create comfort in one area while leaving another part of the room under-served. The interesting part was not only running the solver, but learning how to distrust a pretty contour plot until the boundary conditions make sense.",
        "The project shaped how I think about simulation work: it is a conversation between physics, assumptions, and patience. A model is useful when it makes the invisible easier to argue about."
      ]
    },
    "#modal_project_3": {
      title: "Grains Classification Image Processing",
      info: "Image processing | 2021",
      client: "Computer vision experiment",
      images: [
        "https://github.com/4rchB1sh0p/Grains-Classification/blob/main/images/rice2sol.jpg?raw=true",
        "images/rice2sol.jpg"
      ],
      meta: ["Image processing", "Classification", "Python"],
      text: [
        "This project started with a very tactile problem: grains look simple until you ask a computer to separate, count, and classify them reliably. Suddenly lighting, shadows, touching edges, and surface texture become part of the algorithm.",
        "I worked through preprocessing, segmentation, feature extraction, and classification logic to turn messy visual data into something measurable. The work was a good reminder that computer vision is rarely magic; it is mostly careful cleanup, clear assumptions, and a lot of small tests.",
        "What I liked most was the bridge between physical objects and software decisions. A tiny grain on a table can teach you a surprising amount about thresholds, noise, and humility."
      ]
    },
    "#modal_project_4": {
      title: "Extruder GearBox",
      info: "Mechanical design | 2019",
      client: "Industrial gearbox concept",
      images: ["images/cgb2.JPG", "images/cgb3.JPG", "images/cgb1.JPG"],
      meta: ["Gearbox", "Industrial design", "CAD"],
      text: [
        "The extruder gearbox project sat right in the zone where mechanical design becomes practical: torque, packaging, service access, and reliability all matter, and none of them politely wait their turn.",
        "I focused on the arrangement of shafts, gearing, housing, and supporting components with an eye toward industrial use rather than only presentation. The challenge was to keep the design understandable while still respecting the loads and constraints that make gearbox work unforgiving.",
        "It reinforced a lesson I still carry into automation and software: robust systems are usually built from boring decisions made carefully."
      ]
    },
    "#modal_project_5": {
      title: "Two Wheeled Self Balancing Robot",
      info: "Controls and robotics | 2021",
      client: "Robotics prototype",
      images: [
        "https://github.com/4rchB1sh0p/Two-Wheeled-Robot/blob/main/images/robot_1.JPG?raw=true",
        "images/robot_1.JPG"
      ],
      meta: ["Controls", "Robotics", "Embedded"],
      text: [
        "A self-balancing robot is a wonderfully honest teacher. If the control loop is lazy, the robot falls. If the sensor data is noisy, the robot falls. If the mechanical center of mass is not where you thought it was, the robot very clearly expresses disagreement.",
        "The project involved working through sensing, actuation, control response, and tuning. It was a compact way to experience the relationship between equations and the physical world, especially the gap between a stable idea and a stable machine.",
        "That gap is where I enjoy working: the place where software has to earn the trust of hardware."
      ]
    },
    "#modal_project_6": {
      title: "CNC Spiral Bevel Gear Error Compensation",
      info: "CNC and error compensation | 2019",
      client: "Manufacturing process improvement",
      images: [
        "https://github.com/4rchB1sh0p/4rchB1sh0p.github.io/blob/main/images/bevel_1.png?raw=true",
        "images/bevel_1.png"
      ],
      meta: ["CNC", "Bevel gears", "Compensation"],
      text: [
        "This project came from a manufacturing problem I find deeply satisfying: the machine is doing almost the right thing, but the error is consistent enough to study and compensate.",
        "I worked around spiral bevel gear geometry, CNC behavior, and correction logic to understand how measured deviation can be translated into a better process. It was not only a gear project; it was a lesson in listening to production data without pretending it is cleaner than it is.",
        "The important shift was treating error as information. Once the pattern is visible, the machine can be nudged toward a better result."
      ]
    },
    "#modal_project_7": {
      title: "Beyond 2026 - Design Showcase",
      info: "Design showcase | 2026",
      client: "Experimental web concept",
      images: [
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "images/imageback.jpg"
      ],
      meta: ["Visual design", "Storytelling", "Web concept"],
      text: [
        "Beyond 2026 is a design showcase idea built around a future-facing mood: a little speculative, a little cinematic, but still anchored in the way a web page should guide someone through a story.",
        "The project explores how layout, image choice, pacing, and interaction can turn a simple concept into an experience. I wanted it to feel less like a static gallery and more like a small invitation to look ahead.",
        "It sits neatly beside the engineering projects because the discipline is similar: decide what matters, remove what distracts, and let the structure carry the user without explaining itself too loudly."
      ]
    }
  };

  const modalTriggers = document.querySelectorAll("[data-modal]");
  const filters = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".portfolio__col[data-cat]");
  const portfolio = document.querySelector(".portfolio");
  const contactForm = document.getElementById("projectsContactForm");

  let activeModal = null;
  let toastTimer = null;

  function showToast(message) {
    let toast = document.getElementById("projectToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "projectToast";
      toast.className = "project-toast";
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

  function getModal(selector) {
    if (!selector || selector === "#") return null;
    try {
      return document.querySelector(selector);
    } catch (error) {
      return null;
    }
  }

  function populateModal(selector) {
    const data = projectData[selector];
    let modal = getModal(selector);
    if (!data || !modal) return;

    const preview = modal.querySelector(".modal-work__previews");
    const title = modal.querySelector(".modal-work__title");
    const info = modal.querySelector(".modal-work__info");
    const client = modal.querySelector(".modal-work__client-company");
    const text = modal.querySelector(".modal-work__text");

    if (preview) {
      preview.innerHTML = [
        '<div class="project-gallery" data-gallery-index="0">',
        '<img src="' + data.images[0] + '" alt="' + data.title + ' preview">',
        '<span class="project-gallery__count">1 / ' + data.images.length + '</span>',
        '</div>'
      ].join("");
      preview.dataset.images = JSON.stringify(data.images);
      preview.dataset.title = data.title;
    }

    if (title) title.textContent = data.title;
    if (info) info.innerHTML = data.info.replace("|", '<span class="modal-work__divider">|</span>');
    if (client) client.textContent = data.client;
    if (text) {
      text.innerHTML = [
        '<ul class="project-meta">',
        data.meta.map(function (item) { return '<li>' + item + '</li>'; }).join(""),
        '</ul>',
        data.text.map(function (paragraph) { return '<p>' + paragraph + '</p>'; }).join(""),
        '<div class="project-links">',
        '<a class="btn btn--thin" href="contact.html">Discuss this</a>',
        '<button class="btn btn--thin" type="button" data-close>Close</button>',
        '</div>'
      ].join("");
    }
  }

  function createProjectModal(selector) {
    if (getModal(selector)) return;
    const id = selector.slice(1);
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = id;
    modal.innerHTML = [
      '<div class="modal__dialog">',
      '<button type="button" class="modal__close" data-close><img src="images/cancel.svg" alt=""></button>',
      '<div class="modal-work">',
      '<div class="modal-work__previews"></div>',
      '<div class="modal-work__content">',
      '<div class="modal-work__header">',
      '<h3 class="modal-work__title"></h3>',
      '<div class="modal-work__info"></div>',
      '</div>',
      '<div class="modal-work__client">',
      '<div class="modal-work__client-title">Project:</div>',
      '<div class="modal-work__client-company"></div>',
      '</div>',
      '<div class="modal-work__text"></div>',
      '<div class="modal-work__footer">',
      '<button type="button" class="modal-work__btn slickPrev"><img src="images/back.svg" height="12" alt="">Previous</button>',
      '<button type="button" class="modal-work__btn slickNext">Next <img src="images/next.svg" height="12" alt=""></button>',
      '</div>',
      '</div>',
      '</div>',
      '</div>'
    ].join("");
    document.body.insertBefore(modal, document.querySelector("#modal_resume") || document.body.lastElementChild);
  }

  Object.keys(projectData).forEach(function (selector) {
    createProjectModal(selector);
    populateModal(selector);
  });

  function openModal(modal) {
    if (!modal) return;
    activeModal = modal;
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
    if (activeModal === modal) activeModal = null;
  }

  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      const modal = getModal(trigger.getAttribute("data-modal"));
      if (!modal) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openModal(modal);
    }, true);

    trigger.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      const modal = getModal(trigger.getAttribute("data-modal"));
      if (!modal) return;
      event.preventDefault();
      openModal(modal);
    });
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
    if (event.key === "Escape") {
      document.querySelectorAll(".modal.show").forEach(closeModal);
    }
  });

  function ensureEmptyState() {
    if (!portfolio) return null;
    let empty = portfolio.querySelector(".project-empty-state");
    if (!empty) {
      empty = document.createElement("div");
      empty.className = "project-empty-state";
      empty.textContent = "No projects match this filter yet.";
      portfolio.appendChild(empty);
    }
    return empty;
  }

  function applyFilter(filterName) {
    let visible = 0;
    projectCards.forEach(function (card) {
      const matches = filterName === "all" || card.dataset.cat === filterName;
      card.classList.toggle("is-hidden", !matches);
      if (matches) visible += 1;
    });
    const empty = ensureEmptyState();
    if (empty) empty.hidden = visible !== 0;
  }

  filters.forEach(function (filter) {
    filter.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      filters.forEach(function (button) {
        button.classList.toggle("is-active", button === filter);
      });
      applyFilter(filter.dataset.filter || "all");
    }, true);
  });

  applyFilter("all");

  document.addEventListener("click", function (event) {
    const next = event.target.closest(".slickNext");
    const prev = event.target.closest(".slickPrev");
    if (!next && !prev) return;

    const modal = event.target.closest(".modal");
    const preview = modal ? modal.querySelector(".modal-work__previews") : null;
    const gallery = preview ? preview.querySelector(".project-gallery") : null;
    if (!preview || !gallery || !preview.dataset.images) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const images = JSON.parse(preview.dataset.images);
    const current = Number(gallery.dataset.galleryIndex || 0);
    const nextIndex = next ? (current + 1) % images.length : (current - 1 + images.length) % images.length;
    gallery.dataset.galleryIndex = String(nextIndex);
    gallery.querySelector("img").src = images[nextIndex];
    gallery.querySelector("img").alt = preview.dataset.title + " preview " + (nextIndex + 1);
    gallery.querySelector(".project-gallery__count").textContent = (nextIndex + 1) + " / " + images.length;
  }, true);

  function setInvalid(field, invalid) {
    if (!field) return;
    field.classList.toggle("is-invalid", invalid);
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

      const subject = encodeURIComponent("Project inquiry from " + email.value.trim());
      const body = encodeURIComponent(message.value.trim() + "\n\nFrom: " + email.value.trim());
      window.location.href = "mailto:mahajan.yash09@gmail.com?subject=" + subject + "&body=" + body;
      showToast("Opening your email client with the project message ready.");
    });
  }
}());
