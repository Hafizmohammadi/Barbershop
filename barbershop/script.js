/* ============================================================
   TELEGRAM CONFIG
   1. Create a bot: open Telegram → search @BotFather → /newbot
   2. Get your Chat ID: search @userinfobot → send any message
   Replace the two values below with your own.
============================================================ */
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID   = 'YOUR_CHAT_ID';

async function sendTelegramNotification(booking) {
  const message =
    `📅 *New Booking — AliBarbershop*\n\n` +
    `👤 *Name:* ${booking.name}\n` +
    `📞 *Phone:* ${booking.phone || '—'}\n` +
    `✉️ *Email:* ${booking.email || '—'}\n` +
    `✂️ *Service:* ${booking.service}\n` +
    `🗓 *Date:* ${booking.date || '—'}\n` +
    `📝 *Notes:* ${booking.notes || '—'}`;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  });
}


/* ── Navbar shadow + back-to-top visibility on scroll ── */
const navbar    = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── Hamburger / mobile menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mobile-link, .mobile-menu .btn').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});


/* ── Scroll-reveal with IntersectionObserver ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ── Smooth-scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = link.getAttribute('href');
    if (target === '#' || target.startsWith('#modal')) return;
    const el = document.querySelector(target);
    if (el) {
      e.preventDefault();
      const offset = navbar.offsetHeight;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ── Booking modal ── */
const overlay = document.getElementById('modal-overlay');

function openModal(e) {
  if (e) e.preventDefault();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-success').classList.remove('show');
  document.getElementById('modal-form-content').style.display = '';
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('bk-date').min = today;
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});


/* ── Booking form submit ── */
document.getElementById('booking-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name    = document.getElementById('bk-name').value.trim();
  const service = document.getElementById('bk-service').value;

  if (!name || !service) {
    const missing = !name
      ? document.getElementById('bk-name')
      : document.getElementById('bk-service');
    missing.focus();
    missing.style.borderColor = '#e53e3e';
    setTimeout(() => { missing.style.borderColor = ''; }, 1800);
    return;
  }

  const submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  const formData = new FormData(this);

  try {
    const res  = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('modal-form-content').style.display = 'none';
      document.getElementById('modal-success').classList.add('show');
      this.reset();
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    submitBtn.textContent = 'Confirm Booking';
    submitBtn.disabled = false;
    alert('Something went wrong. Please try again or call us directly.');
  }
});


/* ── Contact form submit ── */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !email || !message) return;

  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('form-success').classList.add('show');
  this.reset();
});


/* ── Active nav link highlight on scroll ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => { a.style.color = ''; });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--dark)';
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => activeObserver.observe(s));
