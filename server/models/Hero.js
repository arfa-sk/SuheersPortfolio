const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    greeting: String,
    title: String,
    subtitle: String,
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
