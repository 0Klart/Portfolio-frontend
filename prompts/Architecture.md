# Architecture

## Repository shape

- `index.html` is the shell page.
- `components/` contains the section partials loaded into the shell.
- `css/` contains section and shared stylesheets.
- `js/` contains browser-side behavior for component loading, navigation state, contact submission, and GitHub project rendering.

## System boundaries

- Frontend hosting target: GitHub Pages.
- Domain and DNS target: Cloudflare-managed `sebastianwallden.dev`.
- Backend hosting target: Azure App Service.
- Mail provider target: Gmail over SMTP for now.
- Primary public domain: `https://sebastianwallden.dev`.
- Alternate public domain: `https://www.sebastianwallden.dev`.

## Integration assumptions

- The frontend must work without a build step.
- Component loading relies on fetchable relative HTML files, so deployment must preserve file paths.
- Contact form behavior depends on backend CORS allowing the current frontend origin.
- Domain changes require coordination across Cloudflare DNS, GitHub Pages, backend CORS, and mail sender identity.

## Change discipline

- Keep changes localized to the section being edited.
- Prefer configuration and content changes over architectural churn.
- Only add new files when they materially improve maintainability.
- When a feature spans frontend and backend, document the coupling explicitly.
