"use strict";

const mongoose = require('mongoose');

// Define the schema

const WidgetSchema = new mongoose.Schema({
    recordId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    positionInfo: {
        type: {
            x: {
                type: Number,
                required: true,
            },
            y: {
                type: Number,
                required: true,
            }
        }
    },

    title: {
        type: String,
        required: true,
    },
    widgetType: {
        type: String,
        enum: ['Log', 'Graph', 'Indicator'],
        required: true,
    },
    graphType: {
        type: String,
        enum: ['Line Chart', 'Bar Chart'],
        required: false,
    },
    attributeMapping: [
        {
            docTypeId: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
            attributeId: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
            displayName: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                enum: ['red', 'green', 'blue', 'pink', 'orange'],
                required: false,
            }
        }
    ]

});

// Export the model
module.exports = mongoose.model('Widget', WidgetSchema);
