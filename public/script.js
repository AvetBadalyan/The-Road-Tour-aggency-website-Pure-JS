const container = document.querySelector(".container");

document.querySelector(".open-navbar-icon").addEventListener("click", () => {
  container.classList.add("change");
});

document.querySelector(".close-navbar-icon").addEventListener("click", () => {
  container.classList.remove("change");
});

const colors = ["#607dc3", "#6fdfc4", "#e89a74", "#e47b7b", "#a5dbdb"];

let i = 0;

// Apply colors to each navigation link
Array.from(document.querySelectorAll(".nav-link")).forEach(item => {
  item.style.backgroundColor = colors[i++];
});

// Toggle class change on the navigation buttons
Array.from(document.querySelectorAll(".navigation-button")).forEach(item => {
  item.onclick = () => {
    item.parentElement.parentElement.classList.toggle("change");
  };
});

// Close the mobile navbar after clicking a link so the target section is visible
Array.from(document.querySelectorAll(".navbar-wrapper .nav-link")).forEach(
  link => {
    link.addEventListener("click", () => {
      container.classList.remove("change");
    });
  }
);

// --- Dark / light theme toggle ---
const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "theme";

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.setAttribute("aria-pressed", "false");
  }
}

const savedTheme = localStorage.getItem(THEME_KEY);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const nextTheme = isDark ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
});

// --- Scroll-spy: highlight the active nav link ---
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const spyObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);

sections.forEach(section => spyObserver.observe(section));

// --- Scroll-reveal animations ---
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// --- Sticky navbar shadow + back-to-top visibility ---
const backToTop = document.getElementById("back-to-top");

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
    scrollTicking = false;
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Contact form validation + mailto submission ---
const CONTACT_EMAIL = "bookings@theroad-armenia.com";
const contactForm = document.querySelector(".contact-form");

function setError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  if (errorEl) errorEl.textContent = message;
  input.classList.toggle("invalid", Boolean(message));
}

function validateField(input) {
  const value = input.value.trim();

  if (input.hasAttribute("required") && !value) {
    setError(input, "This field is required.");
    return false;
  }

  if (input.type === "email" && value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setError(input, "Please enter a valid email address.");
      return false;
    }
  }

  setError(input, "");
  return true;
}

if (contactForm) {
  const requiredFields = Array.from(
    contactForm.querySelectorAll("input[required], textarea[required]")
  );

  requiredFields.forEach(field => {
    field.addEventListener("blur", () => validateField(field));
  });

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const isValid = requiredFields
      .map(validateField)
      .every(Boolean);

    const statusEl = document.getElementById("form-status");

    if (!isValid) {
      statusEl.textContent = "Please fix the errors above before submitting.";
      return;
    }

    const name = contactForm.querySelector("#contact-name").value.trim();
    const email = contactForm.querySelector("#contact-email").value.trim();
    const phone = contactForm.querySelector("#contact-phone").value.trim();
    const message = contactForm.querySelector("#contact-message").value.trim();

    const subject = `New tour inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    statusEl.textContent = "Opening your email client...";
    window.location.href = mailtoLink;
  });
}
