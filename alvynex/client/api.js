/**
 * API Abstraction Layer
 *
 * Fetches from the backend server.
 * Falls back to static PORTFOLIO data (data.js) if the server is unreachable.
 */

const API = {
    async getPersonal() { return PORTFOLIO.personal; },
    async getHero() { return PORTFOLIO.hero; },
    async getStats() { return PORTFOLIO.stats; },
    async getWork() { return PORTFOLIO.work; },
    async getImpact() { return PORTFOLIO.impact; },
    async getProcess() { return PORTFOLIO.process; },
    async getTestimonials() { return PORTFOLIO.testimonials; },
    async getOffers() { return PORTFOLIO.offers; },
    async getFaq() { return PORTFOLIO.faq; },
    async getSiteSettings() { return { calendlyUrl: 'https://calendly.com/suheer-alvynx/30min' }; },
    async getCustomSections() { return []; },
};
