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
     WAITLIST FORM & STORAGE HANDLERS
     ========================================================================== */

  // Local Storage helper functions
  function getWaitlist() {
    try {
      const stored = localStorage.getItem('roko_waitlist');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to read waitlist data:", err);
      return [];
    }
  }

  function saveToWaitlist(email) {
    if (!email) return;
    const list = getWaitlist();
    if (!list.includes(email)) {
      list.push(email);
      try {
        localStorage.setItem('roko_waitlist', JSON.stringify(list));
      } catch (err) {
        console.error("Failed to write waitlist data:", err);
      }
    }
  }

  // Hero Form Submission
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistSuccess = document.getElementById('waitlist-success-msg');
  const waitlistEmail = document.getElementById('waitlist-email');

  if (waitlistForm && waitlistSuccess && waitlistEmail) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = waitlistEmail.value.trim();
      if (email) {
        saveToWaitlist(email);
      }
      waitlistForm.style.display = 'none';
      waitlistSuccess.classList.add('show');
    });
  }

  // Footer Form Submission
  const waitlistFormFooter = document.getElementById('waitlist-form-footer');
  const waitlistSuccessFooter = document.getElementById('waitlist-success-msg-footer');
  const waitlistEmailFooter = document.getElementById('waitlist-email-footer');

  if (waitlistFormFooter && waitlistSuccessFooter && waitlistEmailFooter) {
    waitlistFormFooter.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = waitlistEmailFooter.value.trim();
      if (email) {
        saveToWaitlist(email);
      }
      waitlistFormFooter.style.display = 'none';
      waitlistSuccessFooter.classList.add('show');
    });
  }

  /* ==========================================================================
     HIDDEN ADMIN DASHBOARD MODAL CONTROLS
     ========================================================================== */

  const adminLockBtn = document.getElementById('admin-lock-btn');
  const adminModal = document.getElementById('admin-modal');
  const adminCloseBtn = document.getElementById('admin-close-btn');
  const adminExportBtn = document.getElementById('admin-export-btn');
  const waitlistCount = document.getElementById('waitlist-count');
  const adminEmailList = document.getElementById('admin-email-list');

  function renderAdminWaitlist() {
    if (!adminEmailList || !waitlistCount) return;
    const list = getWaitlist();
    
    // Update count display
    waitlistCount.textContent = list.length;
    
    // Clear previous items
    adminEmailList.innerHTML = '';
    
    if (list.length === 0) {
      adminEmailList.innerHTML = '<li class="empty-list-msg">No sign-ups yet.</li>';
    } else {
      list.forEach((email, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${idx + 1}. ${email}</span>
          <span style="font-size: 0.75rem; color: var(--text-light);">${new Date().toLocaleDateString()}</span>
        `;
        adminEmailList.appendChild(li);
      });
    }
  }

  if (adminLockBtn && adminModal) {
    adminLockBtn.addEventListener('click', () => {
      renderAdminWaitlist();
      adminModal.classList.add('open');
    });
  }

  if (adminCloseBtn && adminModal) {
    adminCloseBtn.addEventListener('click', () => {
      adminModal.classList.remove('open');
    });
  }

  // Export CSV Action
  if (adminExportBtn) {
    adminExportBtn.addEventListener('click', () => {
      const list = getWaitlist();
      if (list.length === 0) {
        alert("Waitlist is empty. Nothing to export!");
        return;
      }

      // Generate CSV string
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Index,Email Address,Date Added\r\n";
      
      list.forEach((email, idx) => {
        csvContent += `${idx + 1},"${email}","${new Date().toLocaleDateString()}"\r\n`;
      });

      // Trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "roko_waitlist.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
