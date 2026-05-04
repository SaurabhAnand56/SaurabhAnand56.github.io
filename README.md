# Saurabh Portfolio

A static portfolio website for a data analyst and blogger, built with HTML, CSS, and JavaScript.

The project includes:
- a responsive homepage with project highlights and skills
- a filterable blog page with post cards
- a CLI-style terminal experience
- dark/light theme toggle with persistence
- search overlay for quick navigation
- RSS feed generation from blog posts

## Project structure

```
portfolio/
├── assets/              ← profile photos and static image assets
├── css/
│   └── style.css        ← layout, theme, responsive styles
├── js/
│   └── main.js          ← theme, search, blog filter, CLI, scroll effects
├── pages/
│   ├── blog.html        ← blog listing page with filters
│   ├── cli.html         ← interactive terminal portfolio
│   └── posts/           ← individual blog post pages
├── feed.xml             ← RSS feed for blog subscribers
├── index.html           ← main portfolio landing page
├── README.md            ← this file
└── tools/
    └── generate_rss.py  ← script that builds `feed.xml` from `pages/blog.html`
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
- **RSS support** via `feed.xml` and `tools/generate_rss.py`

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

After changing blog posts, regenerate `feed.xml` with:

```bash
python tools/generate_rss.py
```

### CLI page

Edit `pages/cli.html` and `js/main.js` to change the terminal experience, available commands, and output text.

## Customize assets

Replace `assets/photo1.png` and `assets/photo2.png` with your own profile images.

## Notes

- The site is fully static and can be hosted on GitHub Pages or any static hosting provider.
- `feed.xml` is generated from the blog listing page content, so keep `pages/blog.html` up to date.
