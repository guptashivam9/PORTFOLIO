
$(document).ready(() => {
  // Sticky header on scroll
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky")
    } else {
      $(".header-area").removeClass("sticky")
    }

    // Update active link in navbar
    updateActiveSection()
  })

  // Smooth scroll and close menu on link click
  $(".header ul li a").on("click", function (e) {
    e.preventDefault()

    const target = $(this).attr("href")
    const offset = target === "#home" ? 0 : $(target).offset().top - 40

    $("html, body").animate({ scrollTop: offset }, 500)

    // Close mobile menu
    if ($(window).width() <= 767) {
      $("#navMenu").removeClass("active")
      $("#openmenu").show()
      $("#closemenu").hide()
    }

    // DO NOT add .active here — let scroll handler do it
  })

  // ScrollReveal animations - ONLY apply to desktop
  if ($(window).width() > 767) {
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200,
    })

    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" })
    ScrollReveal().reveal(".header ul", { origin: "right" })
    ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" })
    ScrollReveal().reveal(".projects, .contact", { origin: "bottom" })
  } else {
    // For mobile - ScrollReveal without header ul
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200,
    })

    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" })
    ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" })
    ScrollReveal().reveal(".projects, .contact", { origin: "bottom" })
  }
})

// Menu toggle logic
const openMenu = document.getElementById("openmenu")
const closeMenu = document.getElementById("closemenu")
const navMenu = document.getElementById("navMenu")

openMenu.addEventListener("click", () => {
  navMenu.classList.add("active")
  openMenu.style.display = "none"
  closeMenu.style.display = "block"

  // AGGRESSIVE FIX: Force immediate visibility
  navMenu.style.opacity = "1"
  navMenu.style.visibility = "visible"
  navMenu.style.transform = "none"

  // Force all menu items to be visible immediately
  const menuItems = navMenu.querySelectorAll("li")
  menuItems.forEach((item) => {
    item.style.opacity = "1"
    item.style.visibility = "visible"
    item.style.transform = "none"
    item.style.display = "block"
  })

  // Force all links to be visible
  const menuLinks = navMenu.querySelectorAll("a")
  menuLinks.forEach((link) => {
    link.style.opacity = "1"
    link.style.visibility = "visible"
    link.style.transform = "none"
  })

  // Remove any ScrollReveal classes that might be hiding elements
  navMenu.classList.remove("sr-reveal")
  menuItems.forEach((item) => {
    item.classList.remove("sr-reveal")
  })
  menuLinks.forEach((link) => {
    link.classList.remove("sr-reveal")
  })
})

closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("active")
  openMenu.style.display = "block"
  closeMenu.style.display = "none"
})

// Active section updater (scroll-based)
function updateActiveSection() {
  // Don't run if mobile menu is open
  if ($(".navbar").hasClass("active") && $(window).width() <= 767) return

  const scrollPosition = $(window).scrollTop()

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active")
    $(".header ul li a[href='#home']").addClass("active")
    return
  }

  $("section").each(function () {
    const target = $(this).attr("id")
    const offset = $(this).offset().top
    const height = $(this).outerHeight()

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active")
      $(".header ul li a[href='#" + target + "']").addClass("active")
    }
  })
}
