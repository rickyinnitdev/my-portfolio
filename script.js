document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. REVEAL ANIMATIONS --- */
  const revealElements = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* --- 2. MOBILE MENU --- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
    });
  }

  /* --- 3. DYNAMIC YEAR --- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* --- 4. SMOOTH SCROLL --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  /* --- 5. MODAL LOGIC --- */
  const modal = document.getElementById("projectModal");
  const closeModal = document.querySelector(".close-modal");

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

/* --- DATA FOR SOFTWARE PROJECTS (Multi-Image Galleries) --- */
const softwareData = {
  beltei: {
    title: "BELTEI International University Website",
    images: [
      "porfolio_images/60.png",
      "porfolio_images/61.png",
      "porfolio_images/62.png",
      "porfolio_images/63.png",
      "porfolio_images/64.png",
    ],
    badges: ["React JS", "Web Design"],
    desc: "A responsive university website. Includes pages for faculties, student activities, organizational charts, and admissions.",
  },
  cafe: {
    title: "Online Cafe E-Commerce",
    images: [
      "porfolio_images/66.png",
      "porfolio_images/67.png",
      "porfolio_images/68.png",
      "porfolio_images/69.png",
    ],
    badges: ["React JS", "SQL"],
    desc: "A full-stack web application serving both consumers and business owners. Features a user-friendly ordering UI and a comprehensive admin dashboard.",
  },
  stock: {
    title: "Stock Management System",
    images: [
      "porfolio_images/74.png",
      "porfolio_images/75.png",
      "porfolio_images/76.png",
      "porfolio_images/77.png",
      "porfolio_images/78.png",
      
    ],
    badges: ["C# .NET", "SQL Server"],
    desc: "A robust Windows Forms desktop application designed for efficient inventory control. Secure data handling, purchase tracking, and sales reporting.",
  },
  pcshop: {
    title: "PC Shop Admin Dashboard",
    images: [
      "porfolio_images/70.png",
      "porfolio_images/71.png",
      "porfolio_images/72.png",
      "porfolio_images/73.png",
    ],
    badges: ["PHP", "MySQL"],
    desc: "An administrative web panel for an electronics store. Provides visualization for total earnings, product inventory management, and recent sales.",
  },
};

/* --- SLIDESHOW STATE --- */
let currentImages = [];
let currentIndex = 0;

/* --- OPEN SOFTWARE MODAL --- */
function openModal(projectId) {
  const modal = document.getElementById("projectModal");
  const data = softwareData[projectId];

  if (data) {
    // Init Slideshow
    currentImages = data.images;
    currentIndex = 0;
    updateModalImage();

    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalDesc").textContent = data.desc;

    // Badges
    const badgeContainer = document.getElementById("modalBadges");
    badgeContainer.innerHTML = "";
    data.badges.forEach((badge) => {
      let span = document.createElement("span");
      span.className = "badge";
      span.style.background = "#0F2C59";
      span.style.color = "white";
      span.style.marginRight = "5px";
      span.innerText = badge;
      badgeContainer.appendChild(span);
    });

    // Show navigation buttons only if multiple images
    document.querySelector(".prev-btn").style.display =
      currentImages.length > 1 ? "block" : "none";
    document.querySelector(".next-btn").style.display =
      currentImages.length > 1 ? "block" : "none";

    modal.style.display = "flex";
  }
}

/* --- OPEN DESIGN SHOWCASE MODAL (Matches Your CSS Request) --- */
function openDesignModal(imgSrc, title, desc) {
  const modal = document.getElementById("projectModal");

  // Single image setup
  currentImages = [imgSrc];
  currentIndex = 0;
  updateModalImage();

  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDesc").textContent = desc;
  document.getElementById("modalBadges").innerHTML = "";

  // Hide nav buttons for single design image
  document.querySelector(".prev-btn").style.display = "none";
  document.querySelector(".next-btn").style.display = "none";

  modal.style.display = "flex";
}

/* --- SLIDE NAVIGATION --- */
function changeSlide(direction) {
  currentIndex += direction;

  // Loop
  if (currentIndex >= currentImages.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = currentImages.length - 1;
  }

  updateModalImage();
}

function updateModalImage() {
  const imgElement = document.getElementById("modalImage");
  imgElement.src = currentImages[currentIndex];

  // Update counter text
  const counter = document.getElementById("imageCounter");
  if (currentImages.length > 1) {
    counter.textContent = `Image ${currentIndex + 1} of ${
      currentImages.length
    }`;
  } else {
    counter.textContent = "";
  }
}
