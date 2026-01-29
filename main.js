// ==========================
// DOM ELEMENTS
// ==========================
const scrollTopBtn = document.getElementById("scrollTopBtn");
const progressBar = document.getElementById("progressBar");
const themeToggle = document.getElementById("themeToggle");
const navLinks = document.querySelectorAll(".nav-links a");
const navLinksContainer = document.querySelector(".nav-links");

// ==========================
// SCROLL EVENTS
// ==========================
window.addEventListener("scroll", () => {
  handleScrollTopButton();
  handleProgressBar();
  highlightActiveSection();
});

// ==========================
// SCROLL TO TOP
// ==========================
function handleScrollTopButton() {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ==========================
// SCROLL PROGRESS BAR
// ==========================
function handleProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
}

// ==========================
// DARK MODE TOGGLE
// ==========================
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Change icon
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";

  // Save preference
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// ==========================
// SMOOTH NAVIGATION SCROLL
// ==========================
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth"
    });

    // Close mobile menu after click
    navLinksContainer.classList.remove("active");
  });
});

// ==========================
// ACTIVE LINK HIGHLIGHT
// ==========================
function highlightActiveSection() {
  let currentSection = "";

  document.querySelectorAll("section").forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

// ==========================
// MOBILE MENU TOGGLE
// ==========================
const menuBtn = document.createElement("button");
menuBtn.className = "menu-toggle";
menuBtn.textContent = "☰";
document.querySelector("nav").prepend(menuBtn);

menuBtn.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
});
