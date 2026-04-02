# Deployment

## Frontend

- Primary deployment target is GitHub Pages.
- Public domain is managed in Cloudflare.
- Live public URL is `https://sebastianwallden.dev`.
- Relative asset and component paths must remain valid when hosted from either a project site path or a future custom domain.
- If the live domain changes again, update any explicit GitHub Pages references accordingly.

## Backend dependency

- The contact form depends on the Azure-hosted API.
- Frontend origin changes require a matching `Cors__AllowedOrigins` update in the backend.
- Production mail settings belong in Azure App Service configuration, not the frontend repository.

## Mail

- Current provider is Gmail over SMTP through the backend.
- Sender identity can move to the future custom domain once acquired.
- Avoid coupling frontend copy to a provider-specific implementation detail.

## Release checklist

- Verify Cloudflare DNS points the live domain to GitHub Pages.
- Verify GitHub Pages custom domain and HTTPS are active.
- Verify contact form submission from the deployed frontend.
- Verify GitHub projects load with a working fallback.
- Verify all public links open the intended public destination.
- Verify mobile layout after content changes.
