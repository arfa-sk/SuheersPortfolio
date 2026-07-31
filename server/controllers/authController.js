const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, username: admin.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
