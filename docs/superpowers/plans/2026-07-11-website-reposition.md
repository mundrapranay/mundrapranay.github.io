# Website Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition mundrapranay.github.io into a full research portfolio (Home · Work · Publications · Experience · Writing · CV) with all key content in static HTML and full SEO metadata, on the existing visual style.

**Architecture:** Static HTML pages carry all important content in the server response. `data/*.json` remains the human-editable source of truth, hand-mirrored into the HTML. `main.js` is trimmed from a content renderer to UI-behavior-only (theme, nav injection, mobile menu, scroll effects, publication tag filters). No build step; the site is served as static files on GitHub Pages.

**Tech Stack:** Plain HTML5, CSS (custom properties in `assets/css/main.css`), vanilla JS (`assets/js/main.js`), JSON data files. Local verification via `python3 -m http.server`.

**Spec:** `docs/superpowers/specs/2026-07-11-website-reposition-design.md`

## Global Constraints

- **Positioning:** Foreground algorithms + differential privacy; do NOT lead with ML. ML systems is present (eBay GNN) but never the headline.
- **Hero headline (verbatim):** `I build algorithms and systems that make computation private, scalable, and fast.`
- **Hero eyebrow (verbatim):** `Ph.D. Candidate at Yale · Applied Researcher Intern at eBay`
- **Compact expertise line (verbatim):** `Algorithms · Differential Privacy · Distributed & High-Performance Computing · ML Systems · C++/CUDA`
- **Nav = exactly:** Work · Publications · Experience · Writing · CV (Home via `PM` logo). No Teaching anywhere.
- **All important text must appear in the static HTML** (verifiable via `curl` with no JS). JSON files are updated in parallel as the source of truth.
- **Authors:** render "Pranay Mundra" in **bold** wherever author lists appear.
- **Existing visual style retained.** Reuse existing CSS classes/variables; only add new component CSS where a new structure requires it. No palette/typography redesign this phase.
- **CSS tokens available:** `--bg-primary/-secondary/-accent`, `--text-primary/-secondary/-muted`, `--accent`, `--accent-hover`, `--accent-light`, `--border`, `--shadow-sm/-md/-lg`, `--font-display/-body/-mono`, `--space-xs(0.75rem)/-sm(1.25rem)/-md(2.5rem)/-lg(5rem)/-xl(8rem)`, `--ease-out`.
- **Confirmed facts:** LAPRAS = accepted ICML 2026 (a publication); SeDa = accepted VLDB 2026 (public link available); eBay = current/ongoing, non-confidential framing; NeurIPS reviewer = 2026.
- **Pending facts (spec §9):** grad year, SeDa URL, LAPRAS URL, featured repo URL(s), resume-PDF status. Rule: if a value is provided, insert it; if not, **omit the element entirely — never render a visible placeholder like "TBD".** Known: LEDP code = `https://zenodo.org/records/15741880`.
- **Commit after every task.** Work on `master` (clean at stable HEAD; prior WIP preserved on `dev`).

## Verification harness (used by every task)

From the repo root, start a static server once per session:

```bash
python3 -m http.server 8000 >/tmp/pm-http.log 2>&1 &
```

"Static content present" is verified by fetching a page and grepping the **raw HTML** (no JS runs), e.g.:

```bash
curl -s http://localhost:8000/index.html | grep -F "make computation private, scalable, and fast"
```

A match proves the content is server-rendered (SEO-visible). Absence = failure.

## Appendix A — Shared header markup (paste into every page's `<body>` top)

Every page uses this identical header/nav/mobile-nav block. The nav `<ul id="nav-links">` and mobile list are injected by `main.js` from `site.json`; keep the single hardcoded Home/logo. Paste verbatim, changing only which nav link gets `class="active"` — for static pages we let JS set `active`, so no manual active class is needed here.

```html
<header>
    <div class="header-content">
        <a href="index.html" class="logo">PM</a>
        <nav>
            <ul class="nav-links" id="nav-links"></ul>
            <button class="theme-toggle" aria-label="Toggle dark mode">
                <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            <button class="menu-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
        </nav>
    </div>
    <div class="mobile-nav" id="mobile-nav">
        <ul id="mobile-nav-links"></ul>
        <div class="mobile-nav-footer">
            <div class="mobile-nav-socials" id="mobile-socials"></div>
        </div>
    </div>
</header>
<div class="mobile-nav-backdrop" id="mobile-backdrop"></div>
```

> Note: the current pages hardcode `<li><a href="index.html">About</a></li>` inside `#nav-links`/`#mobile-nav-links`. Replace those with the empty `<ul>`s above so JS injects the new nav cleanly and there is no stale "About" link.

## Appendix B — Shared footer markup (paste at the end of every page's `<body>`, before `<script>`)

```html
<footer>
    <div class="container">
        <div class="footer-content">
            <div class="footer-links" id="footer-links"></div>
            <p>&copy; <span id="year"></span> Pranay Mundra. Built with care.</p>
        </div>
    </div>
</footer>
<script src="assets/js/main.js"></script>
```

## Appendix C — Shared `<head>` template

Each page's `<head>` follows this shape. Replace the four ALL-CAPS slots per page (values given in each task). `URL` is the absolute canonical page URL under `https://mundrapranay.github.io/`.

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PAGE_TITLE</title>
<meta name="description" content="PAGE_DESCRIPTION">
<link rel="canonical" href="CANONICAL_URL">
<!-- Open Graph -->
<meta property="og:type" content="OG_TYPE">
<meta property="og:title" content="PAGE_TITLE">
<meta property="og:description" content="PAGE_DESCRIPTION">
<meta property="og:url" content="CANONICAL_URL">
<meta property="og:image" content="https://mundrapranay.github.io/assets/images/profile.png">
<!-- Twitter -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="PAGE_TITLE">
<meta name="twitter:description" content="PAGE_DESCRIPTION">
<meta name="twitter:image" content="https://mundrapranay.github.io/assets/images/profile.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/main.css">
```

---

### Task 1: Site foundations — navigation, positioning data, Teaching removal, robots/sitemap

**Files:**
- Modify: `data/site.json`
- Delete: `teaching.html`, `data/teaching.json`
- Create: `robots.txt`, `sitemap.xml`

**Interfaces:**
- Produces: `site.json` `navigation` array consumed by `main.js` `initNavigation()`; author `social` object consumed by footer/hero social injection.

- [ ] **Step 1: Rewrite `data/site.json`**

```json
{
  "title": "Pranay Mundra",
  "description": "Ph.D. candidate at Yale and Applied Researcher Intern at eBay working on algorithms, differential privacy, distributed and high-performance computing, and ML systems.",
  "author": {
    "name": "Pranay Mundra",
    "avatar": "assets/images/profile.png",
    "bio": "Ph.D. candidate at Yale · Applied Researcher Intern at eBay. Algorithms, differential privacy, distributed & high-performance computing, ML systems.",
    "employer": "eBay",
    "location": "New Haven, CT",
    "email": "pranay.mundra@yale.edu",
    "social": {
      "email": "pranay.mundra@yale.edu",
      "github": "mundrapranay",
      "twitter": "MundraPranay",
      "linkedin": "pranay-mundra",
      "googlescholar": "https://scholar.google.com/citations?user=7IJcHDwAAAAJ&hl=en",
      "orcid": "https://orcid.org/0000-0002-6727-1505"
    }
  },
  "navigation": [
    { "title": "Work", "url": "work.html" },
    { "title": "Publications", "url": "publications.html" },
    { "title": "Experience", "url": "experience.html" },
    { "title": "Writing", "url": "writing.html" },
    { "title": "CV", "url": "cv.html" }
  ]
}
```

- [ ] **Step 2: Delete Teaching artifacts**

```bash
git rm teaching.html data/teaching.json
```

- [ ] **Step 3: Create `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://mundrapranay.github.io/sitemap.xml
```

- [ ] **Step 4: Create `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://mundrapranay.github.io/</loc><priority>1.0</priority></url>
  <url><loc>https://mundrapranay.github.io/work.html</loc><priority>0.9</priority></url>
  <url><loc>https://mundrapranay.github.io/publications.html</loc><priority>0.9</priority></url>
  <url><loc>https://mundrapranay.github.io/experience.html</loc><priority>0.8</priority></url>
  <url><loc>https://mundrapranay.github.io/writing.html</loc><priority>0.5</priority></url>
  <url><loc>https://mundrapranay.github.io/cv.html</loc><priority>0.7</priority></url>
