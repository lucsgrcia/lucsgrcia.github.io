function initSmoothScroll() {
  const linksInternos = document.querySelectorAll(
    ".js-menu a[href^='#'], .js-tabmenu a[href^='#']"
  );

  if (linksInternos.length) {
    function scrollToSection(event) {
      event.preventDefault();
      const href = event.currentTarget.getAttribute("href");
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    linksInternos.forEach((element) => {
      element.addEventListener("click", scrollToSection);
    });
  }
}

function initTabNav() {
  const tabMenu = document.querySelectorAll(".js-tabmenu a");
  const tabContent = document.querySelectorAll(".js-tabcontent");

  if (tabMenu.length && tabContent.length) {
    function activateTab(index) {
      tabContent.forEach((section) => section.classList.remove("ativo"));
      tabContent[index].classList.add("ativo");
    }

    function activateTabByHash(hash) {
      if (!hash) return false;
      const target = document.querySelector(hash);
      if (!target || !target.classList.contains("js-tabcontent")) return false;
      tabContent.forEach((section) => section.classList.remove("ativo"));
      target.classList.add("ativo");
      return true;
    }

    const openedByHash = activateTabByHash(window.location.hash);
    if (!openedByHash) {
      activateTab(0);
    }

    tabMenu.forEach((link, index) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        activateTab(index);
        const href = link.getAttribute("href");
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

function initAnimationScroll() {
  const sections = document.querySelectorAll(".js-scroll");

  if (sections.length) {
    const halfWindow = window.innerHeight * 0.6;

    function animationScroll() {
      sections.forEach((element) => {
        const sectionTop = element.getBoundingClientRect().top - halfWindow < 0;
        if (sectionTop) {
          element.classList.add("ativo");
        } else {
          element.classList.remove("ativo");
        }
      });
    }

    animationScroll();
    window.addEventListener("scroll", animationScroll);
  }
}

initSmoothScroll();
initTabNav();
initAnimationScroll();