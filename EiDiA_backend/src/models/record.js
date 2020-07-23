"use strict";

const mongoose = require('mongoose');

// Define the schema

const RecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdOnDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// Export the model
module.exports = mongoose.model('Record', RecordSchema);
