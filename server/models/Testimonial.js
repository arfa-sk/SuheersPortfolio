const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    quote: { type: String, required: true },
    name: { type: String, required: true },
    role: String,
    avatar: String,
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
