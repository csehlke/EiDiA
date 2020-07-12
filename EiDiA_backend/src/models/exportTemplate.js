"use strict";

const mongoose = require('mongoose');

// Define the schema

const ExportTemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    documentContent: {
        type: String,
        required: true,
    },
    documentTypes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
        }],
        required: true,
    },
});

// Export the model
module.exports = mongoose.model('ExportTemplate', ExportTemplateSchema);
