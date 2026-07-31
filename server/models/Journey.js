const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    title: { type: String, required: true },
    place: String,
    description: String,
    order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Journey', journeySchema);
