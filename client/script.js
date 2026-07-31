/**
 * Portfolio Renderer & Interactions
 * Reads from API layer and populates the DOM.
 */

// ─── SVG Icons ────────────────────────────────────────────
const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>',
    store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
};

const TAG_COLORS = {
    orange: { bg: 'rgba(255, 171, 64, 0.15)', color: '#ffab40' },
    green: { bg: 'rgba(0, 230, 118, 0.15)', color: '#00e676' },
    purple: { bg: 'rgba(179, 136, 255, 0.15)', color: '#b388ff' },
    pink: { bg: 'rgba(255, 77, 166, 0.15)', color: '#ff4da6' },
    cyan: { bg: 'rgba(0, 229, 255, 0.15)', color: '#00e5ff' },
};

// ─── Renderers ────────────────────────────────────────────

function renderHero(hero, personal, stats) {
    document.getElementById('hero-greeting').textContent = hero.greeting;
    document.getElementById('hero-title').innerHTML = hero.title;
    document.getElementById('hero-subtitle').textContent = hero.subtitle;

    const resumeBtn = document.getElementById('resume-download');
    resumeBtn.href = personal.resumeUrl;

    const heroStats = document.getElementById('hero-stats');
    if (heroStats) {
        heroStats.innerHTML = stats
            .map(s => `<div class="stat"><span class="stat-number">${s.number}</span><span class="stat-label">${s.label}</span></div>`)
            .join('');
    }
}

function renderAbout(about, personal) {
    document.getElementById('about-badge').textContent = about.badge;
    document.getElementById('about-title').innerHTML = about.title;
    document.getElementById('about-subtitle').textContent = about.subtitle;
    document.getElementById('about-text').innerHTML = about.paragraphs.map(p => `<p>${p}</p>`).join('');

    document.getElementById('about-links').innerHTML = `
        <a href="${personal.github}" target="_blank" rel="noopener" class="social-link">${ICONS.github} GitHub</a>
        <a href="${personal.linkedin}" target="_blank" rel="noopener" class="social-link">${ICONS.linkedin} LinkedIn</a>
        <a href="mailto:${personal.email}" class="social-link">${ICONS.email} Email</a>
    `;
}

function renderProjects(projects, githubUrl) {
    document.getElementById('projects-grid').innerHTML = projects.map(p => `
        <div class="press-card-wrapper" data-tilt>
            <a href="${p.github}" target="_blank" rel="noopener" class="press-card w-inline-block">
                <div class="press-img-wrap">
                    <img src="${p.image}" loading="lazy" alt="${p.title}" style="width: 100%; height: auto; display: block; border-radius: 8px;" />
                </div>
                <div class="press-flex-wrapper">
                    <div class="press-flex" style="display: flex; align-items: center; justify-content: center; margin-top: 1.25rem;">
                        <div style="font-size: 1.2rem; color: #fff; font-weight: 500;">${p.title}</div>
                    </div>
                </div>
            </a>
        </div>
    `).join('');

    const githubCta = document.getElementById('github-cta');
    githubCta.href = githubUrl;
}

