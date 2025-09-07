// Advanced Scroll Animation System
class ScrollAnimationManager {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    // Don't auto-initialize - let components call init() when ready
  }

  init() {
    // Create intersection observer for scroll animations
    this.createScrollObserver();
    
    // Initialize on DOM load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
    } else {
      this.setupAnimations();
    }

    // Add smooth scroll behavior
    this.addSmoothScrolling();
  }

  createScrollObserver() {
    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.triggerAnimation(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, options);
  }

  setupAnimations() {
    // Find all elements with animation classes
    const animationSelectors = [
      '.animate-on-scroll',
      '.fade-in-up',
      '.fade-in-left', 
      '.fade-in-right',
      '.fade-in-scale',
      '.slide-in-bottom',
      '.bounce-in',
      '.stagger-animation'
    ];

    animationSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = this.getInitialTransform(element);
        
        // Observe element
        this.scrollObserver.observe(element);
      });
    });

    // Setup stagger animations
    this.setupStaggerAnimations();
  }

  getInitialTransform(element) {
    if (element.classList.contains('fade-in-up') || element.classList.contains('slide-in-bottom')) {
      return 'translateY(60px)';
    }
    if (element.classList.contains('fade-in-left')) {
      return 'translateX(-60px)';
    }
    if (element.classList.contains('fade-in-right')) {
      return 'translateX(60px)';
    }
    if (element.classList.contains('fade-in-scale')) {
      return 'scale(0.8)';
    }
    return 'translateY(30px)';
  }

  triggerAnimation(element) {
    const animationType = this.getAnimationType(element);
    
    // Apply animation
    element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0) translateX(0) scale(1)';

    // Add specific animation class
    if (animationType) {
      element.classList.add(animationType);
    }

    // Trigger custom event
    element.dispatchEvent(new CustomEvent('animated', {
      detail: { type: animationType }
    }));
  }

  getAnimationType(element) {
    const classes = element.classList;
    if (classes.contains('bounce-in')) return 'animate-bounce-in';
    if (classes.contains('fade-in-scale')) return 'animate-fade-in-scale';
    return 'animate-fade-in-up';
  }

  setupStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    
    staggerContainers.forEach(container => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${index * 0.1}s`;
        child.classList.add('animate-on-scroll');
      });
    });
  }

  addSmoothScrolling() {
    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  // Parallax effect for elements
  addParallaxEffect(selector, speed = 0.5) {
    const elements = document.querySelectorAll(selector);
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      
      elements.forEach(element => {
        const rate = scrolled * -speed;
        element.style.transform = `translateY(${rate}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }

  // Magnetic effect for buttons
  addMagneticEffect(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Reveal text animation
  addTextRevealEffect(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = '';
      
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        span.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s`;
        element.appendChild(span);
      });

      // Trigger animation when in view
      this.scrollObserver.observe(element);
      element.addEventListener('animated', () => {
        const spans = element.querySelectorAll('span');
        spans.forEach(span => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // Counter animation
  animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start);
      
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  // Cleanup
  destroy() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// Export class instead of instance
export default ScrollAnimationManager;
