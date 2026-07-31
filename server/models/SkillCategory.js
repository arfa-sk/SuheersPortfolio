const mongoose = require('mongoose');

const skillItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: String,
    invert: { type: Boolean, default: false },
}, { _id: true });

const skillCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
    items: [skillItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('SkillCategory', skillCategorySchema);
