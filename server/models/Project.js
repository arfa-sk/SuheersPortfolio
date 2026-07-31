const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tag: String,
    tagColor: String,
    description: String,
    tech: [String],
    github: String,
    gradient: String,
    icon: String,
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
