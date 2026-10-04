import { AIAssistant } from './ai-assistant.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlTag = document.documentElement;
  const themeIcon = themeToggleBtn.querySelector('i');

  const savedTheme = localStorage.getItem('site-theme') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  function applyTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // 3. Project Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. AI Widget Controller & Authentication
  const aiWidget = document.getElementById('ai-widget');
  const aiLauncher = document.getElementById('ai-launcher');
  const openAiBtn = document.getElementById('open-ai-btn');
  const heroAiTrigger = document.getElementById('hero-ai-trigger');
  const demoAiLink = document.getElementById('demo-ai-link');
  const closeAiBtn = document.getElementById('close-ai-btn');

  // Auth Modal Elements
  const authModal = document.getElementById('auth-modal');
  const closeAuthBtn = document.getElementById('close-auth-btn');
  const authForm = document.getElementById('auth-form');
  const authErrorMsg = document.getElementById('auth-error-msg');

  let isLoggedIn = sessionStorage.getItem('ai-auth') === 'true';

  function openAIWidget() {
    if (isLoggedIn) {
      aiWidget.classList.remove('closed');
      authModal.classList.add('closed');
    } else {
      openAuthModal();
    }
  }

  function closeAIWidget() {
    aiWidget.classList.add('closed');
  }

  function toggleAIWidget() {
    if (aiWidget.classList.contains('closed')) {
      openAIWidget();
    } else {
      closeAIWidget();
    }
  }

  function openAuthModal() {
    authModal.classList.remove('closed');
    authErrorMsg.textContent = '';
  }

  function closeAuthModal() {
    authModal.classList.add('closed');
  }

  // Bind AI Triggers
  aiLauncher.addEventListener('click', toggleAIWidget);
  closeAiBtn.addEventListener('click', closeAIWidget);
  if (openAiBtn) openAiBtn.addEventListener('click', openAIWidget);
  if (heroAiTrigger) heroAiTrigger.addEventListener('click', openAIWidget);
  if (demoAiLink) demoAiLink.addEventListener('click', (e) => {
    e.preventDefault();
    openAIWidget();
  });

  // Bind Auth Modal Triggers
  closeAuthBtn.addEventListener('click', closeAuthModal);
  
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('auth-username').value;
      const password = document.getElementById('auth-password').value;
      
      // Simulated Authentication Logic
      if (username && password) {
        // Success
        isLoggedIn = true;
        sessionStorage.setItem('ai-auth', 'true');
        closeAuthModal();
        
        // Add a small delay for smooth transition, then open AI
        setTimeout(() => {
           aiWidget.classList.remove('closed');
        }, 300);
      } else {
        authErrorMsg.textContent = 'Invalid credentials. Please try again.';
      }
    });
  }

  // Initialize Embedded AI Engine
  const chatBody = document.getElementById('ai-chat-body');
  const inputForm = document.getElementById('ai-input-form');
  const inputField = document.getElementById('ai-user-input');
  
  if (chatBody && inputForm && inputField) {
    new AIAssistant(chatBody, inputForm, inputField);
  }

  // 5. Contact Form Simulation
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.innerHTML = '<p style="color: var(--accent-green); margin-top: 15px; text-align: center;"><i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.</p>';
      contactForm.reset();
      setTimeout(() => {
        formStatus.innerHTML = '';
      }, 5000);
    });
  }
});
