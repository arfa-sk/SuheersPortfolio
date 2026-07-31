const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Resume upload config
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'),
    filename: (req, file, cb) => {
        // Remove old resume files
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        fs.readdirSync(uploadsDir)
            .filter(f => f.startsWith('resume'))
            .forEach(f => fs.unlinkSync(path.join(uploadsDir, f)));
        const ext = path.extname(file.originalname);
        cb(null, `resume${ext}`);
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = ['.pdf', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, allowed.includes(ext));
    },
    limits: { fileSize: 10 * 1024 * 1024 },
});

// All routes behind auth
router.use(auth);

// Singletons
router.put('/personal', c.updatePersonal);
router.put('/hero', c.updateHero);
router.put('/about', c.updateAbout);

// CRUD: Stats
router.get('/stats', c.stats.getAll);
router.post('/stats', c.stats.create);
router.put('/stats/:id', c.stats.update);
router.delete('/stats/:id', c.stats.remove);

// CRUD: Projects
router.get('/projects', c.projects.getAll);
router.post('/projects', c.projects.create);
router.put('/projects/:id', c.projects.update);
router.delete('/projects/:id', c.projects.remove);

// CRUD: Skills
router.get('/skills', c.skills.getAll);
router.post('/skills', c.skills.create);
router.put('/skills/:id', c.skills.update);
router.delete('/skills/:id', c.skills.remove);

// CRUD: Journey
router.get('/journey', c.journey.getAll);
router.post('/journey', c.journey.create);
router.put('/journey/:id', c.journey.update);
router.delete('/journey/:id', c.journey.remove);

// CRUD: Testimonials
router.get('/testimonials', c.testimonials.getAll);
router.post('/testimonials', c.testimonials.create);
router.put('/testimonials/:id', c.testimonials.update);
router.delete('/testimonials/:id', c.testimonials.remove);

// CRUD: Custom Sections
router.get('/custom-sections', c.customSections.getAll);
router.post('/custom-sections', c.customSections.create);
router.put('/custom-sections/:id', c.customSections.update);
router.delete('/custom-sections/:id', c.customSections.remove);

// Site Settings
router.get('/settings', c.getSiteSettings);
router.put('/settings', c.updateSiteSettings);

// Contacts
router.get('/contacts', c.contacts.getAll);
router.put('/contacts/:id/read', c.contacts.markRead);
router.delete('/contacts/:id', c.contacts.remove);

// Resume
router.post('/resume', upload.single('resume'), c.uploadResume);

module.exports = router;
