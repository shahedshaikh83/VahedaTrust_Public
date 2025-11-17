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
  const container = document.getElementById('slides');
let slides = Array.from(container.children);

// Clone first and last for infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length-1].cloneNode(true);
container.appendChild(firstClone);
container.insertBefore(lastClone, slides[0]);
slides = Array.from(container.children);

let index = 1;
let isTransitioning = false;
container.style.transform = `translateX(-${index*100}%)`;
slides[index].classList.add('active');

// Create dots

const dotsContainer = document.getElementById('dots');
const realSlidesCount = slides.length - 2;

for(let i = 0; i < realSlidesCount; i++){
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if(i===0) dot.classList.add('active');

  dot.addEventListener('click', () => {
    if (isTransitioning) return;
    slides[index].classList.remove('active');
    index = i + 1;
    slides[index].classList.add('active');
    container.style.transition = 'transform 1s ease-in-out';
    container.style.transform = `translateX(-${index * 100}vw)`; // VW
    updateDots();
    resetInterval();
  });
  dotsContainer.appendChild(dot);
}

function updateDots(){
  const dots = dotsContainer.children;
  for(let d of dots) d.classList.remove('active');
  if(index >= 1 && index <= slides.length-2) {
    dots[index-1].classList.add('active');
  }
}

function moveSlide(dir=1){
 if (isTransitioning) return;
  
  isTransitioning = true;
  slides[index].classList.remove('active');
  index += dir;
  slides[index].classList.add('active');
  
  container.style.transition = 'transform 1s ease-in-out';
  container.style.transform = `translateX(-${index * 100}vw)`; // VW
  updateDots();
}

// Infinite loop handling
container.addEventListener('transitionend', ()=>{
  isTransitioning = false;

   // Jump from last clone to first real slide

  if(index === slides.length-1){ 
    container.style.transition = 'none';
    index = 1;
    container.style.transform = `translateX(${-index*100}%)`;
    void container.offsetWidth;
    slides.forEach(s=>s.classList.remove('active'));
    slides[index].classList.add('active');
    updateDots();
  }
   if (index === 0) {
    container.style.transition = 'none';
    index = slides.length - 2;
    container.style.transform = `translateX(-${index * 100}vw)`;
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    updateDots();
  }
});
// Auto slide
let interval = setInterval(()=>moveSlide(1), 6000);

function resetInterval(){ 
  clearInterval(interval); 
  interval = setInterval(()=>moveSlide(1), 6000);
}

  

