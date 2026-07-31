const mongoose = require('mongoose');

const sectionConfigSchema = new mongoose.Schema({
    enabled: { type: Boolean, default: true },
    showGradient: { type: Boolean, default: false },
    gradientColor: { type: String, default: '#00e5ff' },
    gradientPosition: { type: String, enum: ['left', 'center', 'right', 'bottom-left', 'bottom-right'], default: 'center' },
}, { _id: false });

const siteSettingsSchema = new mongoose.Schema({
    accentColor: { type: String, default: '#00e5ff' },
    footerText: { type: String, default: 'Suheer Khan. All rights reserved.' },
    seoTitle: { type: String, default: 'Suheer Khan | Flutter Developer' },
    seoDescription: { type: String, default: 'Flutter Developer specializing in clean UI, scalable architecture, and seamless API integrations.' },
    sectionOrder: { type: [String], default: ['hero', 'about', 'projects', 'skills', 'experience', 'testimonials', 'contact'] },
    sections: {
        hero: { type: sectionConfigSchema, default: () => ({ enabled: true, showGradient: true, gradientColor: '#00e5ff', gradientPosition: 'center' }) },
        about: { type: sectionConfigSchema, default: () => ({ enabled: true, showGradient: true, gradientColor: '#00e5ff', gradientPosition: 'bottom-right' }) },
        projects: { type: sectionConfigSchema, default: () => ({ enabled: true, showGradient: false }) },
        skills: { type: sectionConfigSchema, default: () => ({ enabled: true, showGradient: true, gradientColor: '#0077b6', gradientPosition: 'bottom-left' }) },
        experience: { type: sectionConfigSchema, default: () => ({ enabled: true, showGradient: false }) },
        testimonials: { type: sectionConfigSchema, default: () => ({ enabled: true, showGradient: false }) },
        contact: { type: sectionConfigSchema, default: () => ({ enabled: true, showGradient: true, gradientColor: '#00e5ff', gradientPosition: 'center' }) },
    },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
