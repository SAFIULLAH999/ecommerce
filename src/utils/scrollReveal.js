// Ultra-smooth scroll reveal animation system

class ScrollReveal {
  constructor() {
    this.elements = [];
    this.isScrolling = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.reveal();
  }

  bindEvents() {
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
  }

  handleScroll() {
    if (!this.isScrolling) {
      requestAnimationFrame(() => {
        this.reveal();
        this.isScrolling = false;
      });
      this.isScrolling = true;
    }
  }

  handleResize() {
    this.reveal();
  }

  observe(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      const config = {
        element,
        threshold: options.threshold || 0.1,
        delay: options.delay || 0,
        duration: options.duration || 800,
        easing: options.easing || 'cubic-bezier(0.16, 1, 0.3, 1)',
        animation: options.animation || 'slideUp',
        once: options.once !== false,
        revealed: false,
        ...options
      };

      this.elements.push(config);
    });

    this.reveal();
  }

  reveal() {
    this.elements.forEach(config => {
      if (config.revealed && config.once) return;

      const { element, threshold } = config;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementVisible = rect.top < windowHeight * (1 - threshold);

      if (elementVisible && !config.revealed) {
        this.animateElement(config);
        config.revealed = true;
      } else if (!elementVisible && !config.once) {
        this.resetElement(config);
        config.revealed = false;
      }
    });
  }

  animateElement(config) {
    const { element, delay, duration, easing, animation } = config;

    // Apply initial styles
    element.style.transition = `all ${duration}ms ${easing}`;
    element.style.transitionDelay = `${delay}ms`;

    // Remove any existing animation classes
    element.classList.remove('sr-hidden', 'sr-visible');

    // Apply animation
    setTimeout(() => {
      element.classList.add('sr-visible', `sr-${animation}`);
      
      // Dispatch custom event
      element.dispatchEvent(new CustomEvent('scrollReveal', {
        detail: { element, animation }
      }));
    }, 10);
  }

  resetElement(config) {
    const { element } = config;
    element.classList.remove('sr-visible');
    element.classList.add('sr-hidden');
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.elements = [];
  }
}

// Animation presets
const animations = {
  slideUp: 'translateY(50px)',
  slideDown: 'translateY(-50px)',
  slideLeft: 'translateX(50px)',
  slideRight: 'translateX(-50px)',
  fadeIn: 'opacity: 0',
  scaleUp: 'scale(0.8)',
  rotateIn: 'rotate(10deg)',
  flipIn: 'rotateY(90deg)'
};

// Apply base styles
const style = document.createElement('style');
style.textContent = `
  .sr-hidden {
    opacity: 0;
    transform: ${animations.slideUp};
    will-change: transform, opacity;
  }

  .sr-visible {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1) rotate(0) rotateY(0);
  }

  .sr-slideUp {
    transform: translateY(0);
  }

  .sr-slideDown {
    transform: translateY(0);
  }

  .sr-slideLeft {
    transform: translateX(0);
  }

  .sr-slideRight {
    transform: translateX(0);
  }

  .sr-fadeIn {
    opacity: 1;
  }

  .sr-scaleUp {
    transform: scale(1);
  }

  .sr-rotateIn {
    transform: rotate(0);
  }

  .sr-flipIn {
    transform: rotateY(0);
  }

  /* Stagger animations */
  .sr-stagger > * {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .sr-stagger.sr-visible > *:nth-child(1) { transition-delay: 0.1s; }
  .sr-stagger.sr-visible > *:nth-child(2) { transition-delay: 0.2s; }
  .sr-stagger.sr-visible > *:nth-child(3) { transition-delay: 0.3s; }
  .sr-stagger.sr-visible > *:nth-child(4) { transition-delay: 0.4s; }
  .sr-stagger.sr-visible > *:nth-child(5) { transition-delay: 0.5s; }
  .sr-stagger.sr-visible > *:nth-child(6) { transition-delay: 0.6s; }

  .sr-stagger.sr-visible > * {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(style);

// Initialize scroll reveal elements on page load
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-scroll-reveal]');
  elements.forEach(element => {
    element.classList.add('sr-hidden');
  });
});

export default ScrollReveal;
