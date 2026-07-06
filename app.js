// ==========================================================================
// ROKO LANDING PAGE & SIMULATOR LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     LANDING PAGE COMPONENT INTERACTIONS
     ========================================================================== */

  // 1. FAQ Answers display directly (no accordion toggle required)

  // 2. Focus Time Reclaimed Calculator
  const timeSlider = document.getElementById('time-slider');
  const sliderValDisplay = document.getElementById('slider-val-display');
  const calcMonthlyHours = document.getElementById('calc-monthly-hours');
  const calcYearlyDays = document.getElementById('calc-yearly-days');
  const calcEquivalenceText = document.getElementById('calc-equivalence-text');

  if (timeSlider) {
    timeSlider.addEventListener('input', () => {
      const hours = parseFloat(timeSlider.value);
      
      // Update slider display label
      sliderValDisplay.textContent = `${hours.toFixed(1)} Hours`;

      // Monthly hours saved: hours * 30 days
      const monthlyHours = hours * 30;
      calcMonthlyHours.textContent = `${Math.round(monthlyHours)} Hours`;

      // Yearly days saved: (hours * 365) / 24 hours in a day
      const yearlyDays = (hours * 365) / 24;
      calcYearlyDays.textContent = `${yearlyDays.toFixed(1)} Days`;

      // Dynamic motivational equivalence text
      let equivText = "";
      if (hours <= 1.0) {
        equivText = `Reclaim up to 15 full days of your life back! You could read 12 books, walk 360 miles, or code a couple of small side projects.`;
      } else if (hours <= 3.0) {
        equivText = `You can read 24 complete books, learn the conversational foundation of a new language, or complete 2 professional courses in this time!`;
      } else {
        equivText = `You are saving over 45 days of active waking time. You could build a functional side business, read 60 books, or train for and run a complete marathon!`;
      }
      calcEquivalenceText.textContent = equivText;
    });
  }

  // 3. Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Offset for sticky navbar
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Change navbar shadow on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
      navbar.style.height = '70px';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.height = '80px';
    }
  });


  /* ==========================================================================
     WAITLIST FORM PRE-REGISTRATION HANDLERS
     ========================================================================== */

  // Hero Form
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistSuccess = document.getElementById('waitlist-success-msg');

  if (waitlistForm && waitlistSuccess) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Hide form fields and display success block
      waitlistForm.style.display = 'none';
      waitlistSuccess.classList.add('show');
    });
  }

  // Footer Form
  const waitlistFormFooter = document.getElementById('waitlist-form-footer');
  const waitlistSuccessFooter = document.getElementById('waitlist-success-msg-footer');

  if (waitlistFormFooter && waitlistSuccessFooter) {
    waitlistFormFooter.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Hide form fields and display success block
      waitlistFormFooter.style.display = 'none';
      waitlistSuccessFooter.classList.add('show');
    });
  }
