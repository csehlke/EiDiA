"use strict";

const mongoose = require('mongoose');

// Define the schema

const DocumentTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dataType: {
        type: String,
        enum: ['text', 'number', 'date'],
        required: true,
    },
    documentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
});

// Export the model
module.exports = mongoose.model('DocumentType', DocumentTypeSchema);