</urlset>
```

- [ ] **Step 5: Verify**

```bash
python3 -c "import json;json.load(open('data/site.json'))" && echo "site.json valid"
python3 -c "import xml.dom.minidom,pathlib;xml.dom.minidom.parseString(pathlib.Path('sitemap.xml').read_text());print('sitemap valid')"
test ! -e teaching.html && test ! -e data/teaching.json && echo "teaching removed"
```
Expected: all three lines print success.

- [ ] **Step 6: Commit**

```bash
git add data/site.json robots.txt sitemap.xml
git commit -m "Site foundations: new nav + positioning, remove Teaching, add robots/sitemap"
```

---

### Task 2: Home page — static hero, about, research themes, selected-work preview, JSON-LD

**Files:**
- Modify: `index.html` (full rewrite of `<head>` + `<body>` content sections)
- Modify: `data/about.json` (sync source of truth to new positioning)

**Interfaces:**
- Consumes: shared header (Appendix A), footer (Appendix B), head template (Appendix C).
- Produces: anchor targets on `work.html` (`#lapras`, `#ledp`, `#ebay`) linked from the preview cards (created in Task 3).

- [ ] **Step 1: Replace `index.html` `<head>`** using Appendix C with:
  - `PAGE_TITLE` = `Pranay Mundra — Algorithms, Differential Privacy, Distributed Systems & Quantitative Research`
  - `PAGE_DESCRIPTION` = `Pranay Mundra is a Yale Computer Science Ph.D. candidate and eBay applied researcher working on algorithms, differential privacy, distributed machine learning, graph systems, and high-performance computing.`
  - `CANONICAL_URL` = `https://mundrapranay.github.io/`
  - `OG_TYPE` = `website`

  Then, immediately before `</head>`, add the JSON-LD block:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Pranay Mundra",
    "url": "https://mundrapranay.github.io/",
    "image": "https://mundrapranay.github.io/assets/images/profile.png",
    "jobTitle": "Ph.D. Candidate; Applied Researcher Intern",
    "affiliation": { "@type": "CollegeOrUniversity", "name": "Yale University" },
    "worksFor": { "@type": "Organization", "name": "eBay" },
    "alumniOf": [
      { "@type": "CollegeOrUniversity", "name": "University of Rochester" },
      { "@type": "CollegeOrUniversity", "name": "University of Washington" }
    ],
    "knowsAbout": ["Algorithms", "Differential Privacy", "Distributed Systems", "High-Performance Computing", "Graph Algorithms", "Machine Learning Systems"],
    "sameAs": [
      "https://github.com/mundrapranay",
      "https://scholar.google.com/citations?user=7IJcHDwAAAAJ&hl=en",
      "https://www.linkedin.com/in/pranay-mundra",
      "https://orcid.org/0000-0002-6727-1505",
      "https://twitter.com/MundraPranay"
    ]
  }
}
</script>
```

- [ ] **Step 2: Replace the `<body>` header** with Appendix A markup (removes the stale hardcoded "About" nav links).

- [ ] **Step 3: Replace the hero section** with static content:

```html
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <div class="hero-text">
        <span class="hero-label">Ph.D. Candidate at Yale · Applied Researcher Intern at eBay</span>
        <h1>I build algorithms and systems that make computation <span class="highlight">private, scalable, and fast</span>.</h1>
        <p class="hero-subtitle">My work spans differential privacy, distributed and high-performance computing, graph learning, semantic search, and learning-augmented algorithms — turning mathematically rigorous ideas into practical systems with measurable performance gains.</p>
        <div class="hero-cta">
          <a href="work.html" class="btn btn-primary">View Selected Work
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="files/resume.pdf" class="btn btn-secondary" download>Download Resume</a>
          <a href="mailto:pranay.mundra@yale.edu" class="btn btn-secondary">Email Me</a>
        </div>
        <p class="hero-expertise">Algorithms · Differential Privacy · Distributed &amp; High-Performance Computing · ML Systems · C++/CUDA</p>
        <div class="hero-socials" id="hero-socials">
          <a href="https://github.com/mundrapranay" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
          <a href="https://scholar.google.com/citations?user=7IJcHDwAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg></a>
          <a href="https://www.linkedin.com/in/pranay-mundra" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z"/></svg></a>
          <a href="mailto:pranay.mundra@yale.edu" aria-label="Email"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
        </div>
      </div>
      <div class="hero-image">
        <img src="assets/images/profile.png" alt="Portrait of Pranay Mundra" id="profile-image">
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Replace the About section** with static copy:

```html
<section class="about-section section" id="about">
  <div class="container">
    <div class="about-full animate-on-scroll">
      <h2>About</h2>
      <div id="about-text">
        <p>I am a Ph.D. candidate in Computer Science at Yale University and an Applied Researcher Intern at eBay. My research sits at the intersection of algorithms, differential privacy, distributed and high-performance systems, and machine learning.</p>
        <p>I have developed distributed differentially private graph algorithms with substantially improved empirical accuracy, learning-augmented methods for private online analytics, scalable semantic-search systems, neural architectures for mathematical reasoning, and GPU-accelerated scientific software. My work has appeared at venues including VLDB, ICDE, and SIGMOD, with research experience across Yale, MIT CSAIL, Caltech, the University of Rochester, and the University of Washington.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Replace the Skills section with a Research-themes section:**

```html
<section class="themes-section section" id="research">
  <div class="container">
    <div class="skills-header animate-on-scroll">
      <h2>Research Themes</h2>
      <p>Three threads run through my work.</p>
    </div>
    <div class="themes-grid">
      <article class="theme-card animate-on-scroll">
        <h3>Algorithms under uncertainty</h3>
        <p>Learning-augmented, randomized, and privacy-preserving algorithms that stay robust when predictions or assumptions are imperfect.</p>
      </article>
      <article class="theme-card animate-on-scroll">
        <h3>High-performance &amp; distributed computing</h3>
        <p>Parallel algorithms, CUDA acceleration, communication-aware evaluation, and systems that bridge research code with efficient execution.</p>
      </article>
      <article class="theme-card animate-on-scroll">
        <h3>Large-scale machine-learning systems</h3>
        <p>Distributed graph learning, sparse representations, recommendation infrastructure, and performance-oriented model training.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Replace the Featured Publications section with a Selected-work preview:**

```html
<section class="selected-work section" id="selected-work">
  <div class="container">
    <div class="skills-header animate-on-scroll">
      <h2>Selected Work</h2>
      <p>A few results that show what I build.</p>
    </div>
    <div class="work-preview-grid">
      <a class="work-card animate-on-scroll" href="work.html#lapras">
        <h3>LAPRAS</h3>
        <p>Learning-augmented private online analytics: approaches offline utility when workload predictions are accurate, degrading gracefully when they are not.</p>
        <span class="work-tags">Online Algorithms · Differential Privacy · Optimization</span>
      </a>
      <a class="work-card animate-on-scroll" href="work.html#ledp">
        <h3>Local Edge-DP Graph Algorithms</h3>
        <p>Distributed private k-core and triangle counting: within 3× error for k-core and up to six orders of magnitude lower triangle-counting error than prior baselines.</p>
        <span class="work-tags">Graph Algorithms · Distributed Systems · Privacy</span>
      </a>
      <a class="work-card animate-on-scroll" href="work.html#ebay">
        <h3>eBay Graph Learning</h3>
        <p>Distributed GNN training pipelines over large user-behavior graphs for recommendation, with a focus on sparsity, latency, throughput, and convergence.</p>
        <span class="work-tags">GNNs · PyTorch · Distributed ML</span>
      </a>
    </div>
    <div class="text-center animate-on-scroll" style="margin-top: var(--space-md);">
      <a href="work.html" class="btn btn-secondary">View All Work</a>
    </div>
  </div>
</section>
```

