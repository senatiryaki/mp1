// Navbar + smooth scrolling
// --------------------
const navbar = document.querySelector("#navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(
  "#home, #about, #skills, #projects, #experience, #media, #contact",
);

// Smooth scroll for links that point to sections on this page
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Navbar resizing and position indicator
function updateNavbar() {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  let currentSection = "home";
  const navbarHeight = navbar.offsetHeight;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= navbarHeight + 1) {
      currentSection = section.id;
    }
  });

  // Make sure Contact is highlighted at the bottom
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (atBottom) {
    currentSection = "contact";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();

// Carousel
// --------------------
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let currentSlide = 0;

function showSlide() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

nextButton.addEventListener("click", () => {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide();
});

previousButton.addEventListener("click", () => {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide();
});

// Modals
// --------------------
const modalButtons = document.querySelectorAll(".modal-trigger");
const modals = document.querySelectorAll(".modal");

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(`#${button.dataset.modal}`);

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelectorAll(".modal-close").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });
});

// Close modal when clicking outside the modal content
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
