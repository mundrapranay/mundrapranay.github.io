/* ==========================================================================
   Modern Interactive Website - JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initAnimations();
    loadPageContent();
    document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- Theme Toggle ---------- */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

/* ---------- Navigation ---------- */
async function initNavigation() {
    try {
        const response = await fetch('data/site.json');
        const data = await response.json();
        
        if (data.navigation) {
            const navLinks = document.getElementById('nav-links');
            const mobileNavLinks = document.getElementById('mobile-nav-links');
            
            data.navigation.forEach(item => {
                // Desktop nav
                if (navLinks) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = item.url;
                    a.textContent = item.title;
                    if (window.location.pathname.includes(item.url)) {
                        a.classList.add('active');
                    }
                    li.appendChild(a);
                    navLinks.appendChild(li);
                }
                
                // Mobile nav
                if (mobileNavLinks) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = item.url;
                    a.textContent = item.title;
                    li.appendChild(a);
                    mobileNavLinks.appendChild(li);
                }
            });
        }

        // Load footer social links
        if (data.author && data.author.social) {
            loadFooterLinks(data.author.social);
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

function loadFooterLinks(social) {
    const footerLinks = document.getElementById('footer-links');
    if (!footerLinks) return;

    const icons = {
        github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
        twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
        email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
        googlescholar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>`
    };

    const links = [
        { key: 'github', url: social.github ? `https://github.com/${social.github}` : null },
        { key: 'twitter', url: social.twitter ? `https://twitter.com/${social.twitter}` : null },
        { key: 'linkedin', url: social.linkedin ? `https://linkedin.com/in/${social.linkedin}` : null },
        { key: 'googlescholar', url: social.googlescholar },
        { key: 'email', url: social.email ? `mailto:${social.email}` : null }
    ];

    links.forEach(link => {
        if (link.url && icons[link.key]) {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = link.key !== 'email' ? '_blank' : '';
            a.rel = link.key !== 'email' ? 'noopener noreferrer' : '';
            a.innerHTML = icons[link.key];
            a.title = link.key.charAt(0).toUpperCase() + link.key.slice(1);
            footerLinks.appendChild(a);
        }
    });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            mobileNav.classList.toggle('is-open');
            document.body.style.overflow = mobileNav.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                mobileNav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }
}

/* ---------- Scroll Effects ---------- */
function initScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ---------- Scroll Animations ---------- */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    entry.target.classList.add('animated');
                }
                
                // Animate counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.animate-on-scroll, .timeline-content, .skill-progress, .stat-number').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

/* ---------- Load Page Content ---------- */
function loadPageContent() {
    const path = window.location.pathname;
    
    if (path === '/' || path.includes('index.html') || path.endsWith('/')) {
        loadHomePage();
    } else if (path.includes('publications')) {
        loadPublications();
    } else if (path.includes('teaching')) {
        loadTeaching();
    } else if (path.includes('cv')) {
        loadCV();
    }
}

/* ---------- Home Page ---------- */
async function loadHomePage() {
    try {
        // Load site data for socials
        const siteResponse = await fetch('data/site.json');
        const siteData = await siteResponse.json();
        
        // Add hero social links
        const heroSocials = document.getElementById('hero-socials');
        if (heroSocials && siteData.author && siteData.author.social) {
            const social = siteData.author.social;
            
            const socialIcons = {
                email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
                github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
                twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`,
                linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
                googlescholar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`
            };
            
            const socialUrls = {
                email: (val) => `mailto:${val}`,
                github: (val) => `https://github.com/${val}`,
                twitter: (val) => `https://twitter.com/${val}`,
                linkedin: (val) => `https://www.linkedin.com/in/${val}`,
                googlescholar: (val) => val
            };
            
            ['email', 'github', 'linkedin', 'twitter', 'googlescholar'].forEach(key => {
                if (social[key]) {
                    const a = document.createElement('a');
                    a.href = socialUrls[key](social[key]);
                    a.target = key !== 'email' ? '_blank' : '';
                    a.rel = key !== 'email' ? 'noopener noreferrer' : '';
                    a.setAttribute('aria-label', key);
                    a.innerHTML = socialIcons[key];
                    heroSocials.appendChild(a);
                }
            });
        }
        
        // Load about content
        const aboutResponse = await fetch('data/about.json');
        const aboutData = await aboutResponse.json();
        
        const aboutText = document.getElementById('about-text');
        if (aboutText) {
            // Add intro paragraph
            if (aboutData.intro) {
                const p = document.createElement('p');
                p.innerHTML = parseMarkdown(aboutData.intro);
                aboutText.appendChild(p);
            }
            
            // Add all sections
            if (aboutData.sections) {
                aboutData.sections.forEach(section => {
                    const h3 = document.createElement('h3');
                    h3.textContent = section.title;
                    aboutText.appendChild(h3);
                    
                    if (section.content) {
                        section.content.forEach(paragraph => {
                            const p = document.createElement('p');
                            p.innerHTML = parseMarkdown(paragraph);
                            aboutText.appendChild(p);
                        });
                    }
                });
            }
        }

        // Load skills
        await loadSkills();
        
        // Load featured publications (first 3)
        const pubResponse = await fetch('data/publications.json');
        const publications = await pubResponse.json();
        
        const featuredPubs = document.getElementById('featured-publications');
        if (featuredPubs) {
            publications.sort((a, b) => (b.year || 0) - (a.year || 0));
            publications.slice(0, 3).forEach((pub, index) => {
                featuredPubs.appendChild(createPublicationItem(pub, index));
            });
        }

        // Re-init animations for new content
        initAnimations();
    } catch (error) {
        console.error('Error loading home page:', error);
    }
}