- [ ] **Step 7: Ensure footer** matches Appendix B (it already does; confirm `<script src="assets/js/main.js"></script>` remains).

- [ ] **Step 8: Add new component CSS** to the end of `assets/css/main.css`:

```css
/* ---------- Home: hero extras, themes, work preview ---------- */
.hero-expertise {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: var(--space-xs) 0 var(--space-sm);
  max-width: none;
  letter-spacing: 0;
}
.themes-grid, .work-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-sm);
}
.theme-card, .work-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: var(--space-sm);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}
.work-card { display: block; color: inherit; }
.work-card:hover, .theme-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  color: inherit;
}
.work-tags {
  display: block;
  margin-top: var(--space-xs);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}
```

- [ ] **Step 9: Update `data/about.json`** so the source of truth matches. Replace its contents with:

```json
{
  "intro": "I am a Ph.D. candidate in Computer Science at Yale University and an Applied Researcher Intern at eBay. My research sits at the intersection of algorithms, differential privacy, distributed and high-performance systems, and machine learning.",
  "sections": [
    {
      "title": "Research",
      "content": [
        "I have developed distributed differentially private graph algorithms with substantially improved empirical accuracy, learning-augmented methods for private online analytics, scalable semantic-search systems, neural architectures for mathematical reasoning, and GPU-accelerated scientific software. My work has appeared at venues including VLDB, ICDE, and SIGMOD, with research experience across Yale, MIT CSAIL, Caltech, the University of Rochester, and the University of Washington."
      ]
    }
  ]
}
```

- [ ] **Step 10: If** the user has provided a Ph.D. graduation year, append ` · Ph.D. expected <YEAR>` to the `.hero-label` text. If not provided, leave the eyebrow as-is (no placeholder).

- [ ] **Step 11: Verify (static content in raw HTML)**

```bash
curl -s http://localhost:8000/index.html | grep -F "make computation" | head -1
curl -s http://localhost:8000/index.html | grep -F "Research Themes"
curl -s http://localhost:8000/index.html | grep -F "Selected Work"
curl -s http://localhost:8000/index.html | grep -F "application/ld+json"
curl -s http://localhost:8000/index.html | grep -F "og:title"
python3 -c "import json;json.load(open('data/about.json'));print('about.json valid')"
```
Expected: each grep prints a matching line; `about.json valid` prints.

- [ ] **Step 12: Commit**

```bash
git add index.html data/about.json assets/css/main.css
git commit -m "Home: static hero/about/themes/selected-work + JSON-LD and SEO head"
```

---

### Task 3: Work page — 6 case studies (new page + data)

**Files:**
- Create: `work.html`
- Create: `data/work.json`
- Modify: `assets/css/main.css` (append case-study styles)

**Interfaces:**
- Consumes: shared header/footer/head (Appendices A/B/C).
- Produces: anchor ids `#lapras`, `#ledp`, `#ebay`, `#koios`, `#treesmu`, `#gpu` targeted by Home preview cards.

- [ ] **Step 1: Create `data/work.json`** (source of truth):

```json
[
  { "id": "lapras", "title": "LAPRAS", "subtitle": "Learning-augmented private online analytics",
    "problem": "Answering a stream of private queries well requires spending a fixed privacy budget wisely under uncertainty about future demand.",
    "contribution": "Uses predicted query workloads and adaptive budget allocation via the Matrix Mechanism to approach offline utility when predictions are accurate while degrading gracefully when they are not.",
    "result": "Accepted at ICML 2026.",
    "venue": "ICML 2026", "paperurl": "", "code": "",
    "tags": ["Online Algorithms", "Differential Privacy", "Optimization"] },
  { "id": "ledp", "title": "Practical Local Edge-DP Graph Algorithms", "subtitle": "Distributed private graph analytics",
    "problem": "Computing graph statistics under strong local edge differential privacy usually destroys accuracy at scale.",
    "contribution": "Distributed algorithms for k-core decomposition and triangle counting with input-sensitive guarantees based on graph degeneracy and maximum degree.",
    "result": "Within 3× error for k-core (vs a 131× baseline) and up to six orders of magnitude lower triangle-counting error, evaluated on billion-edge graphs.",
    "venue": "VLDB 2025", "paperurl": "https://arxiv.org/abs/2506.20828", "code": "https://zenodo.org/records/15741880",
    "tags": ["Graph Algorithms", "Distributed Systems", "Privacy"] },
  { "id": "ebay", "title": "eBay Graph Learning", "subtitle": "Large-scale recommendation infrastructure",
    "problem": "Recommendation over massive user-behavior graphs needs GNN training that stays fast and stable at production scale.",
    "contribution": "Engineering distributed GNN training pipelines over large user-behavior graphs, with emphasis on sparse representations, latency, throughput, and convergence.",
    "result": "Ongoing applied research (described at a public, non-confidential level).",
    "venue": "eBay", "paperurl": "", "code": "",
    "tags": ["GNNs", "PyTorch", "Distributed ML"] },
  { "id": "koios", "title": "KOIOS", "subtitle": "Exact semantic set search",
    "problem": "Top-k semantic overlap set search is accurate but historically too slow for large corpora.",
    "contribution": "A filter–verification system using bipartite-matching bounds to prune candidates without sacrificing exactness.",
    "result": "5.5× speedup over prior methods; published at ICDE 2023.",
    "venue": "ICDE 2023", "paperurl": "https://arxiv.org/pdf/2304.10572", "code": "",
    "tags": ["Algorithms", "Search", "Graph Matching"] },
  { "id": "treesmu", "title": "Tree-SMU", "subtitle": "Compositional generalization for mathematical reasoning",
    "problem": "Standard sequence models generalize poorly to the compositional structure of mathematical expressions.",
    "contribution": "Co-developed a recursive neural architecture (Tree Stack Memory Units) that models compositional structure explicitly.",
    "result": "Outperformed Transformer, Tree Transformer, and Tree-LSTM baselines across four evaluations.",
    "venue": "arXiv 2019", "paperurl": "https://arxiv.org/pdf/1911.01545", "code": "",
    "tags": ["Deep Learning", "Reasoning", "Representation Learning"] },
  { "id": "gpu", "title": "GPU-Accelerated Gene Network Modeling", "subtitle": "Scientific computing with CUDA",
    "problem": "Gene-network analysis kernels were too slow to run at the scale experiments demanded.",
    "contribution": "Parallelized the core computational kernels on the GPU to make the system suitable for larger experimental workloads.",
    "result": "Enabled substantially larger gene-network experiments.",
    "venue": "Research software", "paperurl": "", "code": "",
    "tags": ["CUDA", "C++", "Scientific Computing"] }
]
```

- [ ] **Step 2: Create `work.html`.** Use Appendix C head with `PAGE_TITLE`=`Selected Work — Pranay Mundra`, `PAGE_DESCRIPTION`=`Case studies in differential privacy, distributed graph algorithms, high-performance computing, and ML systems by Pranay Mundra.`, `CANONICAL_URL`=`https://mundrapranay.github.io/work.html`, `OG_TYPE`=`website`. Body = Appendix A header, then the section below, then Appendix B footer. **Every case study's text is written statically** (mirroring `work.json`):

