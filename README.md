# Saurabh Portfolio

A clean, minimal developer portfolio website with dark/light mode, a functional CLI terminal, and a separate blog page.

## File Structure

```
saurabh-portfolio/
├── index.html          ← Main portfolio page
├── css/
│   └── style.css       ← All styles (dark/light tokens, components)
├── js/
│   └── main.js         ← Theme toggle, scroll dock, CLI, scroll reveal, search, blog modal
├── pages/
│   ├── blog.html       ← Blog listing page with tag filters + post modal
│   └── cli.html        ← Interactive terminal portfolio
├── assets/             ← Put your images here
│   ├── photo1.jpg      ← Profile photo (static)
│   └── photo2.jpg      ← Profile photo (hover/flip)
└── README.md
```

## Getting Started

```bash
python3 -m http.server 3000
# or
npx serve .
```

Open `http://localhost:3000` in your browser.

## Features

- **Search** — Press `⌘K` (or `Ctrl+K`) to open the command palette. Searches across pages, blog posts, skills, and social links.
- **Blog modal** — Click any blog post to read it in a full-page modal overlay.
- **CLI** — Type `help` to see commands. No auto-output on load.
- **ASCII art** — SAURABH CLI displayed on a single row in the terminal.
- **Dark/Light theme** — Persisted across sessions.

## Customizing

### 1. Your Info (index.html)
- Replace name, bio, and social links
- Update work experience, projects, education

### 2. Profile Photos
Add two photos to `/assets/`, then in `index.html` replace the `.avatar-placeholder` divs:
```html
<img src="../assets/photo1.jpg" alt="Your Name">
```

### 3. Blog Posts (pages/blog.html + js/main.js)
- Add `.blog-item` blocks in `blog.html` with a unique `data-key`
- Add matching entry in `BLOG_POSTS` object in `main.js`

### 4. Search Index (js/main.js)
- Extend `SEARCH_INDEX` array to add new pages, posts, or skills

### 5. CLI Commands (js/main.js)
- Update `CLI_DATA` object with your real info