function renderSkills(categories) {
    // Flatten all items from categories
    const allItems = categories.flatMap(cat => cat.items);
    
    // Split into 3 roughly equal rows
    const row1 = allItems.slice(0, Math.ceil(allItems.length / 3));
    const row2 = allItems.slice(Math.ceil(allItems.length / 3), Math.ceil(allItems.length * 2 / 3));
    const row3 = allItems.slice(Math.ceil(allItems.length * 2 / 3));
    
    // Helper to render a duplicated strip for infinite scroll
    const renderStrip = (items, direction) => {
        // Duplicate items to ensure smooth infinite scrolling
        const repeatedItems = [...items, ...items, ...items];
        return `
            <div class="skills-strip-container">
                <div class="skills-strip ${direction}">
                    ${repeatedItems.map(item => `
                        <div class="skill-item">
                            <img src="${item.logo}" alt="${item.name}" loading="lazy" ${item.invert ? 'class="invert-logo"' : ''}>
                            <span>${item.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    document.getElementById('skills-categories').innerHTML = `
        <div class="skills-marquee-wrapper">
            ${renderStrip(row1, 'left')}
            ${renderStrip(row2, 'right')}
            ${renderStrip(row3, 'left')}
        </div>
    `;
}

function renderJourney(journey) {
    document.getElementById('journey-grid').innerHTML = journey.map((j, i) => `
        <div role="listitem" class="voices_item w-dyn-item">
            <div class="card-wrapper">
                <div class="voices_slide-wrapper">
                    <div class="w-layout-grid voices_top" style="display:flex; justify-content:center; width:100%;">
                        <div class="w-layout-vflex voices_flex" style="align-items: center;">
                            <div class="voices_position" style="font-size: 14px; color: #000;">${j.title}</div>
                            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px; color: #000;">${j.place}</div>
                        </div>
                    </div>
                    <div class="w-layout-vflex voices_bottom">
                        <div class="voices_quote" style="color: #000;">“${j.description}”</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderTestimonials(testimonials) {
    document.getElementById('testimonials-grid').innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="testimonial-stars">${ICONS.star.repeat(5)}</div>
            <p class="testimonial-quote">"${t.quote}"</p>
            <div class="testimonial-author">
                <div class="testimonial-avatar">${t.avatar ? `<img src="${t.avatar}" alt="${t.name}">` : `<span>${t.name.charAt(0)}</span>`}</div>
                <div>
                    <p class="testimonial-name">${t.name}</p>
                    <p class="testimonial-role">${t.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderContact(personal) {
    document.getElementById('contact-info').innerHTML = `
        <div class="contact-item">
            ${ICONS.email}
            <div>
                <p class="contact-label">Email</p>
                <a href="mailto:${personal.email}">${personal.email}</a>
            </div>
        </div>
        <div class="contact-item">
            ${ICONS.phone}
            <div>
                <p class="contact-label">Phone</p>
                <a href="tel:${personal.phone.replace(/[^+\d]/g, '')}">${personal.phone}</a>
            </div>
        </div>
        <div class="contact-item">
            ${ICONS.location}
            <div>
                <p class="contact-label">Location</p>
                <p>${personal.location}</p>
            </div>
        </div>
        <div class="contact-socials">
            <a href="${personal.github}" target="_blank" rel="noopener" class="contact-social-link" aria-label="GitHub">${ICONS.github.replace(/width="20" height="20"/g, 'width="24" height="24"')}</a>
            <a href="${personal.linkedin}" target="_blank" rel="noopener" class="contact-social-link" aria-label="LinkedIn">${ICONS.linkedin.replace(/width="20" height="20"/g, 'width="24" height="24"')}</a>
        </div>
    `;
}

function renderFooter(personal) {
    const loc = document.getElementById('footer-location');
    if (loc) loc.textContent = personal.location;

    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) {
        footerEmail.href = `mailto:${personal.email}`;
        footerEmail.textContent = personal.email;
    }

    const socials = document.getElementById('footer-socials');
    if (socials) {
        socials.innerHTML = `
            <a href="${personal.github}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github.replace(/width="20" height="20"/g, 'width="18" height="18"')}</a>
            <a href="${personal.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin.replace(/width="20" height="20"/g, 'width="18" height="18"')}</a>
        `;
    }
}

// ─── Gradient Renderer ────────────────────────────────────

function applyGradients(settings) {
    if (!settings || !settings.sections) return;

    // Apply accent color as CSS variable
    if (settings.accentColor) {
        document.documentElement.style.setProperty('--accent', settings.accentColor);
        // Derive glow from accent
        const hex = settings.accentColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        document.documentElement.style.setProperty('--accent-glow', `rgba(${r},${g},${b},0.15)`);
    }

    // Update SEO
    if (settings.seoTitle) document.title = settings.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && settings.seoDescription) metaDesc.content = settings.seoDescription;

    // Update footer
    if (settings.footerText) {
        const footerP = document.querySelector('.footer p');
        if (footerP) {
            footerP.innerHTML = `&copy; ${new Date().getFullYear()} ${settings.footerText}`;
        }
    }

    // Apply section gradients
    const sectionMap = {
        about: document.getElementById('about'),
        projects: document.getElementById('projects'),
        skills: document.getElementById('skills'),
        experience: document.getElementById('experience'),
        testimonials: document.getElementById('testimonials'),
        contact: document.getElementById('contact'),
    };

    Object.entries(settings.sections).forEach(([key, cfg]) => {
        const el = sectionMap[key];
        if (!el) return;

        // Hide disabled sections
        if (cfg.enabled === false) {
            el.style.display = 'none';
            return;
        }

        if (cfg.showGradient && cfg.gradientColor) {
            const glow = document.createElement('div');
            glow.className = 'section-glow';
            glow.classList.add(`glow-${cfg.gradientPosition || 'center'}`);
            glow.style.background = `radial-gradient(circle, ${cfg.gradientColor}22 0%, transparent 70%)`;
            el.style.position = 'relative';
            el.style.overflow = 'hidden';
            el.appendChild(glow);
        }
    });

    // Update nav visibility
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && settings.sections) {
        const labelMap = {
            about: 'About', projects: 'Projects', skills: 'Skills',
            experience: 'Experience', testimonials: 'Testimonials',
        };
        let navHtml = '';
        (settings.sectionOrder || Object.keys(labelMap)).forEach(key => {
            if (key === 'hero' || key === 'contact') return;
            const cfg = settings.sections[key];
            if (cfg && cfg.enabled === false) return;
            const label = labelMap[key] || key;
            navHtml += `<li><a href="#${key}">${label}</a></li>`;
        });
        navLinks.innerHTML = navHtml;
    }
}

// ─── Custom Section Renderer ──────────────────────────────

function renderCustomSections(sections) {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    sections.forEach(sec => {
        if (!sec.enabled) return;
        if (sec.layout === 'cards') return; // Skip old backend testimonials

        const titleHtml = sec.titleEmWord
            ? sec.title.replace(sec.titleEmWord, `<em>${sec.titleEmWord}</em>`)
            : sec.title;

        const layoutClass = {
            'grid-2': 'journey-grid',
            'grid-3': 'projects-grid',
            'cards': 'testimonials-grid',
            'list': 'skills-categories',
            'text': '',
        }[sec.layout] || 'journey-grid';

        let itemsHtml = '';
        if (sec.layout === 'text') {
            itemsHtml = sec.items.map(item => `
                <div class="about-content" style="max-width:700px;margin:0 auto;">
                    <div class="about-text">
                        ${item.title ? `<h3 style="margin-bottom:12px;">${item.title}</h3>` : ''}
                        <p>${item.description || ''}</p>
                    </div>
                </div>
            `).join('');
        } else {
            itemsHtml = `<div class="${layoutClass}">${sec.items.map((item, i) => `
                <div class="${sec.layout === 'cards' ? 'testimonial-card' : 'journey-card'}">
                    ${sec.layout === 'grid-2' ? `<div class="journey-number">${i + 1}</div>` : ''}
                    <h3>${item.title || ''}</h3>
                    ${item.subtitle ? `<p class="journey-place">${item.subtitle}</p>` : ''}
                    ${item.tag ? `<span class="project-tag" style="background:rgba(0,229,255,0.15);color:var(--accent);margin-bottom:8px;display:inline-block;">${item.tag}</span>` : ''}
                    <p style="font-size:14px;color:rgba(255,255,255,0.7);line-height:1.7;">${item.description || ''}</p>
                    ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener" style="color:var(--accent);font-size:14px;font-weight:500;margin-top:12px;display:inline-block;">${item.linkText || 'Learn more'}</a>` : ''}
                </div>
            `).join('')}</div>`;
        }

        let gradientHtml = '';
        if (sec.showGradient && sec.gradientColor) {
            gradientHtml = `<div class="section-glow glow-${sec.gradientPosition || 'center'}" style="background:radial-gradient(circle, ${sec.gradientColor}22 0%, transparent 70%)"></div>`;
        }

        const sectionEl = document.createElement('section');
        sectionEl.id = `custom-${sec.sectionId}`;
        sectionEl.className = `section ${sec.darkBg ? 'section-dark' : ''}`;
        sectionEl.style.position = 'relative';
        sectionEl.style.overflow = 'hidden';
        sectionEl.innerHTML = `
            ${gradientHtml}
            <div class="container" style="text-align:center;">
                ${sec.badge ? `<span class="section-badge">${sec.badge}</span>` : ''}
                <h2 class="section-title">${titleHtml}</h2>
                ${sec.subtitle ? `<p class="section-subtitle">${sec.subtitle}</p>` : ''}
                ${itemsHtml}
            </div>
        `;

        contactSection.parentNode.insertBefore(sectionEl, contactSection);
    });
}

// ─── Initialize ───────────────────────────────────────────

async function init() {
    const [personal, hero, stats, about, projects, skills, journey, testimonials, settings, customSections] = await Promise.all([
        API.getPersonal(),
        API.getHero(),
        API.getStats(),
        API.getAbout(),
        API.getProjects(),
        API.getSkillCategories(),
        API.getJourney(),
        API.getTestimonials(),
        API.getSiteSettings(),
        API.getCustomSections(),
    ]);

    renderHero(hero, personal, stats);
    renderAbout(about, personal);
    renderProjects(projects, personal.github);
    renderSkills(skills);
    renderJourney(journey);
    // renderTestimonials(testimonials);
    renderContact(personal);
    renderFooter(personal);
    applyGradients(settings);
    renderCustomSections(customSections);

    initAnimations();
    init3DScrollTilt();
    initFolderScroll();
}

// ─── Navbar Scroll ────────────────────────────────────────

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── Mobile Menu ──────────────────────────────────────────

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
let menuOverlay = null;

mobileMenuBtn.addEventListener('click', () => {
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'mobile-nav-overlay';
        // Mirror the desktop nav links dynamically
        const desktopLinks = document.querySelectorAll('.nav-links a');
        const linksHtml = Array.from(desktopLinks).map(a => `<a href="${a.getAttribute('href')}">${a.textContent}</a>`).join('');
        menuOverlay.innerHTML = `
            <button class="mobile-nav-close">&times;</button>
            ${linksHtml}
            <a href="#contact">Contact</a>
        `;
        document.body.appendChild(menuOverlay);
        menuOverlay.querySelector('.mobile-nav-close').addEventListener('click', closeMenu);
        menuOverlay.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    }
    requestAnimationFrame(() => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeMenu() {
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ─── Scroll Animations ───────────────────────────────────

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section-badge, .section-title, .section-subtitle, .contact-title, .contact-subtitle').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.projects-grid, .skills-categories, .journey-grid, .testimonials-grid').forEach(el => {
        el.classList.add('fade-in-stagger');
        observer.observe(el);
    });

    // Old folderObserver removed. Scroll logic handles it now.

    document.querySelectorAll('.about-content, .contact-grid, .hero-stats, .github-cta').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ─── Smooth Scroll ────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ─── Contact Form ─────────────────────────────────────────

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('contact-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnSuccess = submitBtn.querySelector('.btn-success');

    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
    };

    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;

    try {
        const result = await API.submitContact(formData);
        btnLoading.style.display = 'none';
        btnSuccess.style.display = 'inline';
        submitBtn.classList.add('btn-sent');

        if (!result.fallback) {
            form.reset();
            setTimeout(() => {
                btnSuccess.style.display = 'none';
                btnText.style.display = 'inline';
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-sent');
            }, 3000);
        }
    } catch (err) {
        btnLoading.style.display = 'none';
        btnText.style.display = 'inline';
        btnText.textContent = 'Failed. Try again.';
        submitBtn.disabled = false;
        setTimeout(() => { btnText.textContent = 'Send Message'; }, 3000);
    }
});

// ─── 3D Scroll Tilt Effect ────────────────────────────────
function init3DScrollTilt() {
    const cards = document.querySelectorAll('[data-tilt]');
    if (!cards.length) return;

    // Initial calculation in case they are already in view on load
    updateTilt(cards);

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => updateTilt(cards));
    }, { passive: true });
}

