// Theme Configuration
const THEMES = {
  DARK: "dark",
  LIGHT: "light",
}

// Theme Toggle Functionality
class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || THEMES.DARK
    this.toggleButton = document.getElementById("theme-toggle")
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.applyTheme(this.currentTheme)
  }

  setupEventListeners() {
    // Click event for toggle button
    this.toggleButton.addEventListener("click", () => {
      this.toggleTheme()
    })

    // Hover effects
    this.toggleButton.addEventListener("mouseenter", () => {
      this.toggleButton.style.transform = "translateY(-3px) scale(1.1)"
      this.toggleButton.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)"
    })

    this.toggleButton.addEventListener("mouseleave", () => {
      this.toggleButton.style.transform = "translateY(0) scale(1)"
      this.toggleButton.style.boxShadow = "none"
    })

    // Keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "T") {
        e.preventDefault()
        this.toggleTheme()
      }
    })
  }

  toggleTheme() {
    const newTheme = this.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK

    // Add rotation animation to button
    this.toggleButton.classList.add("rotating")
    setTimeout(() => {
      this.toggleButton.classList.remove("rotating")
    }, 500)

    // Add smooth transition
    document.body.style.transition = "all 0.3s ease"

    this.applyTheme(newTheme)

    // Remove transition after animation
    setTimeout(() => {
      document.body.style.transition = ""
    }, 300)
  }

  applyTheme(theme) {
    // Update data attribute on html element
    document.documentElement.setAttribute("data-theme", theme)

    // Update toggle button icon
    this.updateToggleIcon(theme)

    // Save theme to localStorage
    localStorage.setItem("theme", theme)
    this.currentTheme = theme
  }

  updateToggleIcon(theme) {
    const toggleIcon = this.toggleButton.querySelector("i")
    if (theme === THEMES.LIGHT) {
      toggleIcon.className = "fas fa-sun"
      toggleIcon.style.color = "#f39c12"
    } else {
      toggleIcon.className = "fas fa-moon"
      toggleIcon.style.color = ""
    }
  }

  // Public method to get current theme
  getCurrentTheme() {
    return this.currentTheme
  }

  // Public method to set theme programmatically
  setTheme(theme) {
    if (Object.values(THEMES).includes(theme)) {
      this.applyTheme(theme)
    }
  }
}

// Particle Animation
function createParticles() {
  const particlesContainer = document.querySelector(".particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 20 + "s"
    particle.style.animationDuration = Math.random() * 10 + 10 + "s"
    particlesContainer.appendChild(particle)
  }
}

// Smooth Scrolling
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Navigation Active State
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]")
  const navItems = document.querySelectorAll(".nav-item")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("href") === "#" + current) {
      item.classList.add("active")
    }
  })
}

// Scroll Reveal Animation
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active")
    }
  })
}

// Form Submission
function setupFormSubmission() {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simple form validation and success message
      const btn = this.querySelector('button[type="submit"]')
      const originalText = btn.innerHTML

      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      btn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
        btn.style.background = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"

        setTimeout(() => {
          btn.innerHTML = originalText
          btn.disabled = false
          btn.style.background = ""
          this.reset()
        }, 2000)
      }, 1500)
    })
  }
}

// Typing Animation for Hero Title
function typeWriter() {
  const title = document.querySelector(".hero-title")
  if (!title) return

  const text = "Dharani Dharan"
  title.innerHTML = ""

  let i = 0
  function type() {
    if (i < text.length) {
      title.innerHTML += text.charAt(i)
      i++
      setTimeout(type, 100)
    }
  }

  setTimeout(type, 1000)
}

// Add hover effects to project cards
function addProjectHoverEffects() {
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) rotateY(5deg)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateY(0)"
    })
  })
}

// Add floating animation to skill categories
function addSkillFloatingEffect() {
  const skillCategories = document.querySelectorAll(".skill-category")
  skillCategories.forEach((category, index) => {
    category.style.animationDelay = `${index * 0.2}s`
  })
}

// Enhanced mouse trail with theme awareness
function createEnhancedMouseTrail() {
  const mouseTrail = []
  const trailLength = 20

  document.addEventListener("mousemove", (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY })

    if (mouseTrail.length > trailLength) {
      mouseTrail.shift()
    }

    // Create or update trail elements
    mouseTrail.forEach((point, index) => {
      let trailElement = document.getElementById(`trail-${index}`)

      if (!trailElement) {
        trailElement = document.createElement("div")
        trailElement.id = `trail-${index}`
        trailElement.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 0.1s ease;
                `
        document.body.appendChild(trailElement)
      }

      const opacity = (index + 1) / trailLength
      const currentTheme = localStorage.getItem("theme") || "dark"

      if (currentTheme === "light") {
        trailElement.style.background = `rgba(102, 126, 234, ${opacity * 0.8})`
      } else {
        trailElement.style.background = `rgba(102, 126, 234, ${opacity})`
      }

      trailElement.style.left = point.x + "px"
      trailElement.style.top = point.y + "px"
    })
  })
}

// Add interactive elements hover effects
function addInteractiveEffects() {
  const interactiveElements = document.querySelectorAll(".btn, .social-link, .project-link, .nav-item")
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
    })

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// System Preference Detection
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return THEMES.DARK
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return THEMES.LIGHT
  }
  return THEMES.DARK // Default fallback
}

// Initialize everything when page loads
window.addEventListener("load", () => {
  // Initialize theme toggle
  const themeToggle = new ThemeToggle()

  // Make theme toggle globally accessible
  window.themeToggle = themeToggle

  // Create particles
  createParticles()

  // Setup smooth scrolling
  setupSmoothScrolling()

  // Setup form submission
  setupFormSubmission()

  // Type writer effect
  typeWriter()

  // Add project hover effects
  addProjectHoverEffects()

  // Add skill floating effects
  addSkillFloatingEffect()

  // Reveal elements on scroll
  revealOnScroll()

  // Create mouse trail
  createEnhancedMouseTrail()

  // Add interactive effects
  addInteractiveEffects()

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme-user-set")) {
        const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT
        themeToggle.setTheme(newTheme)
      }
    })
  }
})

// Event listeners
window.addEventListener("scroll", () => {
  updateActiveNav()
  revealOnScroll()
})

// Utility functions for external use
const ThemeUtils = {
  // Reset to system theme
  resetToSystemTheme() {
    const systemTheme = detectSystemTheme()
    localStorage.removeItem("theme-user-set")
    if (window.themeToggle) {
      window.themeToggle.setTheme(systemTheme)
    }
  },

  // Get current theme
  getCurrentTheme() {
    return window.themeToggle ? window.themeToggle.getCurrentTheme() : localStorage.getItem("theme") || THEMES.DARK
  },
}

// Export for potential external use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ThemeToggle, ThemeUtils, THEMES }
}
