// Shared site behaviors: theme toggle, mobile nav, scroll animations, filters, and form UX.
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Theme toggle with localStorage preference.
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const setTheme = (mode) => {
    body.classList.toggle("theme-dark", mode === "dark");
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", mode === "dark");
    }
  };

  setTheme(storedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = body.classList.contains("theme-dark") ? "light" : "dark";
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  // Mobile navigation toggle.
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal animations.
  const animatedItems = document.querySelectorAll("[data-animate]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const reveal = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(reveal, {
      threshold: 0.15,
    });

    animatedItems.forEach((item) => observer.observe(item));
  } else {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Project filtering.
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-tags]");

  if (filterButtons.length && projectCards.length) {
    const applyFilter = (filter) => {
      projectCards.forEach((card) => {
        const tags = card.dataset.tags.split(",").map((tag) => tag.trim());
        const shouldShow = filter === "all" || tags.includes(filter);
        card.hidden = !shouldShow;
      });
    };

    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", button.classList.contains("is-active"));
    });

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");
        filterButtons.forEach((btn) => {
          btn.setAttribute("aria-pressed", btn === button);
        });
        applyFilter(button.dataset.filter);
      });
    });
  }

  // Contact form success message.
  const contactForm = document.querySelector("[data-contact-form]");
  const successMessage = document.querySelector(".form-success");
  const errorMessage = document.querySelector(".form-error");

  if (contactForm && successMessage) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      successMessage.hidden = true;
      if (errorMessage) {
        errorMessage.hidden = true;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton?.setAttribute("disabled", "true");

      const endpoint =
        contactForm.dataset.endpoint?.trim() || contactForm.getAttribute("action");

      if (endpoint) {
        try {
          const formData = new FormData(contactForm);
          const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Form submission failed");
          }

          successMessage.hidden = false;
          contactForm.reset();
        } catch (error) {
          if (errorMessage) {
            errorMessage.hidden = false;
          }
        } finally {
          submitButton?.removeAttribute("disabled");
        }
        return;
      }

      const mailto = contactForm.dataset.mailto;
      if (mailto) {
        const name = contactForm.querySelector("#name")?.value.trim();
        const email = contactForm.querySelector("#email")?.value.trim();
        const message = contactForm.querySelector("#message")?.value.trim();
        const subject = encodeURIComponent(
          `Portfolio inquiry from ${name || "New contact"}`
        );
        const body = encodeURIComponent(
          `Name: ${name || "-"}\nEmail: ${email || "-"}\n\n${message || ""}`
        );
        window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;
        successMessage.hidden = false;
        contactForm.reset();
        setTimeout(() => {
          successMessage.hidden = true;
        }, 4000);
        submitButton?.removeAttribute("disabled");
        return;
      }

      if (errorMessage) {
        errorMessage.hidden = false;
      }
      submitButton?.removeAttribute("disabled");
    });
  }
});
