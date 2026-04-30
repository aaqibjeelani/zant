const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');
const preloader = document.getElementById('preloader');

/* ── PRELOADER ── */
if (preloader) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1000);
  });
}

/* ── NAVBAR & SCROLL TOP ── */
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    if (navbar) navbar.classList.add('scrolled');
    if (scrollTopBtn) scrollTopBtn.classList.add('show');
  } else {
    if (navbar) navbar.classList.remove('scrolled');
    if (scrollTopBtn) scrollTopBtn.classList.remove('show');
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el, i) => {
    el.dataset.delay = (i % 4) * 120;
    observer.observe(el);
  });
}

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); }
    else { el.textContent = Math.floor(start) + (el.dataset.suffix || ''); }
  }, 16);
}

const countersContainer = document.querySelectorAll('.hero-stats, .stats-row');
if (countersContainer.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('[data-count]');
        counters.forEach(c => animateCounter(c, parseInt(c.dataset.count), 1800));
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  countersContainer.forEach(el => counterObserver.observe(el));
}

/* ── COPY UPI ID ── */
const copyBtn = document.getElementById('copyUPI');
const toast = document.getElementById('toast');

if (copyBtn && toast) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('JKBMERC00114690@JKB').then(() => {
      toast.classList.add('show');
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => {
        toast.classList.remove('show');
        copyBtn.textContent = 'Copy';
      }, 2500);
    });
  });
}

/* ── ACTIVE NAV LINK HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length > 0 && navLinks.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    });
  });
}

/* ── QR MODAL ── */
const qrFrame = document.getElementById('qrFrame');
const qrModal = document.getElementById('qrModal');
const closeModal = document.getElementById('closeModal');

if (qrFrame && qrModal && closeModal) {
  qrFrame.addEventListener('click', () => {
    qrModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeAction = () => {
    qrModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeModal.addEventListener('click', closeAction);
  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) closeAction();
  });
}

/* ── WHATSAPP INTERACTIVE CHAT ── */
const waBubble = document.getElementById('whatsappBubble');
const waChatWindow = document.getElementById('waChatWindow');
const waInput = document.getElementById('waInput');
const waSendBtn = document.getElementById('waSendBtn');

if (waBubble && waChatWindow && waInput && waSendBtn) {
  waBubble.addEventListener('click', (e) => {
    e.stopPropagation();
    waChatWindow.classList.toggle('open');
  });

  const sendWhatsApp = () => {
    const msg = waInput.value.trim();
    if (msg) {
      const url = `https://wa.me/916006065554?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      waInput.value = '';
      waChatWindow.classList.remove('open');
    }
  };

  waSendBtn.addEventListener('click', sendWhatsApp);
  waInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendWhatsApp();
  });

  document.addEventListener('click', (e) => {
    if (!waChatWindow.contains(e.target) && !waBubble.contains(e.target)) {
      waChatWindow.classList.remove('open');
    }
  });
}

/* ── YEAR ── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── HERO SWIPER ── */
const heroSwiper = new Swiper('.hero-swiper', {
  slidesPerView: 1,
  loop: true,
  speed: 1200,
  parallax: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  grabCursor: true,
});


