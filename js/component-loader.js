/**
 * ============================================================
 * COMPONENT LOADER
 * Loads HTML components and injects them into the DOM
 * ============================================================
 */

async function loadComponent(componentPath, targetId) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    
    const html = await response.text();
    const target = document.getElementById(targetId);
    
    if (target) {
      target.innerHTML = html;
    } else {
      console.warn(`Target element with ID "${targetId}" not found`);
    }
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

async function loadAllComponents() {
  const components = [
    { path: 'components/topbar.html', target: 'top-bar-container' },
    { path: 'components/navbar.html', target: 'navbar-container' },
    { path: 'components/hero.html', target: 'hero-container' },
    { path: 'components/recruiter-snapshot.html', target: 'recruiter-snapshot-container' },
    { path: 'components/about.html', target: 'about-container' },
    { path: 'components/skills.html', target: 'skills-container' },
    { path: 'components/experience.html', target: 'experience-container' },
    { path: 'components/projects.html', target: 'projects-container' },
    { path: 'components/contact.html', target: 'contact-container' },
    { path: 'components/footer.html', target: 'footer-container' },
  ];

  // Load all components in parallel
  await Promise.all(
    components.map(({ path, target }) => loadComponent(path, target))
  );

  if (window.PortfolioPreferences?.initialize) {
    window.PortfolioPreferences.initialize(document);
  }

  // Dispatch custom event when all components are loaded
  document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', loadAllComponents);
