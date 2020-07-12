"use strict";

const mongoose = require('mongoose');

// Define the schema

const WidgetSchema = new mongoose.Schema({
    dashboardId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    columnNo: {
        type: Number,
        required: true,
    },
    rowNo: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    widgetType: {
        type: String,
        enum: ['activity', 'graph', 'indicator'],
        required: true,
    }
});

// Export the model
module.exports = mongoose.model('Widget', WidgetSchema);
