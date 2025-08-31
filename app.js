// Theme Configuration
const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

// Theme Toggle Functionality
class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || THEMES.DARK;
    this.toggleButton = document.getElementById("theme-toggle");
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyTheme(this.currentTheme);
  }

  setupEventListeners() {
    this.toggleButton.addEventListener("click", () => {
      this.toggleTheme();
    });

    this.toggleButton.addEventListener("mouseenter", () => {
      this.toggleButton.style.transform = "translateY(-3px) scale(1.1)";
      this.toggleButton.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
    });

    this.toggleButton.addEventListener("mouseleave", () => {
      this.toggleButton.style.transform = "translateY(0) scale(1)";
      this.toggleButton.style.boxShadow = "none";
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

    this.toggleButton.classList.add("rotating");
    setTimeout(() => {
      this.toggleButton.classList.remove("rotating");
    }, 500);

    document.body.style.transition = "all 0.3s ease";
    this.applyTheme(newTheme);

    setTimeout(() => {
      document.body.style.transition = "";
    }, 300);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.updateToggleIcon(theme);
    localStorage.setItem("theme", theme);
    this.currentTheme = theme;
  }

  updateToggleIcon(theme) {
    const toggleIcon = this.toggleButton.querySelector("i");
    if (theme === THEMES.LIGHT) {
      toggleIcon.className = "fas fa-sun";
      toggleIcon.style.color = "#f39c12";
    } else {
      toggleIcon.className = "fas fa-moon";
      toggleIcon.style.color = "";
    }
  }
}

// Particle Animation
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Smooth Scrolling
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Navigation Active State
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === "#" + current) {
      item.classList.add("active");
    }
  });
}

// Scroll Reveal Animation
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

// Form Submission
function setupFormSubmission() {
  const form = document.getElementById('contactForm');
  const result = document.getElementById('result');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      result.style.display = "block";
      result.className = "loading";
      result.innerHTML = "Please wait...";

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.className = "success";
            result.innerHTML = json.message;
          } else {
            result.className = "error";
            result.innerHTML = json.message;
          }
        })
        .catch(error => {
          result.className = "error";
          result.innerHTML = "Something went wrong!";
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 5000);
        });
    });
  }
}

// Initialize everything when page loads
window.addEventListener("load", () => {
  const themeToggle = new ThemeToggle();
  window.themeToggle = themeToggle;

  createParticles();
  setupSmoothScrolling();
  setupFormSubmission();
  revealOnScroll();
});

// Event listeners
window.addEventListener("scroll", () => {
  updateActiveNav();
  revealOnScroll();
});