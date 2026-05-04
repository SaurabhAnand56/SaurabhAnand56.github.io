# Saurabh Portfolio

Personal static portfolio website for a data analyst and blogger.
This repository contains only the public website source; local helper files such as a `tools/` folder are intentionally excluded from GitHub via `.gitignore`.

The project includes:
- a responsive homepage with project highlights and skills
- a filterable blog page with post cards
- a CLI-style terminal experience
- a dark/light theme toggle persisted in the browser
- a search overlay for quick navigation
- a published RSS feed file (`feed.xml`)

## Project structure

```
portfolio/
├── assets/              ← profile photos and static image assets
├── css/
│   └── style.css        ← layout, theme, responsive styles
├── js/
│   └── main.js          ← theme, search, blog filter, CLI, scroll effects
├── pages/
│   ├── blog.html        ← blog listing page with category filters
│   ├── cli.html         ← interactive terminal portfolio
│   └── posts/           ← individual blog post pages
├── feed.xml             ← RSS feed for blog subscribers
├── index.html           ← main portfolio landing page
├── README.md            ← this file
└── .gitignore           ← excludes local-only files like `tools/`
```

## Run locally

Serve the folder over HTTP and open it in a browser. Example:

```bash
python -m http.server 3000
```

Then visit:

```text
http://localhost:3000
```

## Key features

- **Responsive portfolio homepage** with hero section, skills, projects, and contact links
- **Dark / light theme toggle** saved in `localStorage`
- **Search command palette** opened by `⌘K` / `Ctrl+K`
- **Blog page with category filters** and post count tracking
- **CLI page** with terminal-style interaction and custom commands
- **RSS feed** file is published as `feed.xml`; helper scripts can be kept locally in an ignored `tools/` folder

## Editing content

### Homepage

Update `index.html` to change:
- hero text and biography
- social links
- featured project cards
- skill tags
- contact section

### Blog

Add or edit blog entries in `pages/blog.html`:
- each post is an `<a class="blog-item" ...>` block
- update title, category, excerpt, and date
- point the link to the corresponding file in `pages/posts/`

### RSS feed

The published RSS feed is stored in `feed.xml`.
If you keep a local `tools/` folder, it can contain a script for regenerating the feed, but that folder is not pushed to GitHub.

### CLI page

Edit `pages/cli.html` and `js/main.js` to change the terminal experience, available commands, and output text.

## Customize assets

Replace `assets/photo1.png` and `assets/photo2.png` with your own profile images.

## Notes

- The site is fully static and can be hosted on GitHub Pages or any static hosting provider.
- This repo intentionally keeps local helper files out of version control; only the public website files are committed.
