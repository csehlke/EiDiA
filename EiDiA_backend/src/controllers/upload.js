"use strict";

const DocumentModel = require('../models/document');

const uploadDocument = (req, res) => {
    res.status(200).json({response: "dummy response"});
};


const addAttributes = (req, res) => {
    DocumentModel.create({
        name: 'testDocument2',
        pathOnDisk: 'TestPath',
        rootFolderId: '5ef9e3d2c4664e04e4003576',
        documentTypeId: '5ef9e3d2c4664e04e4003576',
        recordId: '5ef9e3d2c4664e04e4003576'
    })
        .then(() => {
            console.log("HELLO")
            res.status(200).json({response: "Inserted data"});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

module.exports = {
    uploadDocument,
    addAttributes,
};

