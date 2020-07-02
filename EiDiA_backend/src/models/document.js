"use strict";

const mongoose = require('mongoose');

// Define the schema

const DocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    createdOnDate: {
        type: Date,
        required: true,
        default: Date.now,
        index: true,
    },
    lastModifiedOnDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    recordId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    rootFolderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    documentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    completeOcrText: {
        type: String,
        trim: true,
        index: true,
    },
    base64Image: {
        type: String,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    comment: {
        type: String,
    },
    priority: {
        type: String,
    },
    department: {
        type: [String],
    },

    attributes: [
        {
            attributeId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                index: true,
            },
            value: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
            },
        },
    ],
});

// Export the model
module.exports = mongoose.model('Document', DocumentSchema);