```html
<section class="work-page section" style="padding-top: 120px;">
  <div class="container">
    <div class="page-intro animate-on-scroll">
      <h1>Selected Work</h1>
      <p>I design algorithms and build systems that make machine learning, graph analytics, and privacy-preserving computation more accurate, scalable, and practical. Below are representative projects across my three research themes.</p>
    </div>

    <article class="case-study animate-on-scroll" id="lapras">
      <h2>LAPRAS</h2>
      <p class="case-subtitle">Learning-augmented private online analytics</p>
      <p><strong>Problem.</strong> Answering a stream of private queries well requires spending a fixed privacy budget wisely under uncertainty about future demand.</p>
      <p><strong>Contribution.</strong> Uses predicted query workloads and adaptive budget allocation via the Matrix Mechanism to approach offline utility when predictions are accurate while degrading gracefully when they are not.</p>
      <p><strong>Result.</strong> Accepted at ICML 2026.</p>
      <p class="case-meta"><span class="case-venue">ICML 2026</span></p>
      <span class="work-tags">Online Algorithms · Differential Privacy · Optimization</span>
    </article>

    <article class="case-study animate-on-scroll" id="ledp">
      <h2>Practical Local Edge-DP Graph Algorithms</h2>
      <p class="case-subtitle">Distributed private graph analytics</p>
      <p><strong>Problem.</strong> Computing graph statistics under strong local edge differential privacy usually destroys accuracy at scale.</p>
      <p><strong>Contribution.</strong> Distributed algorithms for k-core decomposition and triangle counting with input-sensitive guarantees based on graph degeneracy and maximum degree.</p>
      <p><strong>Result.</strong> Within 3× error for k-core (vs a 131× baseline) and up to six orders of magnitude lower triangle-counting error, evaluated on billion-edge graphs.</p>
      <p class="case-meta"><span class="case-venue">VLDB 2025</span>
        <a href="https://arxiv.org/abs/2506.20828" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">Paper</a>
        <a href="https://zenodo.org/records/15741880" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">Code</a>
      </p>
      <span class="work-tags">Graph Algorithms · Distributed Systems · Privacy</span>
    </article>

    <article class="case-study animate-on-scroll" id="ebay">
      <h2>eBay Graph Learning</h2>
      <p class="case-subtitle">Large-scale recommendation infrastructure</p>
      <p><strong>Problem.</strong> Recommendation over massive user-behavior graphs needs GNN training that stays fast and stable at production scale.</p>
      <p><strong>Contribution.</strong> Engineering distributed GNN training pipelines over large user-behavior graphs, with emphasis on sparse representations, latency, throughput, and convergence.</p>
      <p><strong>Result.</strong> Ongoing applied research, described at a public, non-confidential level.</p>
      <p class="case-meta"><span class="case-venue">eBay · 2025–present</span></p>
      <span class="work-tags">GNNs · PyTorch · Distributed ML</span>
    </article>

    <article class="case-study animate-on-scroll" id="koios">
      <h2>KOIOS</h2>
      <p class="case-subtitle">Exact semantic set search</p>
      <p><strong>Problem.</strong> Top-k semantic overlap set search is accurate but historically too slow for large corpora.</p>
      <p><strong>Contribution.</strong> A filter–verification system using bipartite-matching bounds to prune candidates without sacrificing exactness.</p>
      <p><strong>Result.</strong> 5.5× speedup over prior methods; published at ICDE 2023.</p>
      <p class="case-meta"><span class="case-venue">ICDE 2023</span>
        <a href="https://arxiv.org/pdf/2304.10572" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">Paper</a>
      </p>
      <span class="work-tags">Algorithms · Search · Graph Matching</span>
    </article>

    <article class="case-study animate-on-scroll" id="treesmu">
      <h2>Tree-SMU</h2>
      <p class="case-subtitle">Compositional generalization for mathematical reasoning</p>
      <p><strong>Problem.</strong> Standard sequence models generalize poorly to the compositional structure of mathematical expressions.</p>
      <p><strong>Contribution.</strong> Co-developed a recursive neural architecture (Tree Stack Memory Units) that models compositional structure explicitly.</p>
      <p><strong>Result.</strong> Outperformed Transformer, Tree Transformer, and Tree-LSTM baselines across four evaluations.</p>
      <p class="case-meta"><span class="case-venue">arXiv 2019</span>
        <a href="https://arxiv.org/pdf/1911.01545" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">Paper</a>
      </p>
      <span class="work-tags">Deep Learning · Reasoning · Representation Learning</span>
    </article>

    <article class="case-study animate-on-scroll" id="gpu">
      <h2>GPU-Accelerated Gene Network Modeling</h2>
      <p class="case-subtitle">Scientific computing with CUDA</p>
      <p><strong>Problem.</strong> Gene-network analysis kernels were too slow to run at the scale experiments demanded.</p>
      <p><strong>Contribution.</strong> Parallelized the core computational kernels on the GPU to make the system suitable for larger experimental workloads.</p>
      <p><strong>Result.</strong> Enabled substantially larger gene-network experiments.</p>
      <p class="case-meta"><span class="case-venue">Research software</span></p>
      <span class="work-tags">CUDA · C++ · Scientific Computing</span>
    </article>
  </div>
</section>
```

> Pending-fact rule: LAPRAS `paperurl` is empty here; when the user supplies the arXiv URL, add a `Paper` button to the LAPRAS `case-meta` identical in form to the LEDP one, and set `paperurl` in `work.json`.

- [ ] **Step 3: Append case-study CSS** to `assets/css/main.css`:

```css
/* ---------- Work / case studies ---------- */
.page-intro { max-width: 75ch; margin-bottom: var(--space-md); }
.case-study {
  border-top: 1px solid var(--border);
  padding: var(--space-md) 0;
}
.case-study h2 { margin-bottom: 0.25rem; }
.case-subtitle {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}
.case-meta {
  display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
  margin: var(--space-sm) 0 0.75rem;
}
.case-venue { font-weight: 600; color: var(--text-primary); }
.btn-sm { padding: 0.35rem 0.8rem; font-size: 0.8rem; }
```

- [ ] **Step 4: Verify**

```bash
python3 -c "import json;json.load(open('data/work.json'));print('work.json valid')"
curl -s http://localhost:8000/work.html | grep -F "six orders of magnitude"
curl -s http://localhost:8000/work.html | grep -F 'id="lapras"'
curl -s http://localhost:8000/work.html | grep -F "canonical"
```
Expected: `work.json valid` + three matching lines.

- [ ] **Step 5: Commit**

```bash
git add work.html data/work.json assets/css/main.css
git commit -m "Work page: six static case studies + data source"
```

---

### Task 4: Publications page — full static list, enriched data, tag filters

**Files:**
- Modify: `data/publications.json` (add fields + LAPRAS + SeDa link)
- Modify: `publications.html` (static list + filter UI + SEO head)
- Modify: `assets/css/main.css` (append pub + filter styles)

**Interfaces:**
- Consumes: shared header/footer/head.
- Produces: `.pub-item[data-tags]` elements + `.pub-filter[data-tag]` buttons consumed by `initPublicationFilters()` (Task 8).

- [ ] **Step 1: Rewrite `data/publications.json`** adding `contribution` + `tags`, adding LAPRAS, and giving SeDa its confirmed venue/link. If the user has not yet supplied the SeDa URL, leave `paperurl` `""` (the Paper button is omitted when empty).

