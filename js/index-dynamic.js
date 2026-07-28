(function () {
  const html = document.documentElement;
  const currentYear = document.getElementById("currentYear");
  const themeToggle = document.getElementById("themeToggle");
  const projectGrid = document.getElementById("projectGrid");
  const contactForm = document.getElementById("contactForm");
  const printCv = document.getElementById("printCv");

  const projects = [
    {
      title: "Steerable Function Test Bench",
      type: "automation",
      image: "images/D2_streamlines_final_v2.PNG",
      text: "Control concept and Simulink modelling for functional test benches used in autonomous vehicle testing.",
      link: "projects.html"
    },
    {
      title: "MES Production Integrations",
      type: "software",
      image: "images/nokia1.JPG",
      text: "Plant software and database-backed tools for production status, testing changes, and operator visibility.",
      link: "projects.html"
    },
    {
      title: "Industry 4.0 CNC Modules",
      type: "automation",
      image: "images/cgb1.JPG",
      text: "HMI and controller support for CNC machines, spindle and axis monitoring, alarms, and tool measurement.",
      link: "projects.html"
    }
  ];

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  function setTheme(theme) {
    html.setAttribute("data-bs-theme", theme);
    localStorage.setItem("site-theme", theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    }
  }

  setTheme(localStorage.getItem("site-theme") || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark");
    });
  }

  function renderProjects(filter) {
    if (!projectGrid) return;

    const visibleProjects = projects.filter(function (project) {
      return filter === "all" || project.type === filter;
    });

    projectGrid.innerHTML = visibleProjects.map(function (project) {
      return [
        '<div class="col-md-6 col-xl-4">',
        '<article class="card project-card">',
        '<img src="' + project.image + '" alt="' + project.title + ' preview">',
        '<div class="card-body">',
        '<span class="badge rounded-pill text-bg-light align-self-start mb-3">' + project.type + '</span>',
        '<h3 class="h5 card-title">' + project.title + '</h3>',
        '<p class="card-text text-body-secondary">' + project.text + '</p>',
        '<a class="btn btn-outline-dark mt-auto" href="' + project.link + '"><i class="bi bi-arrow-right"></i> Details</a>',
        '</div>',
        '</article>',
        '</div>'
      ].join("");
    }).join("");
  }

  renderProjects("all");

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-filter]").forEach(function (filterButton) {
        filterButton.classList.remove("active");
      });
      button.classList.add("active");
      renderProjects(button.dataset.filter);
    });
  });

  const counterObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const number = entry.target;
      const target = Number(number.dataset.count || 0);
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = window.setInterval(function () {
        value += step;
        if (value >= target) {
          value = target;
          window.clearInterval(timer);
        }
        number.textContent = value;
      }, 28);

      observer.unobserve(number);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".stat-number").forEach(function (number) {
    counterObserver.observe(number);
  });

  const progressObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      bar.style.width = (bar.dataset.progress || 0) + "%";
      bar.setAttribute("aria-valuenow", bar.dataset.progress || 0);
      bar.setAttribute("aria-valuemin", "0");
      bar.setAttribute("aria-valuemax", "100");
      observer.unobserve(bar);
    });
  }, { threshold: 0.45 });

  document.querySelectorAll(".progress-bar").forEach(function (bar) {
    progressObserver.observe(bar);
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();
      contactForm.classList.add("was-validated");

      if (!contactForm.checkValidity()) return;

      const email = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMessage").value.trim();
      const subject = encodeURIComponent("Portfolio contact from " + email);
      const body = encodeURIComponent(message + "\n\nFrom: " + email);
      window.location.href = "mailto:mahajan.yash09@gmail.com?subject=" + subject + "&body=" + body;

      const toastElement = document.getElementById("contactToast");
      if (toastElement && window.bootstrap) {
        window.bootstrap.Toast.getOrCreateInstance(toastElement).show();
      }
    });
  }

  if (printCv) {
    printCv.addEventListener("click", function () {
      window.print();
    });
  }

  if (window.tsParticles) {
    window.tsParticles.load("tsparticles", {
      detectRetina: true,
      particles: {
        number: { value: 65, density: { enable: true, area: 900 } },
        color: { value: ["#0f766e", "#b84a34", "#202124"] },
        links: { enable: true, color: "#0f766e", opacity: 0.24, distance: 135 },
        move: { enable: true, speed: 0.45, outModes: "bounce" },
        opacity: { value: 0.35 },
        size: { value: { min: 1, max: 4 } }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: true
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.38 } }
        }
      }
    });
  }
}());
