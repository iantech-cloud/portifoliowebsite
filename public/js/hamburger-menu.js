/**
 * Hamburger Menu Controller
 * Handles mobile navigation menu functionality
 */

class HamburgerMenu {
  constructor() {
    this.isOpen = false
    this.isAnimating = false

    // DOM elements
    this.hamburgerBtn = null
    this.overlay = null
    this.mobileMenu = null
    this.closeBtn = null
    this.body = document.body
    this.menuItems = []

    // Initialize when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init())
    } else {
      this.init()
    }
  }

  /**
   * Initialize the hamburger menu
   */
  init() {
    this.findElements()
    this.bindEvents()
    this.setupAccessibility()

    console.log("🍔 Hamburger menu initialized")
  }

  /**
   * Find and cache DOM elements
   */
  findElements() {
    this.hamburgerBtn = document.querySelector(".hamburger-menu")
    this.overlay = document.querySelector(".mobile-nav-overlay")
    this.mobileMenu = document.querySelector(".mobile-nav-menu")
    this.closeBtn = document.querySelector(".mobile-nav-close")
    this.menuItems = document.querySelectorAll(".mobile-nav-item")

    // Validate required elements
    if (!this.hamburgerBtn || !this.overlay || !this.mobileMenu) {
      console.warn("⚠️ Hamburger menu elements not found")
      return false
    }

    return true
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (!this.findElements()) return

    // Hamburger button click
    this.hamburgerBtn.addEventListener("click", (e) => {
      e.preventDefault()
      this.toggle()
    })

    // Close button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", (e) => {
        e.preventDefault()
        this.close()
      })
    }

    // Overlay click
    this.overlay.addEventListener("click", () => {
      this.close()
    })

    // Menu item clicks
    this.menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.close()
      })
    })

    // Keyboard events
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close()
      }
    })

    // Window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768 && this.isOpen) {
        this.close()
      }
    })

    // Prevent scroll on touch devices when menu is open
    this.mobileMenu.addEventListener("touchmove", (e) => {
      e.stopPropagation()
    })

    this.overlay.addEventListener("touchmove", (e) => {
      if (this.isOpen) {
        e.preventDefault()
      }
    })
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    if (!this.hamburgerBtn) return

    // ARIA attributes
    this.hamburgerBtn.setAttribute("aria-label", "Toggle navigation menu")
    this.hamburgerBtn.setAttribute("aria-expanded", "false")
    this.hamburgerBtn.setAttribute("aria-controls", "mobile-navigation")

    if (this.mobileMenu) {
      this.mobileMenu.setAttribute("id", "mobile-navigation")
      this.mobileMenu.setAttribute("role", "navigation")
      this.mobileMenu.setAttribute("aria-label", "Mobile navigation")
    }
  }

  /**
   * Toggle menu open/close
   */
  toggle() {
    if (this.isAnimating) return

    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  /**
   * Open the menu
   */
  open() {
    if (this.isOpen || this.isAnimating) return

    this.isAnimating = true
    this.isOpen = true

    // Update classes
    this.hamburgerBtn.classList.add("active")
    this.overlay.classList.add("active")
    this.mobileMenu.classList.add("active")
    this.body.classList.add("menu-open")

    // Update ARIA
    this.hamburgerBtn.setAttribute("aria-expanded", "true")

    // Focus management
    this.trapFocus()

    // Animation complete
    setTimeout(() => {
      this.isAnimating = false
    }, 300)

    // Dispatch custom event
    this.dispatchEvent("menuOpen")
  }

  /**
   * Close the menu
   */
  close() {
    if (!this.isOpen || this.isAnimating) return

    this.isAnimating = true
    this.isOpen = false

    // Update classes
    this.hamburgerBtn.classList.remove("active")
    this.overlay.classList.remove("active")
    this.mobileMenu.classList.remove("active")
    this.body.classList.remove("menu-open")

    // Update ARIA
    this.hamburgerBtn.setAttribute("aria-expanded", "false")

    // Return focus to hamburger button
    this.hamburgerBtn.focus()

    // Animation complete
    setTimeout(() => {
      this.isAnimating = false
    }, 300)

    // Dispatch custom event
    this.dispatchEvent("menuClose")
  }

  /**
   * Trap focus within the menu
   */
  trapFocus() {
    const focusableElements = this.mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus first element
    setTimeout(() => {
      firstElement.focus()
    }, 100)

    // Handle tab navigation
    const handleTabKey = (e) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Add tab listener
    this.mobileMenu.addEventListener("keydown", handleTabKey)

    // Remove listener when menu closes
    const removeTabListener = () => {
      this.mobileMenu.removeEventListener("keydown", handleTabKey)
      document.removeEventListener("menuClose", removeTabListener)
    }

    document.addEventListener("menuClose", removeTabListener)
  }

  /**
   * Dispatch custom events
   */
  dispatchEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: { isOpen: this.isOpen },
    })
    document.dispatchEvent(event)
  }

  /**
   * Update active menu item
   */
  updateActiveItem(currentPath) {
    this.menuItems.forEach((item) => {
      const href = item.getAttribute("href")
      if (href === currentPath) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  }

  /**
   * Destroy the menu (cleanup)
   */
  destroy() {
    if (this.isOpen) {
      this.close()
    }

    // Remove event listeners would go here
    // This is a simplified version
    console.log("🍔 Hamburger menu destroyed")
  }
}

// Initialize hamburger menu
const hamburgerMenu = new HamburgerMenu()

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = HamburgerMenu
}

// Global access
window.HamburgerMenu = hamburgerMenu