```json
[
  {
    "id": "lapras",
    "title": "LAPRAS: Learning-Augmented Private Online Analytics",
    "authors": ["Pranay Mundra", "Quanquan C. Liu"],
    "venue": "International Conference on Machine Learning (ICML)",
    "year": 2026,
    "paperurl": "",
    "github": "",
    "slides": "",
    "contribution": "Learning-augmented online algorithm that uses workload predictions and adaptive budget allocation to approach offline utility for private analytics.",
    "tags": ["Algorithms", "Privacy", "ML Systems"]
  },
  {
    "id": "seda",
    "title": "SeDa: Bridging the Gap between Efficient Syntactic and Precise Semantic Search of Similar Passages in Large Text Corpora",
    "authors": ["Pranay Mundra", "Daniel Kocher", "Martin Schäler", "Nikolaus Augsten"],
    "venue": "Very Large Data Bases (VLDB)",
    "year": 2026,
    "paperurl": "",
    "github": "",
    "slides": "",
    "contribution": "Combines efficient syntactic filtering with precise semantic verification for scalable similar-passage search over large text corpora.",
    "tags": ["Search", "Data Systems", "Algorithms"]
  },
  {
    "id": "ledp",
    "title": "Practical and Accurate Local Edge Differentially Private Graph Algorithms",
    "authors": ["Pranay Mundra", "Charalampos Papamanthou", "Julian Shun", "Quanquan C. Liu"],
    "venue": "Very Large Data Bases (VLDB)",
    "year": 2025,
    "paperurl": "https://arxiv.org/abs/2506.20828",
    "github": "https://zenodo.org/records/15741880",
    "slides": "files/VLDB2025_Slides.pdf",
    "contribution": "Distributed local edge-DP k-core and triangle counting with input-sensitive accuracy, within 3× error for k-core and orders of magnitude lower triangle error.",
    "tags": ["Privacy", "Algorithms", "Data Systems"]
  },
  {
    "id": "aqp",
    "title": "Approximate Query Answering over Open Data",
    "authors": ["Mengqi Zhang", "Pranay Mundra", "Chukwubuikem Chikweze", "Fatemeh Nargesian", "Gerhard Weikum"],
    "venue": "Human-In-Loop Data Analytics (HILDA)",
    "year": 2023,
    "paperurl": "https://dl.acm.org/doi/pdf/10.1145/3597465.3605227",
    "github": "",
    "slides": "",
    "contribution": "Approximate aggregate query answering over noisy, incomplete open knowledge.",
    "tags": ["Data Systems", "Algorithms"]
  },
  {
    "id": "koios",
    "title": "KOIOS: Top-K Semantic Overlap Set Search",
    "authors": ["Pranay Mundra", "Jianhao Zhang", "Fatemeh Nargesian", "Nikolaus Augsten"],
    "venue": "IEEE International Conference on Data Engineering (ICDE)",
    "year": 2023,
    "paperurl": "https://arxiv.org/pdf/2304.10572",
    "github": "",
    "slides": "",
    "contribution": "Exact top-k semantic set search via bipartite-matching bounds and filter–verification, 5.5× faster than prior methods.",
    "tags": ["Search", "Algorithms", "Data Systems"]
  },
  {
    "id": "maimon",
    "title": "Mining Approximate Acyclic Schemas from Relations",
    "authors": ["Batya Kenig", "Pranay Mundra", "Guna Prasaad", "Babak Salimi", "Dan Suciu"],
    "venue": "ACM SIGMOD International Conference on Management of Data",
    "year": 2020,
    "paperurl": "https://dl.acm.org/doi/pdf/10.1145/3318464.3380573",
    "github": "",
    "slides": "",
    "contribution": "Information-theoretic pruning for approximate acyclic schema discovery from relations using multivalued dependencies.",
    "tags": ["Data Systems", "Algorithms"]
  },
  {
    "id": "treesmu",
    "title": "Compositional Generalization with Tree Stack Memory Units",
    "authors": ["Forough Arabshahi", "Zhichu Lu", "Pranay Mundra", "Sameer Singh", "Animashree Anandkumar"],
    "venue": "arXiv preprint",
    "year": 2019,
    "paperurl": "https://arxiv.org/pdf/1911.01545",
    "github": "",
    "slides": "",
    "contribution": "Recursive neural architecture for compositional generalization in mathematical reasoning, beating Transformer/Tree-LSTM baselines.",
    "tags": ["ML Systems", "Algorithms"]
  }
]
```

- [ ] **Step 2: Rewrite `publications.html` body content.** Head via Appendix C: `PAGE_TITLE`=`Publications — Pranay Mundra`, `PAGE_DESCRIPTION`=`Peer-reviewed publications by Pranay Mundra in differential privacy, algorithms, graph systems, search, and data systems (VLDB, ICDE, SIGMOD, ICML).`, `CANONICAL_URL`=`https://mundrapranay.github.io/publications.html`, `OG_TYPE`=`website`. Header = Appendix A. Then the static list (every entry hardcoded, newest first; Pranay bold; Paper/Code/Slides buttons only where the URL is non-empty; tag filter bar):

```html
<section class="publications-page section" style="padding-top: 120px;">
  <div class="container">
    <div class="page-intro animate-on-scroll">
      <h1>Publications</h1>
      <p>Peer-reviewed work spanning differential privacy, algorithms, graph and data systems, and search.</p>
    </div>

    <div class="pub-filters" id="pub-filters">
      <button class="pub-filter is-active" data-tag="all">All</button>
      <button class="pub-filter" data-tag="Algorithms">Algorithms</button>
      <button class="pub-filter" data-tag="Privacy">Privacy</button>
      <button class="pub-filter" data-tag="ML Systems">ML Systems</button>
      <button class="pub-filter" data-tag="Search">Search</button>
      <button class="pub-filter" data-tag="Data Systems">Data Systems</button>
    </div>

    <ul class="publications-list" id="publications-list">
      <li class="pub-item animate-on-scroll" id="lapras" data-tags="Algorithms,Privacy,ML Systems">
        <div class="publication-title">LAPRAS: Learning-Augmented Private Online Analytics</div>
        <div class="publication-authors"><strong>Pranay Mundra</strong>, Quanquan C. Liu</div>
        <div class="publication-venue">International Conference on Machine Learning (ICML), <span class="publication-year">2026</span></div>
        <div class="publication-contribution">Learning-augmented online algorithm that uses workload predictions and adaptive budget allocation to approach offline utility for private analytics.</div>
        <div class="pub-tags">Algorithms · Privacy · ML Systems</div>
      </li>

      <li class="pub-item animate-on-scroll" id="seda" data-tags="Search,Data Systems,Algorithms">
        <div class="publication-title">SeDa: Bridging the Gap between Efficient Syntactic and Precise Semantic Search of Similar Passages in Large Text Corpora</div>
        <div class="publication-authors"><strong>Pranay Mundra</strong>, Daniel Kocher, Martin Schäler, Nikolaus Augsten</div>
        <div class="publication-venue">Very Large Data Bases (VLDB), <span class="publication-year">2026</span></div>
        <div class="publication-contribution">Combines efficient syntactic filtering with precise semantic verification for scalable similar-passage search over large text corpora.</div>
        <div class="pub-tags">Search · Data Systems · Algorithms</div>
      </li>

      <li class="pub-item animate-on-scroll" id="ledp" data-tags="Privacy,Algorithms,Data Systems">
        <div class="publication-title"><a href="https://arxiv.org/abs/2506.20828" target="_blank" rel="noopener noreferrer">Practical and Accurate Local Edge Differentially Private Graph Algorithms</a></div>
        <div class="publication-authors"><strong>Pranay Mundra</strong>, Charalampos Papamanthou, Julian Shun, Quanquan C. Liu</div>
        <div class="publication-venue">Very Large Data Bases (VLDB), <span class="publication-year">2025</span></div>
        <div class="publication-contribution">Distributed local edge-DP k-core and triangle counting with input-sensitive accuracy, within 3× error for k-core and orders of magnitude lower triangle error.</div>
        <div class="pub-links">
          <a href="https://arxiv.org/abs/2506.20828" target="_blank" rel="noopener noreferrer">Paper</a>
          <a href="https://zenodo.org/records/15741880" target="_blank" rel="noopener noreferrer">Code</a>
          <a href="files/VLDB2025_Slides.pdf" target="_blank" rel="noopener noreferrer">Slides</a>
        </div>
        <div class="pub-tags">Privacy · Algorithms · Data Systems</div>
      </li>

      <li class="pub-item animate-on-scroll" id="aqp" data-tags="Data Systems,Algorithms">
        <div class="publication-title"><a href="https://dl.acm.org/doi/pdf/10.1145/3597465.3605227" target="_blank" rel="noopener noreferrer">Approximate Query Answering over Open Data</a></div>
        <div class="publication-authors">Mengqi Zhang, <strong>Pranay Mundra</strong>, Chukwubuikem Chikweze, Fatemeh Nargesian, Gerhard Weikum</div>
        <div class="publication-venue">Human-In-Loop Data Analytics (HILDA), <span class="publication-year">2023</span></div>
        <div class="publication-contribution">Approximate aggregate query answering over noisy, incomplete open knowledge.</div>
        <div class="pub-links"><a href="https://dl.acm.org/doi/pdf/10.1145/3597465.3605227" target="_blank" rel="noopener noreferrer">Paper</a></div>
        <div class="pub-tags">Data Systems · Algorithms</div>
      </li>

      <li class="pub-item animate-on-scroll" id="koios" data-tags="Search,Algorithms,Data Systems">
        <div class="publication-title"><a href="https://arxiv.org/pdf/2304.10572" target="_blank" rel="noopener noreferrer">KOIOS: Top-K Semantic Overlap Set Search</a></div>
        <div class="publication-authors"><strong>Pranay Mundra</strong>, Jianhao Zhang, Fatemeh Nargesian, Nikolaus Augsten</div>
        <div class="publication-venue">IEEE International Conference on Data Engineering (ICDE), <span class="publication-year">2023</span></div>
        <div class="publication-contribution">Exact top-k semantic set search via bipartite-matching bounds and filter–verification, 5.5× faster than prior methods.</div>
        <div class="pub-links"><a href="https://arxiv.org/pdf/2304.10572" target="_blank" rel="noopener noreferrer">Paper</a></div>
        <div class="pub-tags">Search · Algorithms · Data Systems</div>
      </li>

      <li class="pub-item animate-on-scroll" id="maimon" data-tags="Data Systems,Algorithms">
        <div class="publication-title"><a href="https://dl.acm.org/doi/pdf/10.1145/3318464.3380573" target="_blank" rel="noopener noreferrer">Mining Approximate Acyclic Schemas from Relations</a></div>
        <div class="publication-authors">Batya Kenig, <strong>Pranay Mundra</strong>, Guna Prasaad, Babak Salimi, Dan Suciu</div>
        <div class="publication-venue">ACM SIGMOD International Conference on Management of Data, <span class="publication-year">2020</span></div>
        <div class="publication-contribution">Information-theoretic pruning for approximate acyclic schema discovery from relations using multivalued dependencies.</div>
        <div class="pub-links"><a href="https://dl.acm.org/doi/pdf/10.1145/3318464.3380573" target="_blank" rel="noopener noreferrer">Paper</a></div>
        <div class="pub-tags">Data Systems · Algorithms</div>
      </li>

      <li class="pub-item animate-on-scroll" id="treesmu" data-tags="ML Systems,Algorithms">
        <div class="publication-title"><a href="https://arxiv.org/pdf/1911.01545" target="_blank" rel="noopener noreferrer">Compositional Generalization with Tree Stack Memory Units</a></div>
        <div class="publication-authors">Forough Arabshahi, Zhichu Lu, <strong>Pranay Mundra</strong>, Sameer Singh, Animashree Anandkumar</div>
        <div class="publication-venue">arXiv preprint, <span class="publication-year">2019</span></div>
        <div class="publication-contribution">Recursive neural architecture for compositional generalization in mathematical reasoning, beating Transformer/Tree-LSTM baselines.</div>
        <div class="pub-links"><a href="https://arxiv.org/pdf/1911.01545" target="_blank" rel="noopener noreferrer">Paper</a></div>
        <div class="pub-tags">ML Systems · Algorithms</div>
      </li>
    </ul>
  </div>
</section>
```

