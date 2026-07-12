# Website Repositioning — Design Spec

**Date:** 2026-07-11
**Source strategy:** `~/Downloads/pranay_website_linkedin_strategy.md`
**Branch:** work from clean `master` (stable HEAD `2f8b50a`). Prior local WIP is preserved on `dev` (commit `cd60fa0`).

## 1. Goal

Reposition mundrapranay.github.io from a "differential-privacy researcher" landing page into a
research-portfolio that presents the full breadth of work — **algorithms, differential privacy,
distributed & high-performance computing, ML systems, semantic search, and learning-augmented
algorithms** — and answers three recruiter questions immediately: what problems does Pranay solve,
what evidence shows impact, and which roles is he relevant for.

This phase covers **all pages and content plus SEO infrastructure**, on the **existing visual style**.
The visual redesign (palette, typography, alternating case-study rows, two-column hero polish) is an
explicit later phase.

## 2. Decisions (locked)

| Area | Decision |
|------|----------|
| Scope | Everything: Home, Work, Publications, Experience, Writing, CV + full SEO. Existing visual style retained. |
| Architecture | Static HTML in the server response for all important content. `data/*.json` remains the editable source of truth, hand-mirrored into the HTML. **No build step.** |
| Rendering | `main.js` stops rendering content; trimmed to UI behavior only (theme toggle, nav injection, mobile menu, publication tag filters). |
| Visual redesign | Deferred to a later phase. |
| Analytics | Deferred (no provider wired this phase). |
| Writing page | Ships as a scaffold: intro + planned topics marked "coming soon." |

## 3. Positioning & voice

**Primary identity:** Research engineer and Ph.D. candidate working across algorithms, differential
privacy, distributed & high-performance computing, ML systems, and semantic search.

Do **not** over-index on ML. Foreground differential privacy and algorithms; ML systems is present
(eBay GNN work) but not the lead.

- **Hero eyebrow:** `Ph.D. Candidate at Yale · Applied Researcher Intern at eBay`
- **Hero headline:** `I build algorithms and systems that make computation private, scalable, and fast.`
- **Hero subheadline:** `My work spans differential privacy, distributed and high-performance computing, graph learning, semantic search, and learning-augmented algorithms. I focus on turning mathematically rigorous ideas into practical systems with measurable performance gains.`
- **Primary CTAs:** View Selected Work → `work.html` · Download Resume → `files/resume.pdf` · Email Me → `mailto:`
- **Compact expertise line:** `Algorithms · Differential Privacy · Distributed & High-Performance Computing · ML Systems · C++/CUDA`

**About (2 paragraphs)** — adapted from strategy §3, DP kept prominent:
> I am a Ph.D. candidate in Computer Science at Yale University and an Applied Researcher Intern at
> eBay. My research sits at the intersection of algorithms, differential privacy, distributed and
> high-performance systems, and machine learning.
>
> I have developed distributed differentially private graph algorithms with substantially improved
> empirical accuracy, learning-augmented methods for private online analytics, scalable
> semantic-search systems, neural architectures for mathematical reasoning, and GPU-accelerated
> scientific software. My work has appeared at venues including VLDB, ICDE, and SIGMOD, with research
> experience across Yale, MIT CSAIL, Caltech, the University of Rochester, and the University of Washington.

**Research themes (3):**
1. **Algorithms under uncertainty** — learning-augmented, randomized, and privacy-preserving
   algorithms that stay robust when predictions or assumptions are imperfect.
2. **High-performance & distributed computing** — parallel algorithms, CUDA acceleration,
   communication-aware evaluation, systems that bridge research code with efficient execution.
3. **Large-scale machine-learning systems** — distributed graph learning, sparse representations,
   recommendation infrastructure, performance-oriented training.

## 4. Information architecture

