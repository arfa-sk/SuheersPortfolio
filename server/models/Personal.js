const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
    name: String,
    shortName: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    github: String,
    linkedin: String,
    resumeUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Personal', personalSchema);
