// Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking on a link
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('active');
        menuToggle.textContent = '☰';
      }
    });

    // Smooth scroll and fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Add smooth hover effects for cards
    document.querySelectorAll('.card, .story-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('story-card') 
          ? 'translateY(-10px) scale(1.02)' 
          : 'translateY(-8px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  