Pages: **Home · Work · Publications · Experience · Writing · CV**.
Visible nav (5): **Work · Publications · Experience · Writing · CV**. Home reached via the `PM` logo;
Contact is the hero **Email Me** button + footer social links (not a page).

**Teaching is removed** — delete `teaching.html` and `data/teaching.json` (still present on master), and
drop Teaching from `site.json` navigation.

## 5. Per-page structure

### 5.1 Home (`index.html`)
Static HTML for every section:
- Hero (§3 copy), keeps `assets/images/profile.png`.
- About (§3, 2 paragraphs).
- Research themes (3, §3).
- Selected-work preview: 3 cards — LAPRAS, Practical Local Edge-DP Graph Algorithms, eBay Graph
  Learning — each linking to the matching case study on `work.html`.
- Footer: social links + contact + copyright.
- `<head>`: metadata + JSON-LD (see §6).

### 5.2 Work (`work.html`, new)
- Narrative intro (core narrative line).
- 3 research themes as short intro sections.
- **6 case studies**, each: problem · contribution · quantified result · venue · paper/code links · 3 tags:
  1. **LAPRAS** — learning-augmented private online analytics. Tags: `Online Algorithms` `Differential Privacy` `Optimization`.
  2. **Practical Local Edge-DP Graph Algorithms** — within 3× error for k-core; up to 6 orders of magnitude lower triangle-counting error. Tags: `Graph Algorithms` `Distributed Systems` `Privacy`.
  3. **eBay Graph Learning** — distributed GNN training for recommendation, public/non-confidential level only. Tags: `GNNs` `PyTorch` `Distributed ML`.
  4. **KOIOS** — exact semantic set search, 5.5× speedup. Tags: `Algorithms` `Search` `Graph Matching`.
  5. **Tree-SMU** — compositional generalization for mathematical reasoning; beats Transformer/Tree-Transformer/Tree-LSTM across four evaluations. Tags: `Deep Learning` `Reasoning` `Representation Learning`.
  6. **GPU-Accelerated Gene Network Modeling** — CUDA-parallelized kernels. Tags: `CUDA` `C++` `Scientific Computing`.
- Source of truth: new `data/work.json`.
- Visual note: alternating horizontal rows are a redesign-phase treatment; ship semantic
  problem/contribution/result structure now within existing CSS.

### 5.3 Publications (`publications.html`)
- Full **static** list of every publication. Each entry: title · authors (Pranay **bold**) · venue + year ·
  one-sentence contribution · buttons (paper / code / slides / citation where available) · topic tags
  (Algorithms, Privacy, ML Systems, Search, Data Systems).
- Tag filters via JS progressive enhancement; the complete list remains in static HTML for SEO/accessibility.
- Content changes: **add LAPRAS (ICML 2026)**; SeDa gets its public paper link; keep LEDP, AQP/Quok,
  KOIOS, Maimon, Tree-SMU.
- `data/publications.json` gains fields: `contribution` (one sentence), `tags` (array), `citation`
  (optional), `projecturl` (optional).

### 5.4 Experience (`experience.html`, new)
- Chronological timeline, newest first: eBay → Yale → MIT CSAIL → URMC → University of Rochester →
  Caltech → University of Washington.
- Each: institution · role · dates · a short research **story** (not resume bullets verbatim) · link to
  the related paper/project.
- Source of truth: new `data/experience.json`.

### 5.5 Writing (`writing.html`, new)
- Scaffold: intro paragraph + the 6 planned note topics (§ strategy 4) listed as "coming soon."
- Source of truth: new `data/writing.json` (`planned` topics now; `posts` empty).

### 5.6 CV (`cv.html`)
- Keep existing layout (Education · Experience · Service · Skills grid; PDF download).
- Refresh `data/cv.json`: add eBay (current) and LAPRAS; **Service → "NeurIPS 2026 reviewer"**; ensure
  the download links the updated resume PDF.

## 6. SEO / technical

