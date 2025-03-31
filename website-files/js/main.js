document.addEventListener('DOMContentLoaded', () => {
    // Initialize background elements
    createBackgroundElements();
    
    // Initialize animations
    initAnimations();
  });
  
  function createBackgroundElements() {
    const bgElements = document.createElement('div');
    bgElements.className = 'bg-elements';
    
    // Create floating elements
    for (let i = 0; i < 5; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      
      // Random size between 200px and 400px
      const size = Math.random() * 200 + 200;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      // Random position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      
      // Random animation delay
      element.style.animationDelay = `${Math.random() * 10}s`;
      
      bgElements.appendChild(element);
    }
    
    document.body.prepend(bgElements);
  }
  
  function initAnimations() {
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons, .card, .step');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }
  