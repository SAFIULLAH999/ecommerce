// Comprehensive Animation Manager for Ultra-Smooth Interactions

class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Initialize scroll animations
    this.initScrollAnimations();
    
    // Initialize interaction animations
    this.initInteractionAnimations();
    
    // Initialize page transition animations
    this.initPageTransitions();
    
    // Initialize micro-interactions
    this.initMicroInteractions();
    
    this.isInitialized = true;
    console.log('🎬 Animation Manager initialized');
  }

  // Scroll-based animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '-10% 0px -10% 0px'
    };

    // Scroll reveal observer
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const animationType = element.getAttribute('data-scroll-animation') || 'fadeInUp';
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          this.triggerScrollAnimation(element, animationType, entry.intersectionRatio);
        } else if (!entry.isIntersecting) {
          this.resetScrollAnimation(element);
        }
      });
    }, observerOptions);

    this.observers.set('scroll', scrollObserver);

    // Auto-observe elements with scroll animations
    this.observeScrollElements();
  }

  observeScrollElements() {
    const elementsToObserve = [
      '.product-card',
      '.category-card',
      '.hero-text',
      '.hero-image',
      '.section-header',
      '.stat-card',
      '.feature-card',
      '.blog-card',
      '.user-card',
      '.metric-card'
    ];

    elementsToObserve.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (!element.hasAttribute('data-scroll-animation')) {
          element.setAttribute('data-scroll-animation', 'fadeInUp');
        }
        this.observers.get('scroll').observe(element);
      });
    });
  }

  triggerScrollAnimation(element, animationType, ratio) {
    if (this.animatedElements.has(element)) return;

    element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.transform = 'translateY(0) scale(1)';
    element.style.opacity = '1';
    
    // Apply specific animation based on type
    switch (animationType) {
      case 'fadeInUp':
        element.style.transform = 'translateY(0)';
        break;
      case 'fadeInLeft':
        element.style.transform = 'translateX(0)';
        break;
      case 'fadeInRight':
        element.style.transform = 'translateX(0)';
        break;
      case 'scaleIn':
        element.style.transform = 'scale(1)';
        break;
      case 'rotateIn':
        element.style.transform = 'rotate(0deg) scale(1)';
        break;
      default:
        element.style.transform = 'translateY(0)';
        break;
    }

    // Add animated class
    element.classList.add('scroll-animated');
    this.animatedElements.add(element);

    // Trigger stagger animation for children
    this.triggerStaggerAnimation(element);
  }

  resetScrollAnimation(element) {
    if (!this.animatedElements.has(element)) return;

    const animationType = element.getAttribute('data-scroll-animation') || 'fadeInUp';
    
    element.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '0';
    
    switch (animationType) {
      case 'fadeInUp':
        element.style.transform = 'translateY(30px)';
        break;
      case 'fadeInLeft':
        element.style.transform = 'translateX(-30px)';
        break;
      case 'fadeInRight':
        element.style.transform = 'translateX(30px)';
        break;
      case 'scaleIn':
        element.style.transform = 'scale(0.9)';
        break;
      case 'rotateIn':
        element.style.transform = 'rotate(-5deg) scale(0.9)';
        break;
      default:
        element.style.transform = 'translateY(30px)';
        break;
    }

    element.classList.remove('scroll-animated');
    this.animatedElements.delete(element);
  }

  triggerStaggerAnimation(parent) {
    const children = parent.querySelectorAll('.stagger-child, .product-card, .category-card');
    children.forEach((child, index) => {
      setTimeout(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0) scale(1)';
        child.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
      }, index * 50);
    });
  }

  // Interaction animations
  initInteractionAnimations() {
    // Sidebar toggle animations
    this.setupSidebarAnimations();
    
    // Modal animations
    this.setupModalAnimations();
    
    // Dropdown animations
    this.setupDropdownAnimations();
    
    // Button interactions
    this.setupButtonAnimations();
  }

  setupSidebarAnimations() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle-btn');
    
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        this.animateSidebarToggle(sidebar);
      });
    }
  }

  animateSidebarToggle(sidebar) {
    if (!sidebar) return;

    const isExpanded = sidebar.classList.contains('sidebar-expanded');
    
    // Animate sidebar
    sidebar.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    
    // Animate sidebar items
    const items = sidebar.querySelectorAll('.sidebar-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        item.style.transform = isExpanded ? 'translateX(-10px)' : 'translateX(0)';
        item.style.opacity = isExpanded ? '0.8' : '1';
      }, index * 30);
    });

    // Animate main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  }

  setupModalAnimations() {
    // Modal open/close animations
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-trigger')) {
        this.animateModalOpen(e.target.getAttribute('data-modal'));
      }
      
      if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
        this.animateModalClose();
      }
    });
  }

  animateModalOpen(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = 'flex';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    requestAnimationFrame(() => {
      modal.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      modal.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    });

    // Animate modal content
    const content = modal.querySelector('.modal-content');
    if (content) {
      content.style.transform = 'translateY(30px)';
      setTimeout(() => {
        content.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        content.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  animateModalClose() {
    const modal = document.querySelector('.modal[style*="flex"]');
    if (!modal) return;

    modal.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }

  setupDropdownAnimations() {
    document.addEventListener('click', (e) => {
      const dropdown = e.target.closest('.dropdown-trigger');
      if (dropdown) {
        this.animateDropdown(dropdown);
      }
    });
  }

  animateDropdown(trigger) {
    const menu = trigger.querySelector('.dropdown-menu');
    if (!menu) return;

    const isOpen = menu.classList.contains('open');
    
    if (!isOpen) {
      menu.classList.add('open');
      menu.style.opacity = '0';
      menu.style.transform = 'translateY(-10px) scale(0.95)';
      
      requestAnimationFrame(() => {
        menu.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0) scale(1)';
      });
    } else {
      menu.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      menu.style.opacity = '0';
      menu.style.transform = 'translateY(-10px) scale(0.95)';
      
      setTimeout(() => {
        menu.classList.remove('open');
      }, 200);
    }
  }

  setupButtonAnimations() {
    // Add ripple effect to all buttons
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        this.createRippleEffect(e.target, e);
      }
    });
  }

  createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  // Page transition animations
  initPageTransitions() {
    // Intercept navigation for smooth transitions
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        this.animatePageTransition(link.href);
      }
    });
  }

  animatePageTransition(href) {
    const content = document.querySelector('.content-wrapper');
    if (!content) return;

    // Fade out current content
    content.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  }

  // Micro-interactions
  initMicroInteractions() {
    // Hover animations for cards
    this.setupCardHoverAnimations();
    
    // Input focus animations
    this.setupInputAnimations();
    
    // Loading animations
    this.setupLoadingAnimations();
  }

  setupCardHoverAnimations() {
    const cards = document.querySelectorAll('.product-card, .category-card, .user-card, .blog-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        
        // Animate card image
        const img = card.querySelector('img');
        if (img) {
          img.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
          img.style.transform = 'scale(1.05)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        
        const img = card.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1)';
        }
      });
    });
  }

  setupInputAnimations() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        input.style.transform = 'translateY(-2px)';
        input.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
      });
      
      input.addEventListener('blur', () => {
        input.style.transform = 'translateY(0)';
        input.style.boxShadow = 'none';
      });
    });
  }

  setupLoadingAnimations() {
    // Create loading spinner animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spinLoader {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .loading-spinner {
        animation: spinLoader 1s linear infinite;
      }
    `;
    document.head.appendChild(style);
  }

  // Utility methods
  addScrollAnimation(element, animationType = 'fadeInUp') {
    element.setAttribute('data-scroll-animation', animationType);
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(animationType);
    
    if (this.observers.has('scroll')) {
      this.observers.get('scroll').observe(element);
    }
  }

  getInitialTransform(animationType) {
    switch (animationType) {
      case 'fadeInUp': return 'translateY(30px)';
      case 'fadeInLeft': return 'translateX(-30px)';
      case 'fadeInRight': return 'translateX(30px)';
      case 'scaleIn': return 'scale(0.9)';
      case 'rotateIn': return 'rotate(-5deg) scale(0.9)';
      default: return 'translateY(30px)';
    }
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
    this.isInitialized = false;
  }
}

// CSS animations for ripple effect
const rippleCSS = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);

// Export singleton instance
const animationManager = new AnimationManager();
export default animationManager;