/* ---------- Skills ---------- */
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const data = await response.json();
        
        const skillsGrid = document.getElementById('skills-grid');
        if (!skillsGrid || !data.categories) return;
        
        data.categories.forEach((category, catIndex) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category animate-on-scroll';
            categoryDiv.style.transitionDelay = `${catIndex * 0.1}s`;
            
            const h3 = document.createElement('h3');
            h3.textContent = category.name;
            categoryDiv.appendChild(h3);
            
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'skill-tags';
            
            category.skills.forEach(skill => {
                const tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.textContent = skill.name;
                tagsDiv.appendChild(tag);
            });
            
            categoryDiv.appendChild(tagsDiv);
            skillsGrid.appendChild(categoryDiv);
        });
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

/* ---------- Publications ---------- */
async function loadPublications() {
    try {
        const response = await fetch('data/publications.json');
        const publications = await response.json();
        
        const list = document.getElementById('publications-list');
        if (!list) return;
        
        publications.sort((a, b) => (b.year || 0) - (a.year || 0));
        
        publications.forEach((pub, index) => {
            list.appendChild(createPublicationItem(pub, index));
        });

        initAnimations();
    } catch (error) {
        console.error('Error loading publications:', error);
    }
}

function createPublicationItem(pub, index) {
    const li = document.createElement('li');
    li.className = 'publication-item animate-on-scroll';
    li.style.transitionDelay = `${index * 0.1}s`;
    li.id = pub.id;
    
    let html = '';
    
    if (pub.year) {
        html += `<span class="publication-year">${pub.year}</span>`;
    }
    
    html += `<div class="publication-title">`;
    if (pub.paperurl) {
        html += `<a href="${pub.paperurl}" target="_blank" rel="noopener noreferrer">${pub.title}</a>`;
    } else {
        html += pub.title;
    }
    html += `</div>`;
    
    if (pub.authors && pub.authors.length > 0) {
        html += `<div class="publication-authors">${pub.authors.join(', ')}</div>`;
    }
    
    if (pub.venue) {
        html += `<div class="publication-venue">${pub.venue}</div>`;
    }
    
    if (pub.abstract) {
        html += `<div class="publication-abstract">${pub.abstract}</div>`;
    }
    
    // Publication links with Paper and GitHub
    html += `<div class="publication-links">`;
    if (pub.paperurl) {
        html += `<a href="${pub.paperurl}" class="link-paper" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            Paper
        </a>`;
    }
    if (pub.github) {
        html += `<a href="${pub.github}" class="link-github" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Code
        </a>`;
    }
    if (pub.abstract) {
        html += `<a href="#" class="link-github toggle-abstract">Abstract</a>`;
    }
    html += `</div>`;
    
    li.innerHTML = html;
    
    // Toggle abstract
    const toggleBtn = li.querySelector('.toggle-abstract');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            li.classList.toggle('expanded');
            toggleBtn.textContent = li.classList.contains('expanded') ? 'Hide' : 'Abstract';
        });
    }
    
    return li;
}

/* ---------- Teaching ---------- */
async function loadTeaching() {
    try {
        const response = await fetch('data/teaching.json');
        const teaching = await response.json();
        
        const list = document.getElementById('teaching-list');
        if (!list) return;
        
        teaching.sort((a, b) => (b.year || 0) - (a.year || 0));
        
        teaching.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'teaching-item animate-on-scroll';
            li.style.transitionDelay = `${index * 0.1}s`;
            
            li.innerHTML = `
                <div class="teaching-icon">📚</div>
                <div class="teaching-details">
                    <div class="teaching-course">${item.course}${item.title ? ': ' + item.title : ''}</div>
                    <div class="teaching-meta">${item.type || ''} • ${item.venue || ''} • ${item.semester || ''} ${item.year || ''}</div>
                    ${item.description ? `<div class="teaching-description">${item.description}</div>` : ''}
                </div>
            `;
            
            list.appendChild(li);
        });

        initAnimations();
    } catch (error) {
        console.error('Error loading teaching:', error);
    }
}

/* ---------- CV - Grid Layout with Cards ---------- */
async function loadCV() {
    try {
        const response = await fetch('data/cv.json');
        const data = await response.json();
        
        // Load Education (timeline style)
        const educationContainer = document.getElementById('cv-education');
        if (educationContainer && data.education) {
            data.education.forEach((item, index) => {
                const cvItem = createCVItem(item, index);
                educationContainer.appendChild(cvItem);
            });
        }
        
        // Load Experience (card style)
        const experienceContainer = document.getElementById('cv-experience');
        if (experienceContainer && data.experience) {
            data.experience.forEach((item, index) => {
                const cvCard = createCVCard(item, index);
                experienceContainer.appendChild(cvCard);
            });
        }

        // Load skills
        await loadSkills();
        
        initAnimations();
    } catch (error) {
        console.error('Error loading CV:', error);
    }
}

// Timeline item for Education
function createCVItem(item, index) {
    const div = document.createElement('div');
    div.className = 'cv-item';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <div class="cv-item-date">${item.date}</div>
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-org">${item.institution}${item.location ? ', ' + item.location : ''}</div>
    `;
    
    return div;
}

// Card for Experience
function createCVCard(item, index) {
    const div = document.createElement('div');
    div.className = 'cv-card';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <div class="cv-card-header">
            <div>
                <div class="cv-card-title">${item.title}</div>
                <div class="cv-card-org">${item.institution}${item.location ? ' · ' + item.location : ''}</div>
            </div>
            <span class="cv-card-date">${item.date}</span>
        </div>
        ${item.description ? `<div class="cv-card-desc">${item.description}</div>` : ''}
    `;
    
    return div;
}

/* ---------- Utilities ---------- */
function parseMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
