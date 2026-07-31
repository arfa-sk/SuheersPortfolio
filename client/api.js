/**
 * API Abstraction Layer
 *
 * Fetches from the backend server.
 * Falls back to static PORTFOLIO data (data.js) if the server is unreachable.
 */

const API = {
    baseUrl: window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://suheer-portfolio-api.onrender.com',

    async _fetch(path) {
        try {
            const res = await fetch(`${this.baseUrl}/api${path}`);
            if (!res.ok) throw new Error(res.statusText);
            return await res.json();
        } catch {
            return null;
        }
    },

    async getPersonal() {
        return (await this._fetch('/personal')) || PORTFOLIO.personal;
    },

    async getHero() {
        return (await this._fetch('/hero')) || PORTFOLIO.hero;
    },

    async getStats() {
        return (await this._fetch('/stats')) || PORTFOLIO.stats;
    },

    async getAbout() {
        return (await this._fetch('/about')) || PORTFOLIO.about;
    },

    async getProjects() {
        return (await this._fetch('/projects')) || PORTFOLIO.projects;
    },

    async getSkillCategories() {
        return (await this._fetch('/skills')) || PORTFOLIO.skillCategories;
    },

    async getJourney() {
        return (await this._fetch('/journey')) || PORTFOLIO.journey;
    },

    async getTestimonials() {
        return (await this._fetch('/testimonials')) || PORTFOLIO.testimonials;
    },

    async getSiteSettings() {
        return (await this._fetch('/settings')) || {};
    },

    async getCustomSections() {
        return (await this._fetch('/custom-sections')) || [];
    },

    async submitContact(formData) {
        try {
            const res = await fetch(`${this.baseUrl}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to send');
            return { success: true };
        } catch {
            // Fallback to mailto
            const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
            const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
            window.location.href = `mailto:${PORTFOLIO.personal.email}?subject=${subject}&body=${body}`;
            return { success: true, fallback: true };
        }
    },
};