- [ ] **Step 3: Append pub/filter CSS** to `assets/css/main.css`:

```css
/* ---------- Publications ---------- */
.pub-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: var(--space-md); }
.pub-filter {
  font-family: var(--font-mono); font-size: 0.75rem;
  padding: 0.35rem 0.8rem; border: 1px solid var(--border);
  border-radius: 999px; background: var(--bg-secondary);
  color: var(--text-secondary); cursor: pointer; transition: all 0.2s var(--ease-out);
}
.pub-filter:hover { border-color: var(--accent); color: var(--accent); }
.pub-filter.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }
.pub-item { border-top: 1px solid var(--border); padding: var(--space-sm) 0; list-style: none; }
.pub-item[hidden] { display: none; }
.publication-contribution { color: var(--text-secondary); margin: 0.4rem 0; }
.pub-links { display: flex; gap: 0.9rem; margin: 0.4rem 0; }
.pub-links a { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent); }
.pub-tags { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
```

- [ ] **Step 4: Verify**

```bash
python3 -c "import json;d=json.load(open('data/publications.json'));print(len(d),'pubs valid')"
curl -s http://localhost:8000/publications.html | grep -F "LAPRAS: Learning-Augmented"
curl -s http://localhost:8000/publications.html | grep -c "pub-item"   # expect 7
curl -s http://localhost:8000/publications.html | grep -F "<strong>Pranay Mundra</strong>" | head -1
```
Expected: `7 pubs valid`, LAPRAS line, count `7`, a bold-author line.

- [ ] **Step 5: Commit**

```bash
git add publications.html data/publications.json assets/css/main.css
git commit -m "Publications: full static list with contributions, tags, LAPRAS, filter UI"
```

---

### Task 5: Experience page — chronological timeline (new page + data)

**Files:**
- Create: `experience.html`, `data/experience.json`
- Modify: `assets/css/main.css` (append timeline styles)

**Interfaces:** Consumes shared header/footer/head. Standalone page.

- [ ] **Step 1: Create `data/experience.json`** (source of truth):

```json
[
  { "org": "eBay", "role": "Applied Researcher Intern", "date": "2025 – present",
    "story": "Engineering distributed graph neural network training over large user-behavior graphs for recommendation, focusing on sparse representations, latency, throughput, and convergence.",
    "link": "work.html#ebay", "linkText": "Project" },
  { "org": "Yale University", "role": "Graduate Research Assistant", "date": "2023 – present",
    "story": "Designed distributed local edge-DP algorithms for k-core decomposition and triangle counting, and developed LAPRAS, a learning-augmented framework for private online query answering.",
    "link": "work.html#ledp", "linkText": "Project" },
  { "org": "MIT CSAIL", "role": "Graduate Summer Researcher", "date": "2023",
    "story": "Built a benchmark suite for privacy-preserving graph algorithms in parallel and distributed settings, evaluating accuracy, runtime, scalability, and communication trade-offs.",
    "link": "", "linkText": "" },
  { "org": "University of Rochester Medical Center", "role": "Research Data Engineer II", "date": "2021 – 2022",
    "story": "Built storage and retrieval workflows for large sequencing datasets and led open-source software for reproducible microglia image analysis.",
    "link": "", "linkText": "" },
  { "org": "University of Rochester", "role": "Graduate Research Assistant", "date": "2020 – 2022",
    "story": "Built KOIOS, an exact top-k semantic set-search system (5.5× speedup, ICDE 2023), and designed a fair coreset-selection method with a 400× speedup retaining 70% accuracy on 24% of the data.",
    "link": "work.html#koios", "linkText": "Project" },
  { "org": "Caltech", "role": "Undergraduate ML Researcher", "date": "2019",
    "story": "Co-developed Tree Stack Memory Units for compositional generalization in mathematical reasoning, outperforming Transformer, Tree Transformer, and Tree-LSTM baselines.",
    "link": "work.html#treesmu", "linkText": "Project" },
  { "org": "University of Washington", "role": "Undergraduate Research Assistant", "date": "2017 – 2020",
    "story": "Built a high-performance Python/Boost.Python interface for LightDB and developed information-theoretic pruning for approximate dependency discovery (SIGMOD 2020).",
    "link": "publications.html#maimon", "linkText": "Paper" }
]
```

- [ ] **Step 2: Create `experience.html`.** Head via Appendix C: `PAGE_TITLE`=`Experience — Pranay Mundra`, `PAGE_DESCRIPTION`=`Research and engineering experience of Pranay Mundra across eBay, Yale, MIT CSAIL, University of Rochester, Caltech, and the University of Washington.`, `CANONICAL_URL`=`https://mundrapranay.github.io/experience.html`, `OG_TYPE`=`website`. Header = Appendix A; footer = Appendix B. Static timeline (every entry hardcoded, mirroring the JSON):

