# Deployment Guide - Bottarot-Share

This document explains how to deploy the Bottarot-Share Astro SSR application.

## Prerequisites

1. Node.js 20+
2. Docker (optional, for containerized deployment)
3. DNS access to configure subdomain

## Environment Variables

Create a `.env` file with:

```env
API_URL=https://backend.freetarot.fun
MAIN_SITE_URL=https://freetarot.fun
PORT=4000
HOST=0.0.0.0
```

## Local Development

```bash
cd Bottarot-Share
npm install
npm run dev
```

The dev server will start on `http://localhost:4000`.

## Production Build

```bash
npm run build
npm run start
```

## Docker Deployment

Build the Docker image:

```bash
docker build -t bottarot-share .
```

Run the container:

```bash
docker run -d \
  -p 4000:4000 \
  -e API_URL=https://backend.freetarot.fun \
  -e MAIN_SITE_URL=https://freetarot.fun \
  bottarot-share
```

## Coolify Deployment

1. Create a new application in Coolify
2. Connect to the GitHub repository
3. Set the build command: `npm run build`
4. Set the start command: `npm run start`
5. Configure environment variables:
   - `API_URL`: https://backend.freetarot.fun
   - `MAIN_SITE_URL`: https://freetarot.fun
   - `PORT`: 4000
6. Set the domain: `share.freetarot.fun`
7. Enable HTTPS

## DNS Configuration

Add a CNAME record pointing `share.freetarot.fun` to your server:

```
share.freetarot.fun  CNAME  [your-server-hostname]
```

Or an A record if using an IP:

```
share.freetarot.fun  A  [your-server-ip]
```

## Database Migration

Before the share feature works, run the migration in Supabase SQL Editor:

```sql
-- Execute the contents of:
-- Bottarot-Backend/database/migrations/004_shared_chats.sql
```

## Backend Environment

Add to `Bottarot-Backend/.env`:

```env
SHARE_URL=https://share.freetarot.fun
```

## Supabase Storage

1. Create a bucket named `share-previews` in Supabase Storage
2. Set the bucket as public
3. Add a public read policy

## Testing

After deployment, test the share flow:

1. Create a tarot reading in the main app
2. Click the Share button
3. Verify the share URL is generated
4. Visit the share URL (e.g., `https://share.freetarot.fun/abc123`)
5. Verify OG meta tags using Facebook Debugger or Twitter Card Validator

## Troubleshooting

### Share URL returns 404
- Check that the `shared_chats` table exists in Supabase
- Verify the backend `/api/shared/:shareId` endpoint is working
- Check that the share record was created in the database

### OG meta tags not showing
- Verify the Astro SSR is running (not static build)
- Check that `API_URL` environment variable is correctly set
- Test the backend API directly: `curl https://backend.freetarot.fun/api/shared/[shareId]`

### CORS errors
- Ensure the backend CORS config includes `share.freetarot.fun`
