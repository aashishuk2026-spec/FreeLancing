document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('#testimonialSlider .slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sliderDots = document.getElementById('sliderDots');
  const progressBar = document.getElementById('progressBar');

  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.classList.add('dot-btn');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    if (index === 0) dot.classList.add('active');

    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
  });

  const dots = sliderDots.querySelectorAll('.dot-btn');

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
      dot.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
    });

    if (progressBar) {
      const progressPercent = ((currentIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navCollapse = document.querySelector('.navbar-collapse');

  if (navCollapse) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
          bsCollapse.hide();
        }
      });
    });
  }
  updateSlider();
  startAutoSlide();
});