"use strict";

const DocumentModel = require('../models/document');

const uploadDocument = (req, res) => {
    res.status(200).json({response: "dummy response"});
};


const addAttributes = (req, res) => {
    DocumentModel.create({
        name: req.body.name,
        pathOnDisk: req.body.pathOnDisk,
        rootFolderId: req.body.rootFolderId,
        documentTypeId: req.body.documentTypeId,
        recordId: req.body.recordId
    })
        .then(() => {
            res.status(200).json({response: "Inserted attribute-data"});
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

