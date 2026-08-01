/**
 * Site Renderer & Interactions
 * Reads from API layer and populates the DOM.
 */

// ─── SVG Icons ────────────────────────────────────────────
const ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.87 5.87 0 00-2.13 1.39A5.87 5.87 0 00.62 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.71 1.46 1.39 2.13a5.87 5.87 0 002.13 1.39c.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.87 5.87 0 002.13-1.39 5.87 5.87 0 001.39-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.87 5.87 0 00-1.39-2.13A5.87 5.87 0 0019.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1012 18.16 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1112 8a4 4 0 010 8zm6.41-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.02 3.02 0 002.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.5h7.59l5.24 6.93L18.9 1.5zm-1.3 18.83h2.04L6.5 3.56H4.3l13.3 16.77z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 21s-6.7-4.35-9.33-8.24C.87 10.2 1.4 6.6 4.36 4.9c2.28-1.3 5-.7 6.64 1.2C12.64 4.2 15.36 3.6 17.64 4.9c2.96 1.7 3.5 5.3 1.69 7.86C18.7 16.65 12 21 12 21z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>',
};

const TAG_COLORS = {
    orange: { bg: 'rgba(255, 171, 64, 0.15)', color: '#ffab40' },
    green: { bg: 'rgba(0, 230, 118, 0.15)', color: '#00e676' },
    purple: { bg: 'rgba(179, 136, 255, 0.15)', color: '#b388ff' },
    pink: { bg: 'rgba(255, 77, 166, 0.15)', color: '#ff4da6' },
    cyan: { bg: 'rgba(0, 229, 255, 0.15)', color: '#00e5ff' },
};

// ─── Video Embed Helper ───────────────────────────────────

function buildVideoEmbed(url) {
    if (!url) return '';

    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
    if (ytMatch) {
        return `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }

    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
        return `<div class="video-embed"><iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" title="Video" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    }

    return `<div class="video-embed"><video src="${url}" controls></video></div>`;
}

// ─── Renderers ────────────────────────────────────────────

function renderHero(hero, stats) {
    document.getElementById('hero-greeting').textContent = hero.greeting;
    document.getElementById('hero-title').innerHTML = hero.title;
    document.getElementById('hero-subtitle').textContent = hero.subtitle;
    document.getElementById('hero-video-wrap').innerHTML = buildVideoEmbed(hero.videoUrl);

    const statsEl = document.getElementById('hero-stats');
    if (statsEl) {
        statsEl.innerHTML = stats
            .map(s => `<div class="stat"><span class="stat-number">${s.number}</span><span class="stat-label">${s.label}</span></div>`)
            .join('');
    }
}

function renderWork(work) {
    document.getElementById('work-grid').innerHTML = work.map(w => {
        const thumbStyle = w.thumbnail ? `background-image:url('${w.thumbnail}');` : '';
        const card = `
            <div class="work-thumb" style="${thumbStyle}">
                <div class="play-badge">${ICONS.play}</div>
            </div>
            <div class="work-info">
                <h3>${w.title}</h3>
                ${w.tag ? `<span class="work-tag" style="background:${TAG_COLORS[w.tagColor]?.bg};color:${TAG_COLORS[w.tagColor]?.color}">${w.tag}</span>` : ''}
                <p>${w.description || ''}</p>
            </div>
        `;
        return w.videoUrl
            ? `<a href="${w.videoUrl}" target="_blank" rel="noopener" class="work-card">${card}</a>`
            : `<div class="work-card">${card}</div>`;
    }).join('');
}

function renderImpact(impact) {
    document.getElementById('impact-track').innerHTML = impact.map(item => {
        const thumbStyle = item.thumbnail ? `background-image:url('${item.thumbnail}');` : '';
        const card = `
            <div class="impact-thumb" style="${thumbStyle}">
                ${item.metric ? `<span class="like-badge">${ICONS.heart} ${item.metric}</span>` : ''}
            </div>
            <p class="impact-client">Client: ${item.clientName}</p>
        `;
        return item.videoUrl
            ? `<a href="${item.videoUrl}" target="_blank" rel="noopener" class="impact-card">${card}</a>`
            : `<div class="impact-card">${card}</div>`;
    }).join('');
}

function renderProcess(steps) {
    const processGrid = document.getElementById('process-grid');
    if (processGrid) {
        processGrid.innerHTML = steps.map((s, i) => `
            <div class="process-card">
                <div class="process-number">${i + 1}</div>
                <h3>${s.title}</h3>
                ${s.place ? `<p class="process-place">${s.place}</p>` : ''}
                <p>${s.description}</p>
            </div>
        `).join('');
    }
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

function renderOffers(offers) {
    document.getElementById('offers-grid').innerHTML = offers.map(o => `
        <div class="pricing-card">
            <h3>${o.title}</h3>
            <p class="pricing-desc">${o.description || ''}</p>
            <ul class="pricing-features">
                ${(o.features || []).map(f => `<li>${f}</li>`).join('')}
            </ul>
            <a href="${o.ctaLink || '#booking'}" class="btn btn-outline pricing-cta">${o.ctaText || 'I need this'}</a>
        </div>
    `).join('');
}

function renderFaq(faq) {
    document.getElementById('faq-list').innerHTML = faq.map((f, i) => `
        <div class="faq-item">
            <button class="faq-question" data-index="${i}">
                <span>${f.question}</span>
                <span class="faq-icon">${ICONS.plus}</span>
            </button>
            <div class="faq-answer"><p>${f.answer || ''}</p></div>
        </div>
    `).join('');

    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.toggle('open');
        });
    });
}

