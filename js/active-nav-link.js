/**
 * ============================================================
 * ACTIVE NAV LINK
 * Highlights current section while scrolling
 * Uses Intersection Observer API for performance
 * ============================================================
 */

function initializeActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.removeAttribute('aria-current');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.setAttribute('aria-current', 'location');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
  });

  sections.forEach(section => observer.observe(section));
}

// Initialize after components are loaded
document.addEventListener('componentsLoaded', initializeActiveNavLink);
// Fallback for DOMContentLoaded if page is already loaded
initializeActiveNavLink();
