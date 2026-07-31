const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    badge: String,
    title: String,
    subtitle: String,
    paragraphs: [String],
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
