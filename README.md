# 🔐 SecureText: Client-Side Text Encryption (Static)

**SecureText** is a lightweight, secure, **fully client-side** tool for encrypting and decrypting text directly in your browser.
No backend, no data transmission, no tracking. everything happens locally.

🌐 **Live deployments:**

* **GitHub Pages:**
  [https://enc.sforati.ir](https://enc.sforati.ir)
* **Iran-based internal server (works on domestic networks):**
  [https://encrypt.sforati.ir](https://encrypt.sforati.ir)

> The internal deployment ensures accessibility even when international internet access is restricted.

---

## ✨ Features

*  **Secure by design** — uses the browser’s native **Web Crypto API**
*  **100% client-side** — no servers, no APIs, no data leakage
*  **Static & portable** — hostable on GitHub Pages or any static host
*  **Fast & lightweight**
*  **Works on internal networks**
*  **One-click copy to clipboard**
*  **No external CDN dependencies**

---

## 🛡️ Security Model

* All encryption and decryption happens **locally in your browser**
* Plain text and passwords:

  * ❌ are NOT sent to any server
  * ❌ are NOT stored
  * ❌ are NOT logged
* Uses standards-based cryptography via `window.crypto.subtle`
* Fully open source and auditable

> ⚠️ Users are responsible for choosing strong passwords.

---

## Project Structure

```text
.
├── index.html
└── static/
    ├── style.css
    └── crypto.js
```

* The project is **purely static**
* ❗ No secrets, keys, tokens, or environment-specific values should ever be committed to the repository

---

## 🚀 Usage

1. Open the website
2. Enter the text you want to encrypt or decrypt
3. Choose a password
4. Click **Encrypt** or **Decrypt**
5. Click the output box to copy the result

---

## 🖥️ Local Development

For local testing, SecureText must run in a **secure context**.

### Recommended:

```bash
# Python 3
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

> Opening `index.html` directly via `file://` may disable the Web Crypto API.

---

## 🌍 Deploying on GitHub Pages

1. Fork or clone this repository
2. Go to **Settings → Pages**
3. Configure:

   * Branch: `main`
   * Folder: `/ (root)`
4. Save

Your site will be available at:

```
https://<username>.github.io/<repository-name>/
```

---

## Development Guidelines

* Keep cryptography browser-native (Web Crypto API only)
* Pull requests and improvements are welcome
