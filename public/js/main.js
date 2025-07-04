document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu functionality
  const hamburgerBtn = document.getElementById("hamburger-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const overlay = document.getElementById("overlay")
  const body = document.body
  const menuLinks = document.querySelectorAll("#mobile-menu a")

  let isMenuOpen = false

  // Toggle menu function
  function toggleMenu() {
    isMenuOpen = !isMenuOpen

    if (isMenuOpen) {
      openMenu()
    } else {
      closeMenu()
    }
  }

  // Open menu function
  function openMenu() {
    hamburgerBtn.classList.add("hamburger-open")
    mobileMenu.classList.add("open")
    overlay.classList.add("open")
    body.classList.add("menu-open")
    hamburgerBtn.setAttribute("aria-expanded", "true")
  }

  // Close menu function
  function closeMenu() {
    hamburgerBtn.classList.remove("hamburger-open")
    mobileMenu.classList.remove("open")
    overlay.classList.remove("open")
    body.classList.remove("menu-open")
    hamburgerBtn.setAttribute("aria-expanded", "false")
    isMenuOpen = false
  }

  // Event listeners
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMenu)
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu)
  }

  // Close menu when clicking on menu links
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu)
  })

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu()
    }
  })

  // Close menu on window resize if desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isMenuOpen) {
      closeMenu()
    }
  })

  // Smooth scrolling for anchor links
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

  // Form validation and enhancement
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const submitBtn = form.querySelector('button[type="submit"]')
      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...'
      }
    })
  })

  // Add loading states to buttons
  const buttons = document.querySelectorAll("button, .btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.type === "submit") {
        this.classList.add("loading")
      }
    })
  })
})
