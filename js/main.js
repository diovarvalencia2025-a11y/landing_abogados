/**
 * Valenzuela & Asociados | Luxury Corporate Law Engine
 * Advanced Interactions, Precision Fee Simulator & Case Viability System
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dynamic Navbar & Scroll States
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(3, 6, 14, 0.98)';
      navbar.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.background = 'rgba(7, 13, 30, 0.92)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 2. Mobile Menu Controller
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Practice Area Filter Matrix
  const filterBtns = document.querySelectorAll('.filter-btn');
  const practiceCards = document.querySelectorAll('.practice-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      practiceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. Precision Fee & Viability Calculator
  const claimSlider = document.getElementById('claimSlider');
  const claimDisplay = document.getElementById('claimDisplay');
  const estimatedRecovery = document.getElementById('estimatedRecovery');
  const feeEstimate = document.getElementById('feeEstimate');
  const viabilityScore = document.getElementById('viabilityScore');
  const calcJurisdiction = document.getElementById('calcJurisdiction');
  const calcStage = document.getElementById('calcStage');

  function updateCalculator() {
    if (!claimSlider) return;

    const amount = parseInt(claimSlider.value, 10);
    claimDisplay.textContent = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);

    // Dynamic recovery calculation
    const recoveryMin = Math.round(amount * 0.88);
    const recoveryMax = Math.round(amount * 1.15);
    estimatedRecovery.textContent = `${new Intl.NumberFormat('es-ES').format(recoveryMin)} € - ${new Intl.NumberFormat('es-ES').format(recoveryMax)} €`;

    // Fee structure (Cuota Litis estimate or Fixed Strategy)
    const jurisdiction = calcJurisdiction ? calcJurisdiction.value : 'mercantil';
    const stage = calcStage ? calcStage.value : 'extrajudicial';

    if (jurisdiction === 'accidentes' || jurisdiction === 'laboral') {
      feeEstimate.textContent = 'A Porcentaje de Éxito (Cuota Litis 12% - 15%)';
      viabilityScore.textContent = '96% • Máxima Viabilidad';
      viabilityScore.style.color = 'var(--success)';
    } else if (stage === 'juicio') {
      feeEstimate.textContent = 'Presupuesto Cerrado por Fases Procesales';
      viabilityScore.textContent = '91% • Atención Prioritaria';
      viabilityScore.style.color = 'var(--gold-400)';
    } else {
      feeEstimate.textContent = 'Tarifa Plana Extrajudicial + Acuerdo';
      viabilityScore.textContent = '94% • Alta Probabilidad de Acuerdo';
      viabilityScore.style.color = 'var(--gold-400)';
    }
  }

  if (claimSlider) {
    claimSlider.addEventListener('input', updateCalculator);
  }
  if (calcJurisdiction) calcJurisdiction.addEventListener('change', updateCalculator);
  if (calcStage) calcStage.addEventListener('change', updateCalculator);
  updateCalculator();

  // 5. Interactive FAQ Accordion
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-btn');
    btn.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('active');

      faqCards.forEach(otherCard => {
        if (otherCard !== card) otherCard.classList.remove('active');
      });

      card.classList.toggle('active', !isAlreadyActive);
    });
  });

  // 6. Form Submission & Encrypted Protocol Feedback
  const quickForm = document.getElementById('quickAssessmentForm');
  const mainConsultForm = document.getElementById('mainConsultationForm');
  const modalBackdrop = document.getElementById('feedbackModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalMessage = document.getElementById('modalMessage');

  function handleFormSubmit(e, form) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<span>Verificando Secreto Profesional & Encriptando...</span>';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();

      if (modalBackdrop && modalMessage) {
        modalMessage.innerHTML = 'Su solicitud ha sido transmitida bajo <strong>protocolo de estricta confidencialidad</strong>.<br><br>Un Letrado Socio Director analizará los antecedentes y se pondrá en contacto con usted en un plazo máximo de <strong>2 horas hábiles</strong>.';
        modalBackdrop.classList.add('active');
      }
    }, 900);
  }

  if (quickForm) quickForm.addEventListener('submit', (e) => handleFormSubmit(e, quickForm));
  if (mainConsultForm) mainConsultForm.addEventListener('submit', (e) => handleFormSubmit(e, mainConsultForm));

  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', () => modalBackdrop.classList.remove('active'));
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
    });
  }
});
