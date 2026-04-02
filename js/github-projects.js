/**
 * ============================================================
 * GITHUB PROJECTS
 * Fetches public repositories from the GitHub REST API.
 * Uses a short local cache to stay resilient when GitHub is slow
 * or rate limited.
 * ============================================================
 */

const GITHUB_USERNAME = '0Klart';
const GITHUB_REPOS_URL =
  `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`;
const GITHUB_CACHE_KEY = `github-projects:${GITHUB_USERNAME}:v3`;
const GITHUB_CACHE_TTL_MS = 30 * 60 * 1000;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeExternalUrl(value) {
  const raw = typeof value === 'string' ? value.trim() : '';

  if (!raw) {
    return '';
  }

  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.toString()
      : '';
  } catch {
    return '';
  }
}

function formatUpdatedDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Recently updated';
  }

  return `Updated ${date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}`;
}

function readRepoCache() {
  try {
    const raw = localStorage.getItem(GITHUB_CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.repos) || typeof parsed.timestamp !== 'number') {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeRepoCache(repos) {
  try {
    localStorage.setItem(
      GITHUB_CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        repos,
      })
    );
  } catch {
    // Ignore cache write failures.
  }
}

function sortRepos(repos) {
  return [...repos]
    .filter((repo) => !repo.archived)
    .sort((a, b) => {
      if (a.fork !== b.fork) {
        return Number(a.fork) - Number(b.fork);
      }

      return new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at);
    });
}

function renderRepo(repo) {
  const description = escapeHtml(repo.description || 'Project details are maintained directly on GitHub.');
  const language = escapeHtml(repo.language || 'Mixed stack');
  const repoUrl =
    sanitizeExternalUrl(repo.html_url) ||
    `https://github.com/${encodeURIComponent(GITHUB_USERNAME)}`;
  const repoType = repo.fork
    ? '<span class="project-badge">Fork</span>'
    : '<span class="project-badge project-badge-original">Original</span>';
  const homepageUrl = sanitizeExternalUrl(repo.homepage);
  const homepage = homepageUrl
    ? `<a href="${escapeHtml(homepageUrl)}" target="_blank" rel="noopener noreferrer">Live site</a>`
    : '';

  return `
    <div class="col-sm-6 col-xl-4">
      <article class="project-card" aria-label="${escapeHtml(repo.name)} project card">
        <div class="project-card-top">
          <div class="project-title-row">
            <div class="project-name">${escapeHtml(repo.name)}</div>
            <div class="project-badges">
              ${repoType}
              <span class="project-badge">${language}</span>
            </div>
          </div>
          <div class="project-desc">${description}</div>
        </div>
        <div class="project-meta">
          <span class="project-lang">${language}</span>
          <span>${escapeHtml(formatUpdatedDate(repo.pushed_at || repo.updated_at))}</span>
        </div>
        <div class="project-link-text">
          <a href="${escapeHtml(repoUrl)}" target="_blank" rel="noopener noreferrer">View repo</a>
          ${homepage}
        </div>
      </article>
    </div>`;
}

function renderProjects(container, summary, repos, { fromCache = false } = {}) {
  const orderedRepos = sortRepos(repos);

  if (!orderedRepos.length) {
    container.innerHTML = '<div class="col-12"><p class="projects-empty">No public repositories found right now.</p></div>';
    if (summary) {
      summary.textContent = 'No public repositories were returned from GitHub.';
    }
    return;
  }

  container.innerHTML = orderedRepos.map((repo) => renderRepo(repo)).join('');

  if (summary) {
    summary.textContent = `Showing ${orderedRepos.length} public repositories from GitHub${fromCache ? ' (cached)' : ''}.`;
  }
}

async function fetchGitHubRepos() {
  const container = document.getElementById('github-projects');
  const summary = document.getElementById('projects-summary');

  if (!container) return;

  const cached = readRepoCache();
  const hasFreshCache = cached && (Date.now() - cached.timestamp) < GITHUB_CACHE_TTL_MS;

  if (hasFreshCache) {
    renderProjects(container, summary, cached.repos, { fromCache: true });
  }

  try {
    const res = await fetch(GITHUB_REPOS_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error (${res.status})`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      throw new Error('Unexpected GitHub API response');
    }

    writeRepoCache(repos);
    renderProjects(container, summary, repos);
  } catch (error) {
    if (cached?.repos?.length) {
      renderProjects(container, summary, cached.repos, { fromCache: true });
      return;
    }

    container.innerHTML = `
      <div class="col-12">
        <p class="projects-empty">
          Could not load GitHub projects.
          <a href="https://github.com/${GITHUB_USERNAME}?tab=repositories" target="_blank" rel="noopener noreferrer">View the full profile instead.</a>
        </p>
      </div>`;

    if (summary) {
      summary.textContent = 'GitHub is unavailable right now, but the full profile link is still available.';
    }

    console.error('GitHub project load failed:', error);
  }
}

document.addEventListener('componentsLoaded', fetchGitHubRepos);
fetchGitHubRepos();
