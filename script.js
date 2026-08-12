document.addEventListener('DOMContentLoaded', function() {
  
  // 1. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Mobile dropdown toggles
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');
    
    if (dropdown && window.innerWidth <= 992) {
      link.addEventListener('click', function(e) {
        if (item.classList.contains('open')) {
          item.classList.remove('open');
        } else {
          // If anchor link inside page, let it scroll but toggle menu
          if (!this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
          }
          item.classList.add('open');
        }
      });
    }
  });

  // Smooth scroll & auto-close mobile menu on internal link click
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
          }
        }
      }
    });
  });

  // 2. HERO SLIDER FUNCTIONALITY
  const sliderWrapper = document.getElementById('sliderWrapper');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    if (sliderWrapper) {
      sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }

  if (nextBtn && prevBtn && sliderWrapper) {
    nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });

    prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });

    // Auto slide every 5 seconds
    setInterval(function() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }, 5000);
  }

  // 3. FOOTER ACCORDION FUNCTIONALITY
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('i');

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        if (icon) {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }
      } else {
        document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
        document.querySelectorAll('.accordion-header i').forEach(i => {
          i.classList.remove('fa-minus');
          i.classList.add('fa-plus');
        });

        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-minus');
        }
      }
    });
  });

  // 4. LOAD MORE POSTS INTERACTION
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memuat Berita...';
      setTimeout(() => {
        this.innerHTML = '<i class="fa-solid fa-check"></i> Semua Berita Telah Tampil';
        this.style.opacity = '0.6';
        this.disabled = true;
      }, 1000);
    });
  }

  // 5. INTERACTIVE FEEDBACK & HUMAS FORM HANDLER
  const feedbackForm = document.getElementById('feedbackForm');
  const formAlert = document.getElementById('formAlert');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const senderName = document.getElementById('senderName').value;
      const submitBtn = feedbackForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

      setTimeout(() => {
        formAlert.className = 'form-alert-msg success';
        formAlert.style.display = 'block';
        formAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Terima kasih ${senderName}! Pesan/Saran Anda telah berhasil dikirimkan ke Tim Humas SMKTAG.`;
        
        feedbackForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan Sekarang';

        setTimeout(() => {
          formAlert.style.display = 'none';
        }, 6000);
      }, 1200);
    });
  }

});