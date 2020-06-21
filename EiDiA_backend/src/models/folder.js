"use strict";

const mongoose = require('mongoose');

// Define the schema

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    createdOnDate: {
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
});

// Export the model
module.exports = mongoose.model('Folder', FolderSchema);
