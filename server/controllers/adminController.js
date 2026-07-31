const Personal = require('../models/Personal');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Stat = require('../models/Stat');
const Project = require('../models/Project');
const SkillCategory = require('../models/SkillCategory');
const Journey = require('../models/Journey');
const Testimonial = require('../models/Testimonial');
const Contact = require('../models/Contact');
const SiteSettings = require('../models/SiteSettings');
const CustomSection = require('../models/CustomSection');
const path = require('path');
const fs = require('fs');

// ─── Singleton Updates ─────────────────────────────

exports.updatePersonal = async (req, res) => {
    try {
        const data = await Personal.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateHero = async (req, res) => {
    try {
        const data = await Hero.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateAbout = async (req, res) => {
    try {
        const data = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// ─── Generic CRUD Factory ──────────────────────────

function crudController(Model) {
    return {
        async getAll(req, res) {
            try {
                const data = await Model.find().sort('order').lean();
                res.json(data);
            } catch (err) { res.status(500).json({ error: err.message }); }
        },
        async create(req, res) {
            try {
                const count = await Model.countDocuments();
                const data = await Model.create({ ...req.body, order: req.body.order ?? count });
                res.status(201).json(data);
            } catch (err) { res.status(500).json({ error: err.message }); }
        },
        async update(req, res) {
            try {
                const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!data) return res.status(404).json({ error: 'Not found' });
                res.json(data);
            } catch (err) { res.status(500).json({ error: err.message }); }
        },
        async remove(req, res) {
            try {
                const data = await Model.findByIdAndDelete(req.params.id);
                if (!data) return res.status(404).json({ error: 'Not found' });
                res.json({ success: true });
            } catch (err) { res.status(500).json({ error: err.message }); }
        },
    };
}

exports.stats = crudController(Stat);
exports.projects = crudController(Project);
exports.skills = crudController(SkillCategory);
exports.journey = crudController(Journey);
exports.testimonials = crudController(Testimonial);
exports.customSections = crudController(CustomSection);

// ─── Site Settings ─────────────────────────────────

exports.getSiteSettings = async (req, res) => {
    try {
        let data = await SiteSettings.findOne().lean();
        if (!data) data = await SiteSettings.create({});
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateSiteSettings = async (req, res) => {
    try {
        const data = await SiteSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// ─── Contacts ──────────────────────────────────────

exports.contacts = {
    async getAll(req, res) {
        try {
            const data = await Contact.find().sort('-createdAt').lean();
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    },
    async markRead(req, res) {
        try {
            const data = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
            if (!data) return res.status(404).json({ error: 'Not found' });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    },
    async remove(req, res) {
        try {
            await Contact.findByIdAndDelete(req.params.id);
            res.json({ success: true });
        } catch (err) { res.status(500).json({ error: err.message }); }
    },
};

// ─── Resume Upload ─────────────────────────────────

exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        // Update personal resumeUrl to point to API endpoint
        await Personal.findOneAndUpdate({}, { resumeUrl: '/api/resume' }, { upsert: true });

        res.json({ success: true, filename: req.file.filename });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
