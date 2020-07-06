"use strict";

const mongoose = require('mongoose');

// Define the schema

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    picture: {
        type: mongoose.Schema.Types.Buffer
    },
    workPosition: {
        type: String,
        trim: true,
    },
    workLocation: {
        type: String,
        trim: true,
    },
    userRole: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        index: true,
    },
});

// Export the model
module.exports = mongoose.model('User', UserSchema);
