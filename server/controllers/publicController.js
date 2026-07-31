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

exports.getPersonal = async (req, res) => {
    try {
        const data = await Personal.findOne().lean();
        res.json(data || {});
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getHero = async (req, res) => {
    try {
        const data = await Hero.findOne().lean();
        res.json(data || {});
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAbout = async (req, res) => {
    try {
        const data = await About.findOne().lean();
        res.json(data || {});
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getStats = async (req, res) => {
    try {
        const data = await Stat.find().sort('order').lean();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getProjects = async (req, res) => {
    try {
        const data = await Project.find().sort('order').lean();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getSkills = async (req, res) => {
    try {
        const data = await SkillCategory.find().sort('order').lean();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getJourney = async (req, res) => {
    try {
        const data = await Journey.find().sort('order').lean();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTestimonials = async (req, res) => {
    try {
        const data = await Testimonial.find().sort('order').lean();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getSiteSettings = async (req, res) => {
    try {
        let data = await SiteSettings.findOne().lean();
        if (!data) data = await SiteSettings.create({});
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getCustomSections = async (req, res) => {
    try {
        const data = await CustomSection.find({ enabled: true }).sort('order').lean();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        await Contact.create({ name, email, message });
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getResume = async (req, res) => {
    try {
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        const files = fs.readdirSync(uploadsDir).filter(f => f.startsWith('resume'));
        if (files.length === 0) {
            return res.status(404).json({ error: 'No resume uploaded' });
        }
        res.download(path.join(uploadsDir, files[0]));
    } catch (err) { res.status(500).json({ error: err.message }); }
};