function renderBooking(settings) {
    const embed = document.getElementById('calendly-embed');
    const url = settings.calendlyUrl;
    if (!url) return;

    embed.dataset.url = url;

    if (!document.getElementById('calendly-widget-script')) {
        const script = document.createElement('script');
        script.id = 'calendly-widget-script';
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
    }
}

function renderFooter(personal) {
    document.getElementById('footer-location').textContent = personal.location;

    const footerEmail = document.getElementById('footer-email');
    footerEmail.href = `mailto:${personal.email}`;
    footerEmail.textContent = personal.email;

    const footerPhone = document.getElementById('footer-phone');
    footerPhone.href = `tel:${(personal.phone || '').replace(/[^+\d]/g, '')}`;
    footerPhone.textContent = personal.phone;

    const socials = [
        personal.instagram && `<a href="${personal.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>`,
        personal.youtube && `<a href="${personal.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ICONS.youtube}</a>`,
        personal.twitter && `<a href="${personal.twitter}" target="_blank" rel="noopener" aria-label="Twitter">${ICONS.twitter}</a>`,
        personal.linkedin && `<a href="${personal.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>`,
    ].filter(Boolean).join('');

    document.getElementById('footer-socials').innerHTML = socials;
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
        document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} ${settings.footerText}`;
    }

    // Apply section gradients / visibility
    const sectionMap = {
        work: document.getElementById('work'),
        impact: document.getElementById('impact'),
        process: document.getElementById('process'),
        testimonials: document.getElementById('testimonials'),
        offers: document.getElementById('offers'),
        faq: document.getElementById('faq'),
        booking: document.getElementById('booking'),
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
        const labelMap = { work: 'Our Work', process: 'Process', offers: 'Pricing' };
        let navHtml = '';
        (settings.sectionOrder || Object.keys(labelMap)).forEach(key => {
            if (!labelMap[key]) return;
            const cfg = settings.sections[key];
            if (cfg && cfg.enabled === false) return;
            navHtml += `<li><a href="#${key}">${labelMap[key]}</a></li>`;
        });
        navLinks.innerHTML = navHtml;
    }
}

// ─── Custom Section Renderer ──────────────────────────────

function renderCustomSections(sections) {
    if (!sections || !sections.length) return;

    const bookingSection = document.getElementById('booking');
    sections.forEach(sec => {
        if (!sec.enabled) return;

        const titleHtml = sec.titleEmWord
            ? sec.title.replace(sec.titleEmWord, `<em>${sec.titleEmWord}</em>`)
            : sec.title;

        const layoutClass = {
            'grid-2': 'process-grid',
            'grid-3': 'work-grid-generic',
            'cards': 'testimonials-grid',
            'list': 'process-grid',
            'text': '',
        }[sec.layout] || 'process-grid';

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
                <div class="${sec.layout === 'cards' ? 'testimonial-card' : 'process-card'}">
                    ${sec.layout === 'grid-2' ? `<div class="process-number">${i + 1}</div>` : ''}
                    <h3>${item.title || ''}</h3>
                    ${item.subtitle ? `<p class="process-place">${item.subtitle}</p>` : ''}
                    ${item.tag ? `<span class="work-tag" style="background:rgba(0,229,255,0.15);color:var(--accent);margin-bottom:8px;display:inline-block;">${item.tag}</span>` : ''}
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

        bookingSection.parentNode.insertBefore(sectionEl, bookingSection);
    });
}

// ─── Initialize ───────────────────────────────────────────

async function init() {
    const [personal, hero, stats, work, impact, process, testimonials, offers, faq, settings, customSections] = await Promise.all([
        API.getPersonal(),
        API.getHero(),
        API.getStats(),
        API.getWork(),
        API.getImpact(),
        API.getProcess(),
        API.getTestimonials(),
        API.getOffers(),
        API.getFaq(),
        API.getSiteSettings(),
        API.getCustomSections(),
    ]);

    renderHero(hero, stats);
    renderWork(work);
    renderImpact(impact);
    renderProcess(process);
    renderTestimonials(testimonials);
    renderOffers(offers);
    renderFaq(faq);
    renderBooking(settings);
    renderFooter(personal);
    applyGradients(settings);
    renderCustomSections(customSections);

    initAnimations();
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
            <a href="#booking">Book a Call</a>
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

    document.querySelectorAll('.section-badge, .section-title, .section-subtitle').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.work-grid, .process-grid, .testimonials-grid, .pricing-grid, .faq-list').forEach(el => {
        el.classList.add('fade-in-stagger');
        observer.observe(el);
    });

    document.querySelectorAll('.hero-stats, .impact-scroll').forEach(el => {
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

// ─── Boot ─────────────────────────────────────────────────
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



document.addEventListener('DOMContentLoaded', () => {
    init();
    initFolderScroll();
});
