"use strict";

const mongoose = require('mongoose');

// Define the schema

const DocumentTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
});

// Export the model
module.exports = mongoose.model('DocumentType', DocumentTypeSchema);
