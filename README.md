# NEONIFY — Spotify-style Cloudflare Worker a

A single-Worker Spotify web app with a neon interface and Spotify's official Web Playback SDK.

## Requirements

- Spotify Premium account for browser playback through the Web Playback SDK.
- A Spotify Developer app / Client ID.
- Node.js and npm for Wrangler deployment.
- A Cloudflare account.

## 1. Create a Spotify app

1. Open https://developer.spotify.com/dashboard
2. Create an app.
3. Copy its **Client ID**.
4. In the app settings, add this exact Redirect URI after deployment:
   `https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/`
5. Enable the Web API and Web Playback SDK products if the dashboard asks.

This project uses Authorization Code with PKCE. **Do not add or expose a Spotify Client Secret.**

## 2. Configure the Worker

Edit `wrangler.jsonc` and replace:

`PASTE_YOUR_SPOTIFY_CLIENT_ID_HERE`

with your Spotify Client ID.

## 3. Deploy

From this folder:

```bash
npm init -y
npm install --save-dev wrangler
npx wrangler login
npx wrangler deploy
```

Wrangler prints your Worker URL. Add that URL with a trailing slash to Spotify's Redirect URI allowlist, exactly as shown above.

If you change the Worker hostname or custom domain, update the Spotify Redirect URI to match exactly and redeploy if needed.

## 4. Open and connect

Open the Worker URL in a modern browser, choose **Continue with Spotify**, and approve the requested permissions.

## Features

- Neon responsive UI
- Spotify OAuth PKCE login and refresh
- Search tracks, albums, artists and playlists
- Browse playlists, liked songs and recent plays
- Album and playlist track listings
- Spotify Web Playback SDK device
- Play, pause, previous, next, seek, volume, shuffle and repeat

## Important limitations

- Spotify Premium is required for Web Playback SDK playback.
- Spotify account and market availability rules apply.
- The browser must support the DRM/Encrypted Media Extensions needed by Spotify.
- Playback generally requires a user gesture; mobile browsers may require an additional tap.
- Spotify may restrict API features or app access depending on its current developer-mode eligibility and quota rules.
- This project does not download, proxy, record, or redistribute Spotify audio.
- Spotify's developer terms and branding policies apply. Streaming integrations are subject to Spotify's non-commercial restrictions unless Spotify has approved otherwise.

## Security notes

This starter uses PKCE in the browser and stores OAuth access/refresh tokens in that browser's localStorage. Anyone with access to that browser profile can access that session. Use a dedicated browser profile on shared devices, and disconnect when finished. For a multi-user production deployment, use a server-side session store (such as Cloudflare KV or D1) with secure, HttpOnly cookies and review Spotify's current platform requirements.

## Troubleshooting

- **Redirect URI mismatch:** the URI in Spotify Dashboard must exactly equal `https://YOUR-WORKER.../`, including the final slash.
- **Client ID missing:** edit `SPOTIFY_CLIENT_ID` in `wrangler.jsonc`.
- **Premium/account error:** confirm the Spotify account has Premium and that playback is available in its region.
- **No audio:** check browser audio permissions, try Chrome/Edge/Firefox, and click Play after connecting.
- **API access error:** review Spotify Developer Dashboard app mode, user allowlist, quotas, and API access eligibility.
