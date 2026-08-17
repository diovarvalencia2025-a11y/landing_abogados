/**
 * Valenzuela & Asociados | Main JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Blur & Shadow
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(7, 11, 25, 0.98)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.35)';
    } else {
      navbar.style.background = 'rgba(13, 21, 45, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }

  // 3. Interactive Case Viability Calculator
  const calcForm = document.getElementById('caseCalculatorForm');
  const calcResultBox = document.getElementById('calcResultBox');
  const calcScore = document.getElementById('calcScore');
  const calcDesc = document.getElementById('calcDesc');

  if (calcForm && calcResultBox) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const area = document.getElementById('calcArea').value;
      const stage = document.getElementById('calcStage').value;
      const urgency = document.getElementById('calcUrgency').value;

      if (!area || !stage || !urgency) {
        alert('Por favor, selecciona todas las opciones para evaluar la viabilidad.');
        return;
      }

      // Calculation logic
      let scoreText = 'Alta Viabilidad (92%)';
      let description = 'Tu caso reúne los indicios jurídicos óptimos para iniciar una negociación previa o procedimiento judicial con alta probabilidad de éxito.';

      if (stage === 'juicio' || urgency === 'inmediata') {
        scoreText = 'Atención Prioritaria (Urgente)';
        description = 'Tu caso se encuentra en una fase crítica con plazos procesales abiertos. Te recomendamos contactar de inmediato para personarnos.';
      } else if (area === 'penal') {
        scoreText = 'Estudio Especializado Penal';
        description = 'Requiere análisis minucioso de atestados y diligencias previas por nuestro equipo de penalistas de guardia.';
      }

      calcScore.textContent = scoreText;
      calcDesc.textContent = description;
      calcResultBox.style.display = 'block';

      // Smooth scroll to result
      calcResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other open accordions
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      item.classList.toggle('active', !isActive);
    });
  });

  // 5. Contact & Consultation Forms Handling
  const forms = ['quickAssessmentForm', 'mainConsultationForm'];
  const feedbackModal = document.getElementById('feedbackModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalMessage = document.getElementById('modalMessage');

  forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando solicitud...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();

          if (feedbackModal) {
            modalMessage.textContent = 'Hemos recibido tu consulta confidencial. Un abogado socio especialista se pondrá en contacto contigo en un plazo máximo de 2 horas hábiles.';
            feedbackModal.classList.add('active');
          }
        }, 800);
      });
    }
  });

  // Close Modal
  if (closeModalBtn && feedbackModal) {
    closeModalBtn.addEventListener('click', () => {
      feedbackModal.classList.remove('active');
    });

    feedbackModal.addEventListener('click', (e) => {
      if (e.target === feedbackModal) {
        feedbackModal.classList.remove('active');
      }
    });
  }
});
