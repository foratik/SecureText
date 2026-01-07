# SecureText (Static)

SecureText is a small client-side tool to encrypt and decrypt text locally in your browser. This repository has been converted to a static site so it can be hosted on GitHub Pages or any static hosting provider.

## What changed
- The app is fully client-side: HTML, CSS, and JavaScript only.
- No server-side component is required.
- `index.html` is at the repository root and references assets from the `static/` folder.

## How to publish on GitHub Pages
1. Create a new repository on GitHub and push this project.
2. In the repository settings, under **Pages**, choose `Branch: main` and `Folder: / (root)` (or `gh-pages` branch if you prefer).
3. Save — GitHub will publish your site at `https://<your-username>.github.io/<repo-name>/`.

Alternatively, you can host the `index.html` and `static/` folder with any static host (Netlify, Vercel, S3, etc.).

## Notes
- All assets are local in `static/` (no external CDN).
- To edit styles or scripts, modify `static/style.css` and `static/crypto.js`.
- The encryption runs entirely in the browser using the Web Crypto API; passwords and text are not sent to any server.

## Local testing
Open `index.html` in a modern browser (Chrome/Edge/Firefox). For full functionality (Web Crypto), use a secure context (GitHub Pages or `http://localhost` served by a simple static server). For quick local testing you can run a simple HTTP server from the repo root:

```powershell
# Windows PowerShell (Python 3)
python -m http.server 8000
# Then open http://localhost:8000
```

## Accessibility & UX
- Click the result box to copy its contents to the clipboard.
- Buttons automatically lose focus after interaction to avoid sticky focus rings.