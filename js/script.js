// ===================================
//  Portfolio Website - JavaScript
// ===================================
// // Navbar Scroll Effect
// const navbar = document.getElementById("navbar");
// let lastScroll = 0;

// window.addEventListener("scroll", () => {
//   const currentScroll = window.pageYOffset;

//   if (currentScroll > 50) {
//     navbar.classList.add("scrolled");
//   } else {
//     navbar.classList.remove("scrolled");
//   }

//   lastScroll = currentScroll;
// });

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function activateNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", activateNavLink);

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// Circular Progress Bar Animation for New Skills Section
const skillCardsNew = document.querySelectorAll(".skill-card-new");

const circularSkillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        const circle = entry.target.querySelector(".skill-circle");
        const percentage = circle.getAttribute("data-percentage");

        // Set CSS variable for the animation
        circle.style.setProperty("--percentage", percentage);

        // Animate percentage number
        const percentageElement = entry.target.querySelector(
          ".skill-percentage-new",
        );
        let currentPercentage = 0;
        const targetPercentage = parseInt(percentage);
        const duration = 2000; // 2 seconds
        const increment = targetPercentage / (duration / 16); // 60fps

        const animatePercentage = () => {
          currentPercentage += increment;
          if (currentPercentage < targetPercentage) {
            percentageElement.textContent = Math.floor(currentPercentage) + "%";
            requestAnimationFrame(animatePercentage);
          } else {
            percentageElement.textContent = targetPercentage + "%";
          }
        };

        animatePercentage();
      }
    });
  },
  { threshold: 0.3 },
);

skillCardsNew.forEach((card) => {
  circularSkillObserver.observe(card);
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Validate form
    if (!validateForm(formData)) {
      showMessage("Please fill in all fields correctly.", "error");
      return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    btnText.style.display = "none";
    btnLoading.style.display = "block";
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    try {
      await simulateFormSubmission(formData);
      showMessage(
        "Thank you! Your message has been sent successfully.",
        "success",
      );
      contactForm.reset();
    } catch (error) {
      showMessage("Oops! Something went wrong. Please try again.", "error");
    } finally {
      btnText.style.display = "block";
      btnLoading.style.display = "none";
      submitBtn.disabled = false;
    }
  });
}

function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name || data.name.trim().length < 2) {
    return false;
  }

  if (!emailRegex.test(data.email)) {
    return false;
  }

  if (!data.subject || data.subject.trim().length < 3) {
    return false;
  }

  if (!data.message || data.message.trim().length < 10) {
    return false;
  }

  return true;
}

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = "block";

  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
}

function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful submission (90% success rate)
      if (Math.random() > 0.1) {
        console.log("Form submitted:", data);
        resolve();
      } else {
        reject(new Error("Submission failed"));
      }
    }, 2000);
  });
}

// Real form submission (uncomment and configure when ready)
/*
async function submitFormToServer(data) {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}
*/

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero && scrolled < window.innerHeight) {
    const parallaxElements = hero.querySelectorAll(".hero-text, .hero-image");
    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// Project Card Hover Animation Enhancement
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Project Filtering Functionality
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCardsAll = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    // Get filter value
    const filterValue = btn.getAttribute("data-filter");

    // Filter projects
    projectCardsAll.forEach((card) => {
      if (filterValue === "all") {
        card.classList.remove("filtered-out");
      } else {
        const categories = card.getAttribute("data-category");
        if (categories.includes(filterValue)) {
          card.classList.remove("filtered-out");
        } else {
          card.classList.add("filtered-out");
        }
      }
    });
  });
});

// Remove any saved theme preference from localStorage
localStorage.removeItem("theme");

// Typing Animation Effect
const typingText = document.querySelector(".typing-text");

if (typingText) {
  const words = [
    "Frontend Developer",
    "Web Developer",
    "UI Developer",
    "React Developer",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing animation
  type();
}

// Copy to Clipboard Function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      // Success - show feedback
      const copyBtn = event.target.closest(".copy-btn");
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="bx bx-check"></i> Copied!';
      copyBtn.style.background = "var(--success-color)";
      copyBtn.style.color = "white";
      copyBtn.style.borderColor = "var(--success-color)";

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = "transparent";
        copyBtn.style.color = "var(--primary-color)";
        copyBtn.style.borderColor = "var(--primary-color)";
      }, 2000);
    },
    function (err) {
      console.error("Could not copy text: ", err);
      alert("Failed to copy to clipboard");
    },
  );
}

// Console Message
console.log(
  "%c👋 Hello Developer!",
  "font-size: 20px; color: #6366f1; font-weight: bold;",
);
console.log(
  "%cInterested in the code? Check out my GitHub!",
  "font-size: 14px; color: #64748b;",
);
console.log(
  "%chttps://github.com/vikashkakodiya",
  "font-size: 14px; color: #6366f1;",
);

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio website initialized successfully! ✅");

  // Add initial animations
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 968) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  }, 250);
});

// Prevent default behavior for download link if file doesn't exist
document.querySelectorAll("a[download]").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#" || href.includes("resume.pdf")) {
      e.preventDefault();
      alert(
        "Resume download will be available soon! Please contact me directly.",
      );
    }
  });
});

const revealElements = document.querySelectorAll(".skill-card, .project-card");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 50);
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(element);
});

// Staggered animation for project cards
const projectCardsAnim = document.querySelectorAll(".project-card");
projectCardsAnim.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Custom Cursor Logic
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

if (cursorDot && cursorOutline) {
  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows cursor instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay for smooth effect
    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" },
    );
  });

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, select, .filter-btn, .skill-card-new, .project-card, .social-icon-circle",
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("hovering");
    });

    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("hovering");
    });
  });
}
