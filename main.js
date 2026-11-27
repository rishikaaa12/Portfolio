(() => {
  "use strict";

  // Mobile navigation: keyboard and screen-reader friendly.
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  // Reveal animations gracefully fall back when IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  // Contact form validation. No data is stored by this page.
  const form = document.querySelector("#contactForm");
  if (!form) return;

  const fields = {
    name: { input: form.elements.name, error: document.querySelector("#nameError") },
    email: { input: form.elements.email, error: document.querySelector("#emailError") },
    subject: { input: form.elements.subject, error: document.querySelector("#subjectError") },
    message: { input: form.elements.message, error: document.querySelector("#messageError") },
    consent: { input: form.elements.consent, error: document.querySelector("#consentError") }
  };
  const status = document.querySelector("#formStatus");
  const charCount = document.querySelector("#charCount");

  function showError(key, message) {
    const field = fields[key];
    field.error.textContent = message;
    field.input.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  function validateField(key) {
    const field = fields[key];
    const value = typeof field.input.value === "string" ? field.input.value.trim() : "";
    let message = "";
    if (key === "name") {
      if (!value) message = "Please enter your name.";
      else if (value.length < 2) message = "Name must be at least 2 characters.";
      else if (!/^[\p{L}\p{M} .'-]+$/u.test(value)) message = "Use letters, spaces, apostrophes, dots, or hyphens.";
    } else if (key === "email") {
      if (!value) message = "Please enter your email address.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) message = "Enter a valid email address.";
    } else if (key === "subject") {
      if (!value) message = "Please choose a topic.";
    } else if (key === "message") {
      if (!value) message = "Please enter a message.";
      else if (value.length < 10) message = "Message must be at least 10 characters.";
      else if (value.length > 1500) message = "Message must be 1,500 characters or fewer.";
    } else if (key === "consent") {
      if (!field.input.checked) message = "Please confirm before continuing.";
    }
    return showError(key, message);
  }

  Object.keys(fields).forEach(key => {
    const input = fields[key].input;
    input.addEventListener(key === "consent" || key === "subject" ? "change" : "input", () => {
      validateField(key);
      status.textContent = "";
      status.className = "form-status";
    });
  });
  fields.message.input.addEventListener("input", () => {
    charCount.textContent = `${fields.message.input.value.length} / 1500`;
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) {
      status.textContent = "Please review the highlighted fields and try again.";
      status.className = "form-status error";
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const name = fields.name.input.value.trim();
    const email = fields.email.input.value.trim();
    const subject = fields.subject.input.value;
    const message = fields.message.input.value.trim();
    status.textContent = "Your details are valid. Opening your email app to send the message…";
    status.className = "form-status success";

    // mailto opens the visitor's email application; it is not a server-side submission.
    const mailto = `mailto:rishika.bhardwaj@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`)}`;
    window.location.href = mailto;
  });
})();