function updateTilt(cards) {
    const windowHeight = window.innerHeight;
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const rect = grid.getBoundingClientRect();

    // If completely off-screen, don't animate
    if (rect.bottom < 0 || rect.top > windowHeight) {
        return;
    }

    // Calculate offset based directly on the section's position in the viewport!
    // When rect.top == windowHeight (section just entering bottom of screen) -> offset = 1 (max tilt)
    // When rect.top <= 0 (section has reached the top of screen) -> offset = 0 (flat)
    let offset = rect.top / windowHeight;

    // Cap it between 0 (flat) and 1 (max tilt)
    let clampedOffset = Math.max(0, Math.min(1, offset));

    // Tilt to the right (rotateY negative) and slightly up (rotateX positive)
    const rotateY = clampedOffset * -60;
    const rotateX = clampedOffset * 10;
    const scale = 1 - (clampedOffset * 0.1);

    // Apply the EXACT same intensity to all cards synchronously
    cards.forEach(card => {
        const inner = card.querySelector('.press-card');
        if (inner) {
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        }
    });
}

// ─── Folder Scroll Animation ────────────────────────────────────────
function initFolderScroll() {
    const track = document.getElementById('folder-scroll-track');
    const folderFlap = document.querySelector('.react-folder-flap');
    const folderBase = document.querySelector('.react-folder');
    const cards = [
        document.querySelector('.react-card-1'),
        document.querySelector('.react-card-2'),
        document.querySelector('.react-card-3')
    ];

    if (!track || !folderFlap || !folderBase) return;

    window.addEventListener('scroll', () => {
        const rect = track.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        let progress = (windowHeight / 2 - rect.top) / (rect.height - windowHeight / 2);
        progress = Math.max(0, Math.min(1, progress));
        const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        // Drop the folder slightly down (only happens in the second half of the scroll)
        // This ensures cards pop out first, THEN folder drops just enough to sit below them
        const dropProgress = Math.max(0, (easeProgress - 0.5) * 2.0); // 0.0 to 1.0 during the second half
        const dropAmount = dropProgress * 120; // Drop distance (120 local px = 240 visual px)

        // We only translate the folder down. We DO NOT fade its opacity, 
        // because the cards are inside it and would disappear too!
        folderBase.style.transform = `translateY(${dropAmount}px)`;

        // translate MUST come before rotate so it moves straight down in global space
        folderFlap.style.transform = `translateY(${dropAmount}px) rotateX(${easeProgress * -40}deg)`;

        // Cards fan out locally. Keep Y values closer to 0 so they stay perfectly centered.
        const targetTransforms = [
            { x: -140, y: 30, rot: -15, scale: 1.0 },
            { x: 0, y: 20, rot: 2, scale: 1.1 },
            { x: 140, y: 40, rot: 18, scale: 1.0 }
        ];

        const initialTransforms = [
            { x: -38, y: 2, rot: -3, scale: 1 },
            { x: 0, y: 0, rot: 0, scale: 1 },
            { x: 42, y: 1, rot: 3.5, scale: 1 }
        ];

        cards.forEach((card, i) => {
            if (!card) return;
            const target = targetTransforms[i];
            const initial = initialTransforms[i];

            const currentX = initial.x + (target.x - initial.x) * easeProgress;
            let currentY = initial.y + (target.y - initial.y) * easeProgress;

            // Counteract folder drop so cards stay firmly planted in the center of the viewport
            currentY -= dropAmount;

            const currentRot = initial.rot + (target.rot - initial.rot) * easeProgress;
            const currentScale = initial.scale + (target.scale - initial.scale) * easeProgress;

            card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRot}deg) scale(${currentScale})`;
        });
    });
}

// ---------------- Boot ----------------
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Add Intersection Observer for testimonials
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