```html
<section class="experience-page section" style="padding-top: 120px;">
  <div class="container">
    <div class="page-intro animate-on-scroll">
      <h1>Experience</h1>
      <p>Research and engineering roles, most recent first. Each links to the related project or paper.</p>
    </div>
    <ol class="timeline">
      <li class="timeline-item animate-on-scroll">
        <div class="timeline-date">2025 – present</div>
        <div class="timeline-body">
          <h3>Applied Researcher Intern · eBay</h3>
          <p>Engineering distributed graph neural network training over large user-behavior graphs for recommendation, focusing on sparse representations, latency, throughput, and convergence.</p>
          <a href="work.html#ebay">Project →</a>
        </div>
      </li>
      <li class="timeline-item animate-on-scroll">
        <div class="timeline-date">2023 – present</div>
        <div class="timeline-body">
          <h3>Graduate Research Assistant · Yale University</h3>
          <p>Designed distributed local edge-DP algorithms for k-core decomposition and triangle counting, and developed LAPRAS, a learning-augmented framework for private online query answering.</p>
          <a href="work.html#ledp">Project →</a>
        </div>
      </li>
      <li class="timeline-item animate-on-scroll">
        <div class="timeline-date">2023</div>
        <div class="timeline-body">
          <h3>Graduate Summer Researcher · MIT CSAIL</h3>
          <p>Built a benchmark suite for privacy-preserving graph algorithms in parallel and distributed settings, evaluating accuracy, runtime, scalability, and communication trade-offs.</p>
        </div>
      </li>
      <li class="timeline-item animate-on-scroll">
        <div class="timeline-date">2021 – 2022</div>
        <div class="timeline-body">
          <h3>Research Data Engineer II · University of Rochester Medical Center</h3>
          <p>Built storage and retrieval workflows for large sequencing datasets and led open-source software for reproducible microglia image analysis.</p>
        </div>
      </li>
      <li class="timeline-item animate-on-scroll">
        <div class="timeline-date">2020 – 2022</div>
        <div class="timeline-body">
          <h3>Graduate Research Assistant · University of Rochester</h3>
          <p>Built KOIOS, an exact top-k semantic set-search system (5.5× speedup, ICDE 2023), and designed a fair coreset-selection method with a 400× speedup retaining 70% accuracy on 24% of the data.</p>
          <a href="work.html#koios">Project →</a>
        </div>
      </li>
      <li class="timeline-item animate-on-scroll">
        <div class="timeline-date">2019</div>
        <div class="timeline-body">
          <h3>Undergraduate ML Researcher · Caltech</h3>
          <p>Co-developed Tree Stack Memory Units for compositional generalization in mathematical reasoning, outperforming Transformer, Tree Transformer, and Tree-LSTM baselines.</p>
          <a href="work.html#treesmu">Project →</a>
        </div>
      </li>
      <li class="timeline-item animate-on-scroll">
        <div class="timeline-date">2017 – 2020</div>
        <div class="timeline-body">
          <h3>Undergraduate Research Assistant · University of Washington</h3>
          <p>Built a high-performance Python/Boost.Python interface for LightDB and developed information-theoretic pruning for approximate dependency discovery (SIGMOD 2020).</p>
          <a href="publications.html#maimon">Paper →</a>
        </div>
      </li>
    </ol>
  </div>
</section>
```

- [ ] **Step 3: Append timeline CSS** to `assets/css/main.css`:

```css
/* ---------- Experience timeline ---------- */
.timeline { list-style: none; border-left: 2px solid var(--border); margin-left: 0.5rem; padding-left: var(--space-sm); }
.timeline-item { position: relative; padding-bottom: var(--space-md); }
.timeline-item::before {
  content: ""; position: absolute; left: calc(-1 * var(--space-sm) - 6px); top: 0.4rem;
  width: 10px; height: 10px; border-radius: 50%; background: var(--accent);
}
.timeline-date { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem; }
.timeline-body h3 { margin-bottom: 0.3rem; }
.timeline-body a { font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent); }
```

- [ ] **Step 4: Verify**

```bash
python3 -c "import json;d=json.load(open('data/experience.json'));print(len(d),'exp valid')"
curl -s http://localhost:8000/experience.html | grep -c "timeline-item"   # expect 7
curl -s http://localhost:8000/experience.html | grep -F "Applied Researcher Intern · eBay"
```
Expected: `7 exp valid`, count `7`, eBay line.

- [ ] **Step 5: Commit**

```bash
git add experience.html data/experience.json assets/css/main.css
git commit -m "Experience: static chronological timeline + data source"
```

---

### Task 6: Writing page — scaffold with planned topics (new page + data)

**Files:**
- Create: `writing.html`, `data/writing.json`
- Modify: `assets/css/main.css` (append writing styles)

**Interfaces:** Consumes shared header/footer/head. Standalone.

- [ ] **Step 1: Create `data/writing.json`:**

```json
{
  "intro": "Short technical notes on algorithms, privacy, and systems. First posts are on the way.",
  "posts": [],
  "planned": [
    "What learning-augmented algorithms optimize for",
    "Why graph degeneracy improves private graph analytics",
    "Building and evaluating distributed graph algorithms",
    "A practical introduction to limit-order books from a systems perspective",
    "CUDA performance lessons from scientific computing",
    "How to evaluate a backtest without fooling yourself"
  ]
}
```

- [ ] **Step 2: Create `writing.html`.** Head via Appendix C: `PAGE_TITLE`=`Writing — Pranay Mundra`, `PAGE_DESCRIPTION`=`Technical notes by Pranay Mundra on algorithms, differential privacy, distributed systems, and quantitative topics.`, `CANONICAL_URL`=`https://mundrapranay.github.io/writing.html`, `OG_TYPE`=`website`. Header = Appendix A; footer = Appendix B. Static scaffold:

```html
<section class="writing-page section" style="padding-top: 120px;">
  <div class="container">
    <div class="page-intro animate-on-scroll">
      <h1>Writing</h1>
      <p>Short technical notes on algorithms, privacy, and systems. First posts are on the way.</p>
    </div>
    <ul class="writing-list">
      <li class="writing-item animate-on-scroll"><span class="writing-status">Coming soon</span> What learning-augmented algorithms optimize for</li>
      <li class="writing-item animate-on-scroll"><span class="writing-status">Coming soon</span> Why graph degeneracy improves private graph analytics</li>
      <li class="writing-item animate-on-scroll"><span class="writing-status">Coming soon</span> Building and evaluating distributed graph algorithms</li>
      <li class="writing-item animate-on-scroll"><span class="writing-status">Coming soon</span> A practical introduction to limit-order books from a systems perspective</li>
      <li class="writing-item animate-on-scroll"><span class="writing-status">Coming soon</span> CUDA performance lessons from scientific computing</li>
      <li class="writing-item animate-on-scroll"><span class="writing-status">Coming soon</span> How to evaluate a backtest without fooling yourself</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 3: Append writing CSS** to `assets/css/main.css`:

```css
/* ---------- Writing ---------- */
.writing-list { list-style: none; }
.writing-item { border-top: 1px solid var(--border); padding: var(--space-sm) 0; color: var(--text-secondary); }
.writing-status {
  display: inline-block; font-family: var(--font-mono); font-size: 0.68rem;
  color: var(--text-muted); border: 1px solid var(--border); border-radius: 999px;
  padding: 0.15rem 0.55rem; margin-right: 0.6rem;
}
```

- [ ] **Step 4: Verify**

```bash
python3 -c "import json;json.load(open('data/writing.json'));print('writing.json valid')"
curl -s http://localhost:8000/writing.html | grep -c "writing-item"   # expect 6
```
Expected: `writing.json valid`, count `6`.

- [ ] **Step 5: Commit**

```bash
git add writing.html data/writing.json assets/css/main.css
git commit -m "Writing: scaffold page with planned topics"
```

---

### Task 7: CV page — static content + refreshed data + SEO head

**Files:**
- Modify: `data/cv.json` (add eBay + LAPRAS + NeurIPS 2026 service)
- Modify: `cv.html` (static Education/Experience/Service/Skills + SEO head)
- Modify: `assets/css/main.css` if a new class is needed (reuse existing `cv-*` classes; none expected)

**Interfaces:** Consumes shared header/footer/head. Reuses existing `.cv-grid`, `.cv-column`, `.cv-item*`, `.cv-card*`, `.service-*`, `.skills-grid` classes.

- [ ] **Step 1: Read the current `data/cv.json`** to get exact existing education/experience/service/skills entries.

```bash
cat data/cv.json
```

- [ ] **Step 2: Update `data/cv.json`:** add an eBay experience entry at the top of `experience`, add LAPRAS where the file lists projects/highlights (if present), and set the `service` array to include `{ "role": "Reviewer", "venue": "NeurIPS", "year": "2026" }` (replacing any "2027" entry). Keep all other existing entries intact. (Exact merge depends on Step 1 output; preserve the file's existing shape and key names.)

- [ ] **Step 3: Replace `cv.html` `<head>`** via Appendix C: `PAGE_TITLE`=`CV — Pranay Mundra`, `PAGE_DESCRIPTION`=`Curriculum vitae of Pranay Mundra — Yale CS Ph.D. candidate and eBay applied researcher in algorithms, differential privacy, and distributed systems.`, `CANONICAL_URL`=`https://mundrapranay.github.io/cv.html`, `OG_TYPE`=`profile`.

