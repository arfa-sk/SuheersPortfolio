const mongoose = require('mongoose');

const customItemSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    icon: String,
    link: String,
    linkText: String,
    tag: String,
    tagColor: String,
    image: String,
}, { _id: true });

const customSectionSchema = new mongoose.Schema({
    sectionId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    titleEmWord: { type: String, default: '' },
    subtitle: String,
    badge: String,
    layout: { type: String, enum: ['grid-2', 'grid-3', 'cards', 'text', 'list'], default: 'grid-2' },
    showGradient: { type: Boolean, default: false },
    gradientColor: { type: String, default: '#00e5ff' },
    gradientPosition: { type: String, enum: ['left', 'center', 'right', 'bottom-left', 'bottom-right'], default: 'center' },
    darkBg: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    items: [customItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('CustomSection', customSectionSchema);
