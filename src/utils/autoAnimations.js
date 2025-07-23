// Automatic Animation System - Applies animations to all components
import animationManager from './animationManager';

class AutoAnimations {
  constructor() {
    this.isInitialized = false;
    this.observedElements = new Set();
  }

  init() {
    if (this.isInitialized) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeAnimations());
    } else {
      this.initializeAnimations();
    }
    
    this.isInitialized = true;
  }

  initializeAnimations() {
    // Auto-animate common elements
    this.autoAnimateElements();
    
    // Set up mutation observer for dynamically added elements
    this.setupMutationObserver();
    
    // Initialize scroll-based animations
    this.initScrollAnimations();
    
    console.log('🎭 Auto animations initialized');
  }

  autoAnimateElements() {
    const animationMap = {
      // Cards and containers
      '.product-card, .category-card, .blog-card, .user-card, .metric-card': 'fadeInUp',
      '.enhanced-product-card': 'fadeInUp',
      
      // Headers and sections
      '.page-header, .section-header': 'fadeInDown',
      '.hero-text': 'fadeInLeft',
      '.hero-image': 'fadeInRight',
      
      // Navigation elements
      '.sidebar-item': 'fadeInLeft',
      '.nav-link': 'fadeInDown',
      
      // Form elements
      '.input-group, .form-group': 'fadeInUp',
      '.auth-card': 'scaleIn',
      
      // Statistics and metrics
      '.stat-card, .stats-grid > *': 'fadeInUp',
      '.feature-card': 'fadeInUp',
      
      // Lists and grids
      '.products-grid > *': 'fadeInUp',
      '.categories-grid > *': 'fadeInUp',
      '.blogs-grid > *': 'fadeInUp',
      '.users-grid > *': 'fadeInUp',
      
      // Special elements
      '.modal-content': 'scaleIn',
      '.dropdown-menu': 'fadeInDown',
      '.notification': 'slideInRight'
    };

    Object.entries(animationMap).forEach(([selector, animation]) => {
      this.applyAnimationToElements(selector, animation);
    });
  }

  applyAnimationToElements(selector, animationType) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      if (!this.observedElements.has(element)) {
        // Add stagger delay
        const delay = index * 0.1;
        element.style.animationDelay = `${delay}s`;
        
        // Apply animation
        animationManager.addScrollAnimation(element, animationType);
        this.observedElements.add(element);
      }
    });
  }

  setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldReapply = false;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            shouldReapply = true;
          }
        });
      });
      
      if (shouldReapply) {
        // Debounce reapplication
        clearTimeout(this.reapplyTimer);
        this.reapplyTimer = setTimeout(() => {
          this.autoAnimateElements();
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  initScrollAnimations() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll indicators for long pages
    this.addScrollIndicator();
    
    // Add parallax effects to hero sections
    this.addParallaxEffects();
  }

  addScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
      <div class="scroll-progress"></div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .scroll-indicator {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        z-index: 9999;
        pointer-events: none;
      }
      
      .scroll-progress {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        width: 0%;
        transition: width 0.1s ease;
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(indicator);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const progress = document.querySelector('.scroll-progress');
      if (progress) {
        progress.style.width = `${Math.min(scrolled, 100)}%`;
      }
    }, { passive: true });
  }

  addParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero, .hero-image');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
      });
    }, { passive: true });
  }

  // Utility methods for manual animation triggering
  animateElement(element, animationType = 'fadeInUp') {
    if (!this.observedElements.has(element)) {
      animationManager.addScrollAnimation(element, animationType);
      this.observedElements.add(element);
    }
  }

  animateElementsWithSelector(selector, animationType = 'fadeInUp') {
    this.applyAnimationToElements(selector, animationType);
  }

  // Add entrance animation to a specific component
  addComponentAnimation(componentElement, animationType = 'fadeInUp') {
    const children = componentElement.querySelectorAll('*');
    children.forEach((child, index) => {
      setTimeout(() => {
        this.animateElement(child, animationType);
      }, index * 50);
    });
  }

  // Reset animations (useful for route changes)
  resetAnimations() {
    this.observedElements.clear();
    setTimeout(() => {
      this.autoAnimateElements();
    }, 100);
  }

  destroy() {
    this.observedElements.clear();
    this.isInitialized = false;
  }
}

// Create and export singleton
const autoAnimations = new AutoAnimations();

// Auto-initialize
autoAnimations.init();

export default autoAnimations;
