const router = require('express').Router();
const c = require('../controllers/publicController');

router.get('/personal', c.getPersonal);
router.get('/hero', c.getHero);
router.get('/about', c.getAbout);
router.get('/stats', c.getStats);
router.get('/projects', c.getProjects);
router.get('/skills', c.getSkills);
router.get('/journey', c.getJourney);
router.get('/testimonials', c.getTestimonials);
router.get('/settings', c.getSiteSettings);
router.get('/custom-sections', c.getCustomSections);
router.post('/contact', c.submitContact);
router.get('/resume', c.getResume);

module.exports = router;