- Unique `<title>` + meta description per page. Home title: `Pranay Mundra — Algorithms, Differential
  Privacy, Distributed Systems & Quantitative Research`. Home description per strategy §4 (privacy-forward).
- Open Graph + Twitter-card meta on every page (`og:title`, `og:description`, `og:type`, `og:url`,
  `og:image`, `twitter:card`).
- Canonical URL `<link rel="canonical">` per page.
- `sitemap.xml` and `robots.txt` at repo root.
- **JSON-LD** `Person` / `ProfilePage` on Home: name, `affiliation` Yale, `worksFor` eBay,
  `alumniOf` University of Rochester + University of Washington, `sameAs` (GitHub, Google Scholar,
  LinkedIn, ORCID, Twitter), and selected publications.
- Semantic heading hierarchy, visible keyboard focus states, descriptive `alt` text on all images.
- `og:image` uses an existing image for now (profile); a custom social banner is a redesign-phase asset.

## 7. Data model changes

| File | Change |
|------|--------|
| `data/site.json` | Nav → Work, Publications, Experience, Writing, CV (drop Teaching). Rewrite author `bio`/`description` to new positioning. |
| `data/about.json` | Rewrite `intro` + sections to new positioning (kept in sync with Home HTML). |
| `data/publications.json` | Add `contribution`, `tags`, `citation`, `projecturl`; add LAPRAS; add SeDa link. |
| `data/work.json` | **New** — 6 case studies. |
| `data/experience.json` | **New** — timeline entries. |
| `data/writing.json` | **New** — planned topics. |
| `data/cv.json` | Add eBay + LAPRAS; Service NeurIPS 2026; resume link. |
| `data/teaching.json` | **Delete.** |

`main.js`: remove content-rendering functions (about text, skills grid, featured pubs, cv sections);
keep `initTheme`, `initNavigation` (nav still injected from `site.json`), `initMobileMenu`,
`initScrollEffects`, `initAnimations`, year stamp; add publication tag-filter behavior.

## 8. Non-goals (this phase)

- Visual redesign: palette/typography change, alternating case-study rows, two-column hero polish.
- Real Writing articles (scaffold only).
- Custom social-banner image.
- Analytics provider integration.
- LinkedIn and resume-PDF content (handled outside this repo; strategy §5–6).

## 9. Content to confirm before publishing

These are user-supplied values; blanks are marked in-page as "confirm before publish" rather than guessed.

| # | Item | Value |
|---|------|-------|
| 1 | Expected Ph.D. graduation year | _pending_ |
| 2 | SeDa public paper URL | _pending (user confirmed one exists)_ |
| 3 | LAPRAS paper URL (arXiv) | _pending_ |
| 4 | Featured code repo URL(s) | _pending (LEDP Zenodo `https://zenodo.org/records/15741880` known)_ |
| 5 | Is `files/resume.pdf` the updated 2-page industry version? | _pending_ |

Confirmed: LAPRAS = accepted **ICML 2026** (list as publication) · SeDa = accepted **VLDB 2026**, public
link available · eBay = **current/ongoing**, high-level/non-confidential framing · NeurIPS reviewer =
**2026**.

## 10. Acceptance criteria

- All six pages exist and render their key content in the **static HTML source** (verifiable with JS
  disabled / via `curl`).
- Nav shows exactly Work · Publications · Experience · Writing · CV on every page; no Teaching.
- Home hero uses the approved headline; framing across the site foregrounds privacy/algorithms, not ML.
- Publications page lists every publication statically with authors, venue/year, contribution, tags,
  and available links; LAPRAS present; SeDa linked.
- Every page has a unique title + description, OG/Twitter tags, and a canonical URL; Home carries valid
  `Person`/`ProfilePage` JSON-LD; `sitemap.xml` + `robots.txt` exist.
- `main.js` no longer renders page content; site still works with JS enabled (theme, nav, menu, filters).
- No broken internal links; existing visual style intact.
