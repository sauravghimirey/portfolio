document.addEventListener('DOMContentLoaded', function () {
  // Theme Toggler
  const themeToggleBtn = document.querySelector('.theme-toggle-button');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  // Navigation and Hamburger Menu
  const navLinks = document.querySelectorAll('.nav-link, .nav-links a');
  const allSections = document.querySelectorAll('.page-content, .hero');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-links');

  // Toggle hamburger menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Centralized function to show a specific section and update UI
  function showSection(id) {
    // Hide all sections first
    allSections.forEach((sec) => {
      sec.style.display = 'none';
      sec.classList.remove('visible');
    });

    const activeSection = document.getElementById(id);
    if (activeSection) {
      if (id === 'home') {
        activeSection.style.display = 'flex'; // home uses flex layout
      } else {
        activeSection.style.display = 'block';
      }
      activeSection.classList.add('visible');
      window.scrollTo(0, 0); // Scroll to top of the page
    }

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.substring(1) === id) {
        link.classList.add('active');
      }
    });

    // Close menu automatically after clicking a link on mobile
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }

  // Add click events for nav links
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = this.getAttribute('href').substring(1);
      showSection(pageId);
      currentIndex = sections.indexOf(pageId); // Sync swipe index
    });
  });

  // Reveal Animations on Scroll
  const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // Profile Picture Slideshow
  const profileImages = ['images/image1.png', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg'];
  const profilePic = document.getElementById('profile-pic');
  let profilePicIndex = 0;

  function changeProfilePicture() {
    if (!profilePic) return;
    profilePic.style.opacity = 0;
    setTimeout(() => {
      profilePic.src = profileImages[profilePicIndex];
      profilePic.style.opacity = 1;
      profilePicIndex = (profilePicIndex + 1) % profileImages.length;
    }, 500);
  }

  // Preload images
  profileImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  if (profilePic) {
    setInterval(changeProfilePicture, 3000);
  }

  // Typewriter Effect
  const words = ['Student', 'Developer', 'Problem Solver'];
  const typewriter = document.getElementById('typewriter');
  let wordIndex = 0;
  let charIndex = 0;
  let typing = true;

  function type() {
    if (!typewriter) return;
    const currentWord = words[wordIndex];
    if (typing) {
      if (charIndex < currentWord.length) {
        typewriter.textContent += currentWord.charAt(charIndex);
        charIndex++;
        setTimeout(type, 200);
      } else {
        typing = false;
        setTimeout(type, 1000);
      }
    } else {
      if (typewriter.textContent.length > 0) {
        typewriter.textContent = typewriter.textContent.slice(0, -1);
        setTimeout(type, 100);
      } else {
        typing = true;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
        setTimeout(type, 200);
      }
    }
  }
  type();

  // Modal for Certificates
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('certificateImg');
  const closeBtn = document.querySelector('.close');

  document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = btn.getAttribute('data-img');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => (modal.style.display = 'none'));
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // ==== Mobile Swipe Navigation ====
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;

  const sections = ['home', 'resume', 'projects', 'my-edge', 'contact'];
  let currentIndex = sections.indexOf('home'); // Initialize with 'home'

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left (next section, or wrap to home)
        currentIndex = (currentIndex + 1) % sections.length;
      } else {
        // Swipe right (previous section, or wrap to contact)
        currentIndex = (currentIndex - 1 + sections.length) % sections.length;
      }
      showSection(sections[currentIndex]);
    }
  }

  // Show home section initially
  showSection('home');
});