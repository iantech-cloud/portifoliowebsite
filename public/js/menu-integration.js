/**
 * Menu Integration Script
 * Handles integration between hamburger menu and other site functionality
 */

// Declare gtag variable to fix lint/correctness/noUndeclaredVariables error
window.gtag =
  window.gtag ||
  (() => {
    /* gtag placeholder */
  })

document.addEventListener("DOMContentLoaded", () => {
  // Menu event listeners
  document.addEventListener("menuOpen", (e) => {
    console.log("📱 Mobile menu opened")

    // Pause any auto-playing content
    const videos = document.querySelectorAll("video[autoplay]")
    videos.forEach((video) => video.pause())

    // Track analytics if available
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "mobile_menu_open", {
        event_category: "navigation",
        event_label: "hamburger_menu",
      })
    }
  })

  document.addEventListener("menuClose", (e) => {
    console.log("📱 Mobile menu closed")

    // Resume auto-playing content
    const videos = document.querySelectorAll("video[autoplay]")
    videos.forEach((video) => video.play().catch(() => {}))

    // Track analytics if available
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "mobile_menu_close", {
        event_category: "navigation",
        event_label: "hamburger_menu",
      })
    }
  })

  // Handle form submissions when menu is open
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", () => {
      if (window.HamburgerMenu && window.HamburgerMenu.isOpen) {
        window.HamburgerMenu.close()
      }
    })
  })

  // Handle smooth scrolling for anchor links
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (link) {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Close menu if open
        if (window.HamburgerMenu && window.HamburgerMenu.isOpen) {
          window.HamburgerMenu.close()
        }

        // Smooth scroll to target
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 300)
      }
    }
  })

  // Update menu state on page navigation (for SPAs)
  window.addEventListener("popstate", () => {
    if (window.HamburgerMenu) {
      window.HamburgerMenu.updateActiveItem(window.location.pathname)
    }
  })

  // Handle orientation change
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      if (window.HamburgerMenu && window.HamburgerMenu.isOpen) {
        // Recalculate menu position if needed
        const mobileMenu = document.querySelector(".mobile-nav-menu")
        if (mobileMenu) {
          mobileMenu.style.height = window.innerHeight + "px"
        }
      }
    }, 100)
  })

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Alt + M to toggle menu
    if (e.altKey && e.key === "m") {
      e.preventDefault()
      if (window.HamburgerMenu) {
        window.HamburgerMenu.toggle()
      }
    }
  })
})

// Utility functions for menu integration
window.MenuUtils = {
  /**
   * Programmatically open the menu
   */
  openMenu: () => {
    if (window.HamburgerMenu) {
      window.HamburgerMenu.open()
    }
  },

  /**
   * Programmatically close the menu
   */
  closeMenu: () => {
    if (window.HamburgerMenu) {
      window.HamburgerMenu.close()
    }
  },

  /**
   * Check if menu is currently open
   */
  isMenuOpen: () => (window.HamburgerMenu ? window.HamburgerMenu.isOpen : false),

  /**
   * Update active menu item
   */
  updateActiveItem: (path) => {
    if (window.HamburgerMenu) {
      window.HamburgerMenu.updateActiveItem(path)
    }
  },
}
