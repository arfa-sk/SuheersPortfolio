const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
});

adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
};

adminSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Admin', adminSchema);
