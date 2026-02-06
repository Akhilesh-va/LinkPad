# LinkPad

**A privacy-first, zero-backend shareable text editor.** Everything lives in the URL—no server, no database, no account. Share the link to share the document.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

---

## Why LinkPad?

- **Private** — Nothing is sent to any server. Your text never leaves your browser except in the URL you choose to share.
- **Simple** — One page, one editor. No sign-up, no sync, no config.
- **Shareable** — Copy the link and send it. The recipient sees exactly what you wrote.

Use it for quick notes, snippets, instructions, or anything you want to share via a single link.

---

## How it works

The editor content is encoded (Base64 + URI encoding) and stored in the URL hash (`#...`). When you type, the URL updates after a short debounce. When someone opens the link, the app reads the hash, decodes it, and restores the text. **The URL is the only storage**—no backend, no localStorage, no IndexedDB.

---

## Features

- Full-page text editor with responsive layout (mobile & desktop)
- **Copy Share Link** — copies the current URL to the clipboard
- **Clear** — resets the editor and removes the hash from the URL
- Character count and URL length indicator (with a warning when the URL gets too long)
- Light/Dark mode toggle
- No backend, no API, no database, no cookies

---

## Quick start

**Prerequisites:** Node.js 18+

```bash
git clone "https://github.com/Akhilesh-va/LinkPad"
cd LinkPad
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`). Type something—the URL will update. Copy the link and open it in another tab or send it to someone to see the same text.

### Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build to `dist/` |
| `npm run preview` | Preview production build |

---


## Tech stack

- **React 18** — UI
- **Vite 5** — build and dev server
- **Vanilla CSS** — styling (no UI framework)

No backend, no external APIs, no persistence other than the URL.

---

## Contributing

Contributions are welcome. Please open an issue to discuss bigger changes, or send a pull request for bug fixes and small improvements.

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-idea`)
3. Commit your changes (`git commit -m 'Add something'`)
4. Push to the branch (`git push origin feature/your-idea`)
5. Open a Pull Request

---

## License

MIT © Akhilesh Singh Maurya. See [LICENSE](LICENSE) for details.
