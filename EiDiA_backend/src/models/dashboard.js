"use strict";

const mongoose = require('mongoose');

// Define the schema

const DashboardSchema = new mongoose.Schema({
    recordId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

});

// Export the model
module.exports = mongoose.model('Dashboard', DashboardSchema);
