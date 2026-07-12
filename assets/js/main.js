/* ==========================================================================
   Modern Interactive Website - JavaScript
   ========================================================================== */

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
            loadMobileSocials(data.author.social);
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

function loadMobileSocials(social) {
    const mobileSocials = document.getElementById('mobile-socials');
    if (!mobileSocials) return;

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
            mobileSocials.appendChild(a);
        }
    });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const backdrop = document.getElementById('mobile-backdrop');
    let scrollPosition = 0;
    
    function openMenu() {
        // Save current scroll position
        scrollPosition = window.pageYOffset;
        
        // Lock body scroll while preserving position
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
        
        menuToggle.classList.add('is-active');
        mobileNav.classList.add('is-open');
        if (backdrop) backdrop.classList.add('is-open');
    }
    
    function closeMenu() {
        menuToggle.classList.remove('is-active');
        mobileNav.classList.remove('is-open');
        if (backdrop) backdrop.classList.remove('is-open');
        
        // Restore body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollPosition);
    }
    
    if (menuToggle && mobileNav) {
        // Toggle on button click
        menuToggle.addEventListener('click', () => {
            if (mobileNav.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on backdrop click
        if (backdrop) {
            backdrop.addEventListener('click', closeMenu);
        }

        // Close on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
                closeMenu();
            }
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
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.animate-on-scroll, .timeline-content, .skill-progress').forEach(el => {
        observer.observe(el);
    });
}

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
