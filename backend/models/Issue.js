// models/Issue.js
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    urgency: { type: String, default: 'low' },
    createdAt: { type: Date, default: Date.now },
    status: String,
});

module.exports = mongoose.model('Issue', issueSchema);
