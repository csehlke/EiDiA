"use strict";

const mongoose = require('mongoose');

// Define the schema

const LogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    log: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    recordId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
});

// Export the model
module.exports = mongoose.model('Log', LogSchema);
