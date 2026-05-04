document.addEventListener('DOMContentLoaded', () => {

  // ── Theme ──
  const themeToggleBtn = document.querySelector('.theme-toggle-button');
  const themeIcon      = document.getElementById('theme-icon');
  const savedTheme     = localStorage.getItem('theme') ||
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }


  // ── Navigation ──
  const navLinks   = document.querySelectorAll('.nav-link, .nav-links a');
  const allSections = document.querySelectorAll('.page-content, .hero');
  const hamburger  = document.querySelector('.hamburger');
  const navMenu    = document.querySelector('.nav-links');
  const sections   = ['home', 'resume', 'projects', 'my-edge', 'contact'];
  let currentIndex = 0;

  hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  function showSection(id) {
    allSections.forEach(sec => {
      sec.style.display = 'none';
      sec.classList.remove('visible');
    });
    const active = document.getElementById(id);
    if (active) {
      active.style.display = id === 'home' ? 'flex' : 'block';
      active.classList.add('visible');
      window.scrollTo(0, 0);
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href')?.substring(1) === id);
    });
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageId = this.getAttribute('href').substring(1);
      showSection(pageId);
      currentIndex = sections.indexOf(pageId);
    });
  });


  // ── Scroll Reveal ──
  const revealOnScroll = () => {
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 150)
        el.classList.add('active');
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();


  // ── Contact Form ──
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
  });


  // ── Profile Slideshow ──
  const profileImages = [
    'images/image1.png', 'images/image7.png', 'images/image2.png',
    'images/image3.png', 'images/image4.png', 'images/image5.png',
    'images/image6.png',
  ];
  const profilePic = document.getElementById('profile-pic');
  let profilePicIndex = 1;

  if (profilePic) {
    profileImages.forEach(src => { new Image().src = src; });
    setInterval(() => {
      profilePic.style.opacity = 0;
      setTimeout(() => {
        profilePic.src = profileImages[profilePicIndex];
        profilePic.style.opacity = 1;
        profilePicIndex = (profilePicIndex + 1) % profileImages.length;
      }, 500);
    }, 3000);
  }


  // ── Typewriter ──
  const words = [
    'Student', 'Problem Solver', 'Tech Enthusiast', 'Developer',
    'Data Explorer', 'Critical Thinker', 'Lifelong Learner', 'Innovative Mind'
  ];
  const typewriter = document.getElementById('typewriter');
  let wordIndex = 0, charIndex = 0, typing = true;

  function type() {
    if (!typewriter) return;
    const word = words[wordIndex];
    if (typing) {
      if (charIndex < word.length) {
        typewriter.textContent += word[charIndex++];
        setTimeout(type, 200);
      } else {
        typing = false;
        setTimeout(type, 1000);
      }
    } else {
      if (typewriter.textContent.length) {
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


  // ── Certificate Modal ──
  const modal    = document.getElementById('imgModal');
  const modalImg = document.getElementById('certificateImg');
  const closeBtn = document.querySelector('.close');

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = btn.getAttribute('data-img');
    });
  });
  closeBtn?.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });


  // ── Swipe Navigation ──
  let touchStartX = 0;
  document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
  document.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      currentIndex = (currentIndex + (diff > 0 ? 1 : -1) + sections.length) % sections.length;
      showSection(sections[currentIndex]);
    }
  });

  showSection('home');


  // ── Stars / Shooting Stars / Meteors ──
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let stars = [], shooters = [], meteors = [];

  const isDark    = () => document.documentElement.getAttribute('data-theme') === 'dark';
  const starRGB   = () => isDark() ? '220,230,255' : '0,0,0';
  const shootRGB  = () => isDark() ? '255,255,255' : '0,0,0';
  const meteorRGB = () => isDark() ? '255,220,180' : '80,60,20';

  function buildStars() {
    stars = Array.from({ length: Math.floor((canvas.width * canvas.height) / 3200) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.6 + 0.3,
      lo: 0.08, hi: 0.95,
    }));
  }

  function spawnShooter() {
    const angle = (Math.random() * 20 + 20) * (Math.PI / 180);
    const speed = Math.random() * 6 + 5;
    shooters.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: Math.random() * 80 + 60,
      life: 1, decay: Math.random() * 0.012 + 0.008,
    });
    setTimeout(spawnShooter, Math.random() * 1000 + 700);
  }

  function spawnMeteor() {
    const angle = (Math.random() * 15 + 30) * (Math.PI / 180);
    const speed = Math.random() * 4 + 8;
    meteors.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.3,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: Math.random() * 140 + 100,
      size: Math.random() * 2.5 + 1.5,
      life: 1, decay: Math.random() * 0.006 + 0.004,
    });
    setTimeout(spawnMeteor, Math.random() * 1500 + 1200);
  }

  spawnShooter();
  spawnMeteor();

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    buildStars();
  }

  function draw(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = ts / 1000, dark = isDark();
    const maxAlpha = dark ? 1.0 : 0.75;
    const sRGB = starRGB(), shRGB = shootRGB(), mRGB = meteorRGB();

    // Twinkling stars
    stars.forEach(s => {
      const a = (s.lo + (s.hi - s.lo) * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))) * maxAlpha;
      ctx.fillStyle = `rgba(${sRGB},${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Shooting stars
    shooters = shooters.filter(s => s.life > 0);
    shooters.forEach(s => {
      const tx = s.x - s.vx * (s.len / 10), ty = s.y - s.vy * (s.len / 10);
      const g = ctx.createLinearGradient(tx, ty, s.x, s.y);
      g.addColorStop(0, `rgba(${shRGB},0)`);
      g.addColorStop(1, `rgba(${shRGB},${(s.life * (dark ? 1.0 : 0.9)).toFixed(3)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = dark ? 1.5 : 1;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y); ctx.stroke();
      s.x += s.vx; s.y += s.vy; s.life -= s.decay;
    });

    // Meteors
    meteors = meteors.filter(m => m.life > 0);
    meteors.forEach(m => {
      const tx = m.x - m.vx * (m.len / 8), ty = m.y - m.vy * (m.len / 8);
      const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
      g.addColorStop(0,   `rgba(${shRGB},0)`);
      g.addColorStop(0.4, `rgba(${shRGB},${(m.life * (dark ? 0.5 : 0.35)).toFixed(3)})`);
      g.addColorStop(1,   `rgba(${mRGB},${(m.life * (dark ? 1.0 : 0.85)).toFixed(3)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = m.size;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(m.x, m.y); ctx.stroke();
      m.x += m.vx; m.y += m.vy; m.life -= m.decay;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);

});