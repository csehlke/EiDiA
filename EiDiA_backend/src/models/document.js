"use strict";

const mongoose = require('mongoose');
const AttributeTypeModel = require('../models/attributeType');
const DocumentTypeModel = require('../models/documentType')
const {fileTypes} = require('../../../constants');

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
    parentFolderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    documentTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: DocumentTypeModel
    },
    completeOcrText: {
        type: String,
        trim: true,
        index: true,
    },
    base64Image: {
        type: String,
        required: true,
    },
    createdBy: {
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
    fileType: {
        type: String,
        enum: Object.values(fileTypes),
        required: false,
    },

    attributes: [
        {
            attributeId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                index: true,
                ref: AttributeTypeModel
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
