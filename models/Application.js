//Application Schema

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    submissionDate: { type: Date, default: Date.now },
    status: { type: String: enum: ['pending', 'approved', 'rejected'], default: 'pending' },   
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;