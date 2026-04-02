# Frontend Guidelines

## Markup

- Use semantic HTML with accessible headings, labels, and link text.
- Keep section content readable without relying on animation or icons.
- Avoid placeholder copy, TODO text, and template artifacts.

## Styling

- Reuse the existing stylesheet structure.
- Prefer CSS variables and existing spacing/typography tokens before introducing new values.
- Preserve responsiveness on mobile first.
- Avoid visual clutter. The portfolio should read as deliberate and credible.

## Components

- Keep each section self-contained in its own partial.
- If a CTA is added or changed, ensure the label is action-oriented and privacy-safe.
- Prefer strong content hierarchy over decorative elements.

## JavaScript

- Keep scripts framework-free and defensive.
- Handle failed network calls gracefully with useful fallback states.
- Avoid hardcoded usernames, broken fetch flows, and fragile DOM assumptions.

## Content presentation

- Highlight outcomes, technologies, and public proof.
- Prefer concise statements backed by real work history or repository evidence.
- When listing projects, show why each project matters, not just its name.
