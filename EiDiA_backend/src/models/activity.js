"use strict";

const mongoose = require('mongoose');

// Define the schema

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    recordId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
});

// Export the model
module.exports = mongoose.model('Activity', ActivitySchema);
