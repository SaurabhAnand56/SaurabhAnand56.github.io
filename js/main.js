/* ================================================
   SAURABH PORTFOLIO — main.js
   ================================================ */

/* ── THEME ── */
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcons();
}

function updateThemeIcons() {
  const theme = document.documentElement.getAttribute('data-theme');
  document.querySelectorAll('.theme-icon').forEach(el => {
    el.innerHTML = theme === 'dark' ? sunIcon() : moonIcon();
  });
}

function sunIcon() {
  return `<svg viewBox="0 0 24 24"><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-13a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1zm0 16a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zM4.22 5.64a1 1 0 0 0 1.41-1.41l-.7-.71a1 1 0 0 0-1.42 1.42l.71.7zm14.14 12.72a1 1 0 0 0-1.41 1.41l.7.71a1 1 0 0 0 1.42-1.42l-.71-.7zM3 12a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1zm20 0a1 1 0 0 0-1-1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1zM5.63 19.78l-.7.71a1 1 0 0 0 1.41 1.41l.71-.7a1 1 0 0 0-1.42-1.42zm12.73-14.14a1 1 0 0 0 1.41-1.41l-.7-.71a1 1 0 0 0-1.42 1.42l.71.7z"/></svg>`;
}

function moonIcon() {
  return `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>`;
}

/* ── NAV SCROLL ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('top-nav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    nav.classList.toggle('hidden', window.scrollY > 120);  // hide nav when dock appears
  }
  checkDock();
}, { passive: true });

/* ── AGE CALCULATOR ── */
function updateAge() {
  const birthDate = new Date(2002, 5, 5, 0, 0, 0, 0);
  const now = new Date();
  const diffMs = now - birthDate;
  const years = diffMs / (365.25 * 24 * 60 * 60 * 1000);
  const ageText = years.toFixed(9);
  const ageEl = document.getElementById('age-text');
  if (ageEl) ageEl.textContent = ageText;
}

/* ── BOTTOM DOCK ── */
function checkDock() {
  const dock = document.getElementById('bottom-dock');
  if (!dock) return;
  dock.classList.toggle('show', window.scrollY > 120);
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}


/* ── VISITOR COUNTER ── */
function initVisitorCounter() {
  const el = document.getElementById('visitor-count');
  if (!el) return;
  let count = parseInt(localStorage.getItem('visits') || '0') + 1;
  count = Math.max(count, 1042);
  localStorage.setItem('visits', count);
  el.textContent = count.toLocaleString();
}

/* ── BLOG FILTER ── */
function initBlogFilter() {
  const btns = document.querySelectorAll('.filt-btn');
  const items = document.querySelectorAll('.blog-item');
  if (!btns.length) return;

  const updateFirstVisible = () => {
    let firstVisibleFound = false;
    items.forEach(item => {
      if (item.style.display === 'none') {
        item.classList.remove('first-visible');
      } else if (!firstVisibleFound) {
        item.classList.add('first-visible');
        firstVisibleFound = true;
      } else {
        item.classList.remove('first-visible');
      }
    });
  };

  updateFirstVisible();

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const cat = btn.dataset.cat;
      items.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
      updateFirstVisible();
      // update count
      const countEl = document.getElementById('post-count');
      const emptyEl = document.getElementById('empty-state');
      if (countEl) {
        setTimeout(() => {
          const visible = [...items].filter(i => i.style.display !== 'none').length;
          countEl.textContent = visible;
          if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
        }, 10);
      }
    });
  });
}


