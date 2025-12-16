# Personal Academic Website

A **minimal, modern** static website built with HTML, CSS, and JavaScript. No build process required—just edit JSON files and your site updates automatically.

## ✨ Features

- 🎨 **Minimal Design** - Clean, modern aesthetic with lots of white space
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ⚡ **Fast** - Pure static files, no build process
- 📝 **Easy to Edit** - Just update JSON files
- 🔄 **Auto-Updating** - Publications appear everywhere automatically

## 🚀 Quick Start

1. **Edit content** in the `data/` folder (JSON files)
2. **Push to GitHub** - GitHub Pages automatically deploys
3. **Done!** Your site is live

## 📝 How to Edit Content

### Update About Information

Edit `data/about.json`:

```json
{
  "intro": "Your introduction paragraph here...",
  "sections": [
    {
      "title": "Section Title",
      "content": [
        "First paragraph...",
        "Second paragraph..."
      ]
    }
  ]
}
```

**Tip:** Use markdown-style links: `[Link Text](https://url.com)` or `[Link Text](publications.html#paper-id)`

### Add/Update Publications

Edit `data/publications.json` - just add a new object to the array:

```json
{
  "id": "unique-id",
  "title": "Paper Title",
  "authors": ["Author 1", "Author 2"],
  "venue": "Conference Name",
  "year": 2025,
  "date": "2025-01-15",
  "paperurl": "https://arxiv.org/pdf/...",
  "abstract": "Abstract text here...",
  "citation": ""
}
```

**Publications automatically:**
- Sort by year (newest first)
- Display on publications page
- Can be linked from about page using `[Link Text](publications.html#unique-id)`

### Update Personal Information

Edit `data/site.json`:

```json
{
  "author": {
    "name": "Your Name",
    "bio": "Your bio",
    "email": "your@email.com",
    "location": "City, State",
    "employer": "University Name",
    "social": {
      "github": "username",
      "twitter": "username",
      "linkedin": "username",
      "googlescholar": "full-url",
      "orcid": "full-url"
    }
  },
  "navigation": [
    { "title": "Publications", "url": "publications.html" },
    { "title": "Teaching", "url": "teaching.html" },
    { "title": "CV", "url": "cv.html" }
  ]
}
```

### Add Teaching Experience

Edit `data/teaching.json`:

```json
{
  "course": "CS 444",
  "title": "Database Systems",
  "type": "Teaching Assistant",
  "venue": "Yale University",
  "year": 2022,
  "semester": "Fall",
  "location": "City, State",
  "description": "Course description..."
}
```

## 🎨 Design Customization

### Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --color-bg: #ffffff;           /* Background */
  --color-text: #1a1a1a;         /* Text color */
  --color-accent: #0066cc;       /* Links and accents */
  --color-border: #e5e5e5;      /* Borders */
}
```

### Typography

The site uses system fonts for maximum performance. To change, edit `assets/css/main.css`:

```css
--font-sans: "Your Font", sans-serif;
```

## 📁 File Structure

```
.
├── data/                    # All content (edit these!)
│   ├── site.json           # Site info, navigation, author
│   ├── about.json          # About page content
│   ├── publications.json  # Publications list
│   └── teaching.json       # Teaching experience
├── assets/
│   ├── css/
│   │   └── main.css        # All styles
│   └── js/
│       └── main.js         # Data loading & rendering
├── images/                  # Images (profile, etc.)
├── files/                   # PDFs (CV, papers, etc.)
├── index.html              # Home/About page
├── publications.html       # Publications page
├── teaching.html          # Teaching page
└── cv.html                # CV page
```

## 🔧 How It Works

1. **HTML pages** provide the structure
2. **JavaScript** (`assets/js/main.js`) loads JSON data and renders it
3. **CSS** (`assets/css/main.css`) styles everything with a minimal design
4. **No build step** - just edit JSON and push!

## 🌐 Deployment

### GitHub Pages (Automatic)

1. Push to your `mundrapranay.github.io` repository
2. GitHub Pages automatically serves the files
3. Site is live at `https://mundrapranay.github.io`

### Local Testing

Just open `index.html` in a browser, or use a simple server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (with http-server)
npx http-server

# Then visit http://localhost:8000
```

## ✨ Adding a New Publication

1. Open `data/publications.json`
2. Add a new object to the array:

```json
{
  "id": "my-new-paper",
  "title": "My New Paper",
  "authors": ["Your Name", "Co-author"],
  "venue": "Conference Name",
  "year": 2025,
  "date": "2025-01-15",
  "paperurl": "https://arxiv.org/pdf/...",
  "abstract": "Paper abstract...",
  "citation": ""
}
```

3. Save and push to GitHub
4. Publication automatically appears on publications page!

## 🔗 Linking Publications

In your about page (`data/about.json`), link to publications:

```json
"[Paper Name](publications.html#paper-id)"
```

The `#paper-id` links directly to that publication on the publications page.

## 💡 Tips

- **Keep IDs unique** - Publication IDs should be unique (use lowercase, hyphens)
- **Use markdown links** - In about.json, use `[text](url)` format
- **Test locally** - Open HTML files in browser to preview
- **JSON syntax** - Make sure JSON is valid (use a JSON validator if needed)

## 🐛 Troubleshooting

**Content not updating?**
- Check browser cache (hard refresh: Cmd+Shift+R / Ctrl+Shift+R)
- Verify JSON syntax is valid
- Check browser console for errors

**Links not working?**
- Make sure file paths are correct
- Check that JSON files are in `data/` folder
- Verify publication IDs match when linking

---

**That's it!** Edit the JSON files and see your changes live! 🎉
