/**
 * ============================================================
 * GITHUB PROJECTS
 * Fetches your public pinned/top repos from the GitHub REST API.
 * TODO: Replace GITHUB_USERNAME with your actual username.
 * ============================================================
 */

const GITHUB_USERNAME = 'YOUR_GITHUB_USERNAME'; // <-- TODO: change this

async function fetchGitHubRepos() {
  const container = document.getElementById('github-projects');
  
  if (!container) return;
  
  try {
    // const res = await fetch(
    //   `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=public`
    // );
    
    if (!res.ok) throw new Error('GitHub API error');
    
    const repos = await res.json();

    if (!repos.length) {
      container.innerHTML = '<p class="projects-empty">No public repositories found.</p>';
      return;
    }

    container.innerHTML = repos.map(repo => `
      <div class="col-sm-6 col-lg-4">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
           class="project-card" aria-label="${repo.name} — ${repo.description || 'GitHub repository'}">
          <div class="project-name">📁 ${repo.name}</div>
          <div class="project-desc">${repo.description || 'No description provided.'}</div>
          <div class="project-meta">
            <span class="project-lang">${repo.language || '—'}</span>
            <span>⭐ ${repo.stargazers_count}</span>
          </div>
        </a>
      </div>
    `).join('');

  } catch (err) {
    container.innerHTML = `
      <div class="col-12">
        <p class="projects-empty">
          Could not load GitHub projects. 
          <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
        </p>
      </div>`;
  }
}

// Initialize after components are loaded
document.addEventListener('componentsLoaded', fetchGitHubRepos);
// Fallback for DOMContentLoaded if page is already loaded
fetchGitHubRepos();