- [ ] **Step 4: Replace the `cv.html` header** with Appendix A (removes stale "About" nav link).

- [ ] **Step 5: Convert the CV body to static HTML.** Using the values from `data/cv.json` (Step 1/2), hardcode the Education timeline items into `#cv-education`, Experience cards into `#cv-experience` (eBay first), and Service items into `#cv-service`, matching the existing class structure produced by the old JS (`.cv-item` with `.cv-item-date/.cv-item-title/.cv-item-org`; `.cv-card` with `.cv-card-header/.cv-card-title/.cv-card-org/.cv-card-date/.cv-card-desc`; `.service-item` with `.service-role/.service-venue/.service-year`). Keep the Skills grid: hardcode the categories from `data/skills.json` into `#skills-grid` as `.skill-category > h3 + .skill-tags > .skill-tag` (read `data/skills.json` for exact names).

- [ ] **Step 6: Verify**

```bash
python3 -c "import json;json.load(open('data/cv.json'));print('cv.json valid')"
curl -s http://localhost:8000/cv.html | grep -F "eBay"
curl -s http://localhost:8000/cv.html | grep -F "NeurIPS"
curl -s http://localhost:8000/cv.html | grep -F "canonical"
```
Expected: `cv.json valid`, eBay line, NeurIPS line, canonical line.

- [ ] **Step 7: Commit**

```bash
git add cv.html data/cv.json assets/css/main.css
git commit -m "CV: static content, add eBay + LAPRAS + NeurIPS 2026 service, SEO head"
```

---

### Task 8: Trim `main.js` to UI-behavior-only + add publication filters + final sweep

**Files:**
- Modify: `assets/js/main.js`
- Modify: `assets/css/main.css` (focus-visible states)

**Interfaces:**
- Consumes: `.pub-filter[data-tag]` + `.pub-item[data-tags]` from Task 4.
- Produces: `initPublicationFilters()`.

- [ ] **Step 1: Delete the content-rendering code** from `main.js`: `loadPageContent`, `loadHomePage`, `loadSkills`, `loadPublications`, `createPublicationItem`, `loadTeaching`, `loadCV`, `createCVItem`, `createCVCard`, `createServiceItem`, and the now-unused `parseMarkdown`, `animateCounter` (keep `animateCounter` only if a `.stat-number` element still exists — grep confirms it does not; delete it). Keep `initTheme`, `initNavigation`, `loadFooterLinks`, `loadMobileSocials`, `initMobileMenu`, `initScrollEffects`, `initAnimations`.

- [ ] **Step 2: Replace the `DOMContentLoaded` handler** so it no longer calls `loadPageContent()` and instead calls the filter init:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initAnimations();
    initPublicationFilters();
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
```

- [ ] **Step 3: Add `initPublicationFilters()`** to `main.js`:

```javascript
/* ---------- Publication tag filters ---------- */
function initPublicationFilters() {
    const filters = document.querySelectorAll('.pub-filter');
    const items = document.querySelectorAll('.pub-item');
    if (!filters.length || !items.length) return;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('is-active'));
            btn.classList.add('is-active');
            const tag = btn.getAttribute('data-tag');
            items.forEach(item => {
                const tags = (item.getAttribute('data-tags') || '').split(',');
                item.hidden = !(tag === 'all' || tags.includes(tag));
            });
        });
    });
}
```

- [ ] **Step 4: Add visible focus states** to `assets/css/main.css`:

```css
/* ---------- Accessibility: visible keyboard focus ---------- */
a:focus-visible, button:focus-visible, .btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

- [ ] **Step 5: Verify JS has no stale references**

```bash
grep -nE "loadPageContent|loadHomePage|loadPublications|loadTeaching|loadCV|createPublicationItem" assets/js/main.js || echo "no stale content-render refs"
node --check assets/js/main.js && echo "main.js syntax OK"
```
Expected: `no stale content-render refs` and `main.js syntax OK`. (If `node` is unavailable, load any page in a browser and confirm no console errors.)

- [ ] **Step 6: Full-site verification (JS enabled, in a browser)** — start the server if not running, open each page, and confirm: nav shows Work · Publications · Experience · Writing · CV (no About/Teaching); theme toggle works; mobile menu opens; on Publications, clicking a tag filters the list; no console errors.

```bash
for p in index work publications experience writing cv; do
  echo "== $p ==" ; curl -s "http://localhost:8000/$p.html" | grep -c "footer-links"
done
```
Expected: each page prints `1`.

- [ ] **Step 7: Broken-link scan** — every internal href resolves to an existing file:

```bash
grep -rhoE 'href="[a-z0-9_-]+\.html' *.html | sed -E 's/href="//' | sort -u | while read f; do test -e "$f" && echo "OK $f" || echo "MISSING $f"; done
```
Expected: no `MISSING` lines.

- [ ] **Step 8: Commit**

```bash
git add assets/js/main.js assets/css/main.css
git commit -m "Trim main.js to UI behavior only; add publication filters and focus states"
```

---

## Self-Review (completed against the spec)

- **Spec coverage:** Home (Task 2), Work/6 case studies (Task 3), Publications full static + tags + LAPRAS + SeDa (Task 4), Experience timeline (Task 5), Writing scaffold (Task 6), CV refresh (Task 7), nav/Teaching removal/robots/sitemap (Task 1), JSON-LD + per-page OG/canonical/title (Tasks 1–7 heads), main.js trim + filters + focus states (Task 8). All spec §5–§7 items map to a task.
- **Positioning:** privacy-forward headline + expertise line enforced in Global Constraints and Task 2. ✓
- **Static-HTML acceptance:** every page task verifies content via `curl` (no JS). ✓
- **Pending facts:** handled by the "omit, never placeholder" rule (LAPRAS URL, SeDa URL, grad year, resume). ✓
- **Type/name consistency:** `.pub-filter[data-tag]` / `.pub-item[data-tags]` defined in Task 4 and consumed by `initPublicationFilters()` in Task 8; anchor ids `#lapras/#ledp/#ebay/#koios/#treesmu/#gpu` produced in Task 3 and linked from Tasks 2 & 5. ✓

## Deferred (not in this plan — later phases)

Visual redesign (palette/type/alternating rows/two-column hero polish), real Writing articles, custom social-banner image, analytics provider, LinkedIn/resume-PDF content.
