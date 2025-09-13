// ===================== NAVEGAÇÃO SUAVE =====================
document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling para links internos
    const navLinks = document.querySelectorAll('a[href^="#"]')
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80 // Compensar navbar
  
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  
    // ===================== NAVBAR SCROLL EFFECT =====================
    const navbar = document.querySelector(".navbar")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(26, 26, 26, 0.98)"
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
      } else {
        navbar.style.background = "rgba(26, 26, 26, 0.95)"
        navbar.style.boxShadow = "none"
      }
    })
  
    // ===================== ANIMAÇÕES DE SCROLL =====================
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)
  
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
      ".manifesto-card, .quote-card, .chapter-card, .testimonial-card, .author-content",
    )
  
    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      observer.observe(el)
    })
  
    // ===================== EFEITO PARALLAX SUAVE =====================
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".book-glow")
  
      parallaxElements.forEach((element) => {
        const speed = 0.5
        element.style.transform = `translateY(${scrolled * speed}px)`
      })
    })
  
    // ===================== CONTADOR DE SCROLL =====================
    const sections = document.querySelectorAll("section[id]")
    const navItems = document.querySelectorAll(".navbar-nav .nav-link")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight
  
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${current}`) {
          item.classList.add("active")
        }
      })
    })
  
    // ===================== LOADING ANIMATION =====================
    window.addEventListener("load", () => {
      document.body.style.opacity = "1"
      document.body.style.transform = "translateY(0)"
    })
  
    // ===================== MOBILE MENU =====================
    const navbarToggler = document.querySelector(".navbar-toggler")
    const navbarCollapse = document.querySelector(".navbar-collapse")
  
    if (navbarToggler && navbarCollapse) {
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth < 992) {
            navbarCollapse.classList.remove("show")
          }
        })
      })
    }
  
    // ===================== BOOK HOVER EFFECT =====================
    const bookMockup = document.querySelector(".book-mockup")
  
    if (bookMockup) {
      bookMockup.addEventListener("mouseenter", function () {
        this.style.transform = "perspective(1000px) rotateY(-10deg) rotateX(2deg) scale(1.05)"
      })
  
      bookMockup.addEventListener("mouseleave", function () {
        this.style.transform = "perspective(1000px) rotateY(-15deg) rotateX(5deg) scale(1)"
      })
    }
  
    // ===================== PERFORMANCE OPTIMIZATION =====================
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[src*="placeholder"]')
  
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.style.opacity = "0"
          img.style.transition = "opacity 0.5s ease"
  
          setTimeout(() => {
            img.style.opacity = "1"
          }, 100)
  
          observer.unobserve(img)
        }
      })
    })
  
    images.forEach((img) => imageObserver.observe(img))
  })
  
  // ===================== UTILITÁRIOS =====================
  // Função para debounce (otimização de performance)
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  // Aplicar debounce ao scroll
  const debouncedScroll = debounce(() => {
    // Código de scroll otimizado aqui se necessário
  }, 10)
  
  window.addEventListener("scroll", debouncedScroll)
  
  // ===================== ANALYTICS E TRACKING =====================
  // Tracking de cliques nos botões CTA
  document.querySelectorAll(".btn-primary, .btn-outline").forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent.trim()
      console.log(`Botão clicado: ${buttonText}`)
  
      // Aqui pode adicionar código para Google Analytics, Facebook Pixel, etc.
      // gtag('event', 'click', {
      //     event_category: 'CTA',
      //     event_label: buttonText
      // });
    })
  })
  
  // ===================== ACESSIBILIDADE =====================
  // Melhorar navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  })
  
  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
  })
  
  // Adicionar estilos para navegação por teclado
  const style = document.createElement("style")
  style.textContent = `
      .keyboard-navigation *:focus {
          outline: 2px solid var(--primary-gold) !important;
          outline-offset: 2px;
      }
  `
  document.head.appendChild(style)
  