/* ── SEARCH ── */
// Resolve paths relative to the current page's depth
function resolvePath(rootRelPath) {
  const depth = (window.location.pathname.match(/\//g) || []).length;
  // Count how many folders deep we are from root
  // index.html = depth 1, pages/blog.html = depth 2, pages/posts/post.html = depth 3
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  // Remove filename (last part)
  const dirParts = pathParts.slice(0, -1);
  const prefix = dirParts.length === 0 ? '' : '../'.repeat(dirParts.length);
  return prefix + rootRelPath;
}

const SEARCH_INDEX = [
  // Pages
  { type: 'page', name: 'Home', desc: 'Go to homepage', rootHref: 'index.html', icon: 'home' },
  { type: 'page', name: 'Blog', desc: 'View all blog posts', rootHref: 'pages/blog.html', icon: 'blog' },
  { type: 'page', name: 'Projects', desc: 'View my projects', rootHref: 'index.html#projects', icon: 'projects' },
  { type: 'page', name: 'Contact', desc: 'Get in touch', rootHref: 'index.html#contact', icon: 'contact' },
  { type: 'page', name: 'CLI Mode', desc: 'Interactive terminal portfolio', rootHref: 'pages/cli.html', icon: 'cli' },
  // Blog posts
  { type: 'post', name: 'The Future of Data Analytics', desc: 'Data Analytics · May 2, 2025', rootHref: 'pages/posts/future-of-data-analytics.html', tag: '8 min' },
  { type: 'post', name: 'Why We Divide by n-1 in Sample Variance', desc: 'Data Science · May 3, 2026', rootHref: 'pages/posts/why-n-minus-1-variance.html', tag: '7 min' },
  { type: 'post', name: 'The Impact of AI on Data Analyst Jobs', desc: 'AI · May 3, 2026', rootHref: 'pages/posts/ai-impact-data-analyst-jobs.html', tag: '8 min' },
  { type: 'post', name: 'How a Data Analyst Can Move into Data Science', desc: 'Career · May 3, 2026', rootHref: 'pages/posts/analyst-to-data-scientist.html', tag: '9 min' },
  { type: 'post', name: 'Netflix EDA Dashboard — Python, Power BI & Streamlit', desc: 'Projects · May 2, 2026', rootHref: 'pages/posts/netflix-eda-powerbi.html', tag: '8 min' },
  { type: 'post', name: 'AI-Powered SQL Business Intelligence Assistant', desc: 'Projects · Apr 27, 2026', rootHref: 'pages/posts/ai-sql-business-intelligence.html', tag: '9 min' },
  { type: 'post', name: 'Student Lifestyle & Academic Performance Analysis', desc: 'Projects · Apr 27, 2026', rootHref: 'pages/posts/student-lifestyle-analysis.html', tag: '10 min' },
  { type: 'post', name: 'Revenue Leakage Detection & Pricing Optimization', desc: 'Projects · Apr 27, 2026', rootHref: 'pages/posts/revenue-leakage-detection.html', tag: '10 min' },
  // Skills
  { type: 'skill', name: 'Python', desc: 'Data analysis & ML pipelines', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'SQL', desc: 'CTEs, window functions, JOINs', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Power BI', desc: 'Dashboards & KPI reporting', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Tableau', desc: 'Interactive data visualization', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Pandas', desc: 'Data manipulation & cleaning', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Scikit-learn', desc: 'Machine learning models', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Streamlit', desc: 'Live web app deployment', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Gemini AI', desc: 'Text-to-SQL & AI integration', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Matplotlib', desc: 'Data visualization & charts', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Seaborn', desc: 'Statistical data visualization', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Excel', desc: 'Pivot tables & dashboards', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'SQLite', desc: 'Lightweight relational database', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'MySQL', desc: 'Relational database management', rootHref: 'index.html#skills', tag: 'Skill' },
  { type: 'skill', name: 'Git', desc: 'Version control & collaboration', rootHref: 'index.html#skills', tag: 'Skill' },
  // Social
  { type: 'social', name: 'GitHub', desc: 'View my code', rootHref: 'https://github.com/SaurabhAnand56', tag: 'Social' },
  { type: 'social', name: 'Twitter / X', desc: 'Follow for updates', rootHref: 'https://x.com/Saurabh_Anand56', tag: 'Social' },
  { type: 'social', name: 'LinkedIn', desc: 'Professional profile', rootHref: 'https://www.linkedin.com/in/saurabhanand56', tag: 'Social' },
].map(item => ({
  ...item,
  href: item.rootHref.startsWith('http') ? item.rootHref : resolvePath(item.rootHref)
}));

const PAGE_ICONS = {
  home: `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  blog: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
  projects: `<svg viewBox="0 0 24 24"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/></svg>`,
  contact: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  cli: `<svg viewBox="0 0 24 24"><path d="m8 5-1.5 1.5L11 11l-4.5 4.5L8 17l6-6zm5 10h6v2h-6z"/></svg>`,
  post: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>`,
  skill: `<svg viewBox="0 0 24 24"><path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
  social: `<svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>`
};

function getItemIcon(item) {
  if (item.type === 'page') return PAGE_ICONS[item.icon] || PAGE_ICONS.home;
  if (item.type === 'post') return PAGE_ICONS.post;
  if (item.type === 'skill') return PAGE_ICONS.skill;
  if (item.type === 'social') return PAGE_ICONS.social;
  return PAGE_ICONS.home;
}

function initSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;

  const inp = document.getElementById('search-inp');
  const resultsEl = document.getElementById('search-results');
  let activeIdx = -1;
  let currentResults = [];

  function openSearch() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => inp && inp.focus(), 80);
    renderResults('');
  }

  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (inp) inp.value = '';
  }

  function scoreItem(item, q) {
    const name = item.name.toLowerCase();
    const desc = (item.desc || '').toLowerCase();
    if (name.startsWith(q)) return 3;
    if (name.includes(q)) return 2;
    if (desc.includes(q)) return 1;
    return 0;
  }

  function renderResults(query) {
    const q = query.toLowerCase().trim();
    activeIdx = -1;

    let filtered = q
      ? SEARCH_INDEX.filter(item => scoreItem(item, q) > 0)
          .sort((a, b) => scoreItem(b, q) - scoreItem(a, q))
      : SEARCH_INDEX.filter(i => i.type === 'page');

    currentResults = filtered;

    if (filtered.length === 0) {
      resultsEl.innerHTML = `<div class="search-no-results">No results for "<strong>${query}</strong>"</div>`;
      return;
    }

    // Group by type if no query
    if (!q) {
      const groups = { page: [], post: [], skill: [], social: [] };
      filtered.forEach(item => { if (groups[item.type]) groups[item.type].push(item); });
      let html = '';
      const labels = { page: 'Pages', post: 'Blog Posts', skill: 'Skills', social: 'Social' };
      for (const [type, items] of Object.entries(groups)) {
        if (!items.length) continue;
        html += `<div class="search-section-label">${labels[type]}</div>`;
        items.forEach((item, i) => {
          html += buildResultItem(item, filtered.indexOf(item));
        });
      }
      resultsEl.innerHTML = html;
    } else {
      resultsEl.innerHTML = filtered.map((item, i) => buildResultItem(item, i)).join('');
    }

    attachResultListeners();
  }

  function buildResultItem(item, idx) {
    return `<a class="search-result-item" data-idx="${idx}" href="${item.href}">
      <div class="search-result-icon">${getItemIcon(item)}</div>
      <div class="search-result-text">
        <div class="search-result-name">${item.name}</div>
        <div class="search-result-desc">${item.desc || ''}</div>
      </div>
      ${item.tag ? `<span class="search-result-tag">${item.tag}</span>` : ''}
    </a>`;
  }

  function attachResultListeners() {
    document.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        setActive(parseInt(el.dataset.idx));
      });
      el.addEventListener('click', () => {
        closeSearch();
      });
    });
  }

  function setActive(idx) {
    activeIdx = idx;
    document.querySelectorAll('.search-result-item').forEach(el => {
      el.classList.toggle('active', parseInt(el.dataset.idx) === idx);
    });
  }

  inp.addEventListener('input', () => renderResults(inp.value));

  inp.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIdx + 1, currentResults.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    }
    if (e.key === 'Enter') {
      if (activeIdx >= 0 && currentResults[activeIdx]) {
        window.location.href = currentResults[activeIdx].href;
      } else if (currentResults.length > 0) {
        window.location.href = currentResults[0].href;
      }
      closeSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

  // Keyboard shortcut: Cmd+K / Ctrl+K
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('open') ? closeSearch() : openSearch();
    }
  });

  // Wire up search trigger buttons
  document.querySelectorAll('[data-search-trigger]').forEach(btn => {
    btn.addEventListener('click', openSearch);
  });

  document.querySelectorAll('.search-close-btn').forEach(btn => {
    btn.addEventListener('click', closeSearch);
  });

  const mobileNavToggle = document.getElementById('nav-toggle');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');

  function closeMobileNav() {
    if (mobileNavPanel) {
      mobileNavPanel.classList.remove('open');
      mobileNavPanel.setAttribute('aria-hidden', 'true');
    }
    if (mobileNavToggle) {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function initMobileNav() {
    if (!mobileNavToggle || !mobileNavPanel) return;

    mobileNavToggle.addEventListener('click', () => {
      const open = mobileNavPanel.classList.toggle('open');
      mobileNavPanel.setAttribute('aria-hidden', String(!open));
      mobileNavToggle.setAttribute('aria-expanded', String(open));
    });

    mobileNavPanel.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', closeMobileNav);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 580) closeMobileNav();
    });
  }

  initMobileNav();
}

/* ── CLI EMULATOR ── */
const CLI_DATA = {
  help: () => [
    { type: 'blank' },
    { type: 'text', label: 'help     (h, ?)', val: ' - Show this help message' },
    { type: 'text', label: 'about    (a)',     val: ' - Display information about me' },
    { type: 'text', label: 'skills   (s)',     val: ' - List my technical skills' },
    { type: 'text', label: 'projects (p, ls)', val: ' - List my projects' },
    { type: 'text', label: 'edu',              val: '      - Show my education' },
    { type: 'text', label: 'contact  (c)',     val: ' - Display contact information' },
    { type: 'text', label: 'social',           val: '   - Show social media links' },
    { type: 'text', label: 'clear',            val: '    - Clear the terminal' },
    { type: 'text', label: 'gui      (g)',     val: ' - Switch to GUI mode' },
    { type: 'blank' },
    { type: 'dim', val: 'Tip: Use ↑↓ for command history · Tab to autocomplete' },
    { type: 'blank' },
  ],
about: () => [
  { type: 'blank' },
  { type: 'kv', key: 'Name   ', val: 'Saurabh Anand' },
  { type: 'kv', key: 'Role   ', val: 'Data Analyst' },
  { type: 'kv', key: 'Status ', val: '🟢 Open to Work' },
  { type: 'kv', key: 'Location', val: 'Hyderabad, India' },
  { type: 'kv', key: 'Bio    ', val: 'I turn raw data into decisions that matter.' },
  { type: 'blank' },
],
skills: () => [
  { type: 'blank' },
  { type: 'green', val: 'Technical Skills:' },
  { type: 'kv', key: 'Languages  ', val: 'Python · SQL' },
  { type: 'kv', key: 'Libraries  ', val: 'Pandas · NumPy · Scikit-learn · Matplotlib · Seaborn' },
  { type: 'kv', key: 'BI & Viz   ', val: 'Power BI · Tableau · Excel · Streamlit' },
  { type: 'kv', key: 'ML         ', val: 'Random Forest · Gradient Boosting · K-Means · PCA' },
  { type: 'kv', key: 'Databases  ', val: 'SQLite · MySQL · PostgreSQL · CTEs · Window Functions' },
  { type: 'kv', key: 'AI & Tools ', val: 'Gemini AI API · Git · Jupyter · VS Code' },
  { type: 'blank' },
],
projects: () => [
  { type: 'blank' },
  { type: 'green', val: 'Featured Projects:' },
  { type: 'blank' },
  { type: 'kv', key: '01 Revenue Leakage Detection  ', val: 'Python · SQL · Gemini AI · Tableau · Streamlit' },
  { type: 'kv', key: '02 Student Performance ML     ', val: 'Python · Scikit-learn · Power BI · Streamlit' },
  { type: 'kv', key: '03 AI SQL BI Assistant        ', val: 'Python · SQL · Gemini AI · Streamlit' },
  { type: 'kv', key: '04 Netflix EDA Dashboard      ', val: 'Python · Pandas · Power BI · Scikit-learn' },
  { type: 'blank' },
],
edu: () => [
  { type: 'blank' },
  { type: 'green', val: 'Education:' },
  { type: 'kv', key: 'Degree ', val: 'MCA — Maharshi Dayanand University, Rohtak' },
  { type: 'kv', key: 'CGPA   ', val: '8.1' },
  { type: 'kv', key: 'Period ', val: '2023 — 2025' },
  { type: 'blank' },
  { type: 'kv', key: 'Degree ', val: 'BCA — Patliputra University, Patna' },
  { type: 'kv', key: 'Score  ', val: '67%' },
  { type: 'kv', key: 'Period ', val: '2020 — 2023' },
  { type: 'blank' },
],
  contact: () => [
    { type: 'blank' },
    { type: 'green', val: 'Get in touch:' },
    { type: 'kv', key: 'Email  ', val: 'saurabhcimage@gmail.com' },
    { type: 'kv', key: 'GitHub ', val: 'github.com/SaurabhAnand56' },
    { type: 'kv', key: 'X (Twitter)', val: '@Saurabh_Anand56' },
    { type: 'blank' },
  ],
  social: () => [
    { type: 'blank' },
    { type: 'kv', key: 'GitHub  ', val: 'https://github.com/SaurabhAnand56' },
    { type: 'kv', key: 'Twitter ', val: 'https://x.com/Saurabh_Anand56' },
    { type: 'kv', key: 'LinkedIn', val: 'https://www.linkedin.com/in/saurabhanand56/' },
    { type: 'blank' },
  ],
};

const CLI_ALIASES = { h: 'help', '?': 'help', a: 'about', s: 'skills', p: 'projects', ls: 'projects', c: 'contact', g: 'gui', v: 'version' };

function initCLI() {
  const outputEl = document.getElementById('cli-output');
  const inputEl = document.getElementById('cli-input');
  if (!outputEl || !inputEl) return;

  let history = [];
  let histIdx = -1;

  function renderLines(lines) {
    lines.forEach(line => {
      const div = document.createElement('div');
      div.className = 'cli-line';
      if (line.type === 'blank') { div.className = 'c-blank'; }
      else if (line.type === 'text') {
        div.innerHTML = `<span class="c-key">${line.label}</span><span class="c-val">${line.val}</span>`;
      } else if (line.type === 'kv') {
        div.innerHTML = `<span class="c-key">${line.key}</span><span style="color:rgba(255,255,255,.3)"> : </span><span class="c-val">${line.val}</span>`;
      } else if (line.type === 'green') {
        div.innerHTML = `<span class="c-green">${line.val}</span>`;
      } else if (line.type === 'dim') {
        div.innerHTML = `<span class="c-dim">${line.val}</span>`;
      }
      outputEl.appendChild(div);
    });
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function appendPrompt(cmd) {
    const div = document.createElement('div');
    div.className = 'cli-line';
    div.innerHTML = `<span class="c-prompt">saurabh@portfolio:~$</span> <span class="c-cmd">${escapeHtml(cmd)}</span>`;
    outputEl.appendChild(div);
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.unshift(raw.trim());
    histIdx = -1;
    appendPrompt(raw.trim());
    const resolved = CLI_ALIASES[cmd] || cmd;
    if (resolved === 'clear') { outputEl.innerHTML = ''; return; }
    if (resolved === 'gui') { window.location.href = '../index.html'; return; }
    if (resolved === 'version') {
      renderLines([{ type: 'blank' }, { type: 'green', val: 'Saurabh Portfolio CLI v1.0.0' }, { type: 'blank' }]);
      return;
    }
    if (CLI_DATA[resolved]) { renderLines(CLI_DATA[resolved]()); return; }
    renderLines([
      { type: 'blank' },
      { type: 'dim', val: `command not found: ${cmd}. Type "help" for available commands.` },
      { type: 'blank' },
    ]);
  }

  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      inputEl.value = '';
      runCommand(val);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; inputEl.value = history[histIdx]; }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; inputEl.value = history[histIdx]; }
      else { histIdx = -1; inputEl.value = ''; }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const all = [...Object.keys(CLI_DATA), ...Object.keys(CLI_ALIASES)];
      const match = all.find(k => k.startsWith(inputEl.value));
      if (match) inputEl.value = match;
    }
  });

  document.querySelector('.cli-body')?.addEventListener('click', () => inputEl.focus());
  inputEl.focus();

  // Show welcome message ONLY — no auto-help
  renderLines([
    { type: 'blank' },
    { type: 'dim', val: 'Welcome to my portfolio CLI! 👋' },
    { type: 'blank' },
    { type: 'dim', val: 'Type "help" or "?" to see available commands.' },
    { type: 'blank' },
  ]);

  const promptSpan = document.querySelector('.cli-live-prompt');
  if (promptSpan) promptSpan.innerHTML = `<span class="c-prompt">saurabh@portfolio:~$</span> `;
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcons();
  updateAge();
  setInterval(updateAge, 100);
  initReveal();
  initVisitorCounter();
  initBlogFilter();
  
  initCLI();
  initSearch();
  checkDock();
});
