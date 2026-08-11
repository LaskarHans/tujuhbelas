document.addEventListener('DOMContentLoaded', function() {
  
  // 1. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  mobileToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

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
          e.preventDefault();
          item.classList.add('open');
        }
      });
    }
  });

  // 2. HERO SLIDER FUNCTIONALITY
  const sliderWrapper = document.getElementById('sliderWrapper');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

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

  // 3. FOOTER ACCORDION FUNCTIONALITY
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('i');

      // Toggle current
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      } else {
        // Close other accordions
        document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
        document.querySelectorAll('.accordion-header i').forEach(i => {
          i.classList.remove('fa-minus');
          i.classList.add('fa-plus');
        });

        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    });
  });

  // 4. LOAD MORE POSTS INTERACTION
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.addEventListener('click', function() {
    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memuat Berita...';
    setTimeout(() => {
      this.innerHTML = '<i class="fa-solid fa-check"></i> Semua Berita Telah Tampil';
      this.style.opacity = '0.6';
      this.disabled = true;
    }, 1000);
  });

});
