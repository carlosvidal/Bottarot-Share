# Bottarot-Share

Astro SSR application for sharing tarot readings publicly. Serves SEO-optimized pages with Open Graph meta tags for social media sharing.

## Overview

This service runs on `share.freetarot.fun` and renders shared tarot readings as static-like pages with full SSR for optimal SEO and social media previews.

## Features

- **SSR with Astro** - Server-side rendering for SEO optimization
- **Dynamic OG Meta Tags** - Title, description, and preview images for social sharing
- **Mobile-First Design** - Responsive layout matching the main app's aesthetic
- **Zero JavaScript** - Pure HTML/CSS output for fast loading
- **Anonymous Sharing** - No user information exposed in shared links

## Tech Stack

- [Astro 5](https://astro.build/) - Static site generator with SSR support
- [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) - Node.js adapter for SSR
- Docker - Containerized deployment

## Project Structure

```
Bottarot-Share/
├── src/
│   └── pages/
│       ├── index.astro      # Redirects to main site
│       └── [shareId].astro  # Dynamic share page
├── public/
│   ├── favicon.svg
│   └── card-placeholder.svg
├── astro.config.mjs
├── package.json
├── Dockerfile
└── DEPLOY.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_URL` | Backend API URL | `https://backend.freetarot.fun` |
| `MAIN_SITE_URL` | Main application URL | `https://freetarot.fun` |
| `PORT` | Server port | `4000` |
| `HOST` | Server host | `0.0.0.0` |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start production server
npm run start
```

## Deployment

### Docker

```bash
docker build -t bottarot-share .
docker run -d -p 4000:4000 \
  -e API_URL=https://backend.freetarot.fun \
  -e MAIN_SITE_URL=https://freetarot.fun \
  bottarot-share
```

### Coolify

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Configure environment variables
5. Set domain: `share.freetarot.fun`

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

## API Integration

This service fetches data from the main backend:

```
GET /api/shared/:shareId
```

Returns:
```json
{
  "share": {
    "title": "Reading title",
    "question": "User's question",
    "cards": [...],
    "interpretation_summary": "...",
    "created_at": "...",
    "view_count": 42
  },
  "readings": [...]
}
```

## URL Structure

- `https://share.freetarot.fun/` → Redirects to main site
- `https://share.freetarot.fun/{shareId}` → Renders shared reading

## Social Media Preview

Each shared reading generates proper meta tags:

```html
<!-- Open Graph -->
<meta property="og:title" content="Reading Title | Free Tarot Fun" />
<meta property="og:description" content="Synthesis excerpt..." />
<meta property="og:image" content="https://..." />
<meta property="og:url" content="https://share.freetarot.fun/abc123" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Reading Title | Free Tarot Fun" />
<meta name="twitter:description" content="Synthesis excerpt..." />
<meta name="twitter:image" content="https://..." />
```

## Related Projects

- [Bottarot-Backend](https://github.com/carlosvidal/Bottarot-Backend) - API server
- [Bottarot-FrontEnd](https://github.com/carlosvidal/Bottarot-FrontEnd) - Vue 3 SPA

## License

Private - All rights reserved
