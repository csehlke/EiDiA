"use strict";

const DocumentModel = require('../models/document');
const ErrorHandling = require('./errorHandling');

const uploadDocument = (req, res) => {
    res.status(200).json({response: "dummy response"});
};


const addAttributes = (req, res) => {
    let errors = [];
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'name'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'pathOnDisk'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'rootFolderId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'documentTypeId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'recordId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'uploadedBy'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'completeOcrText'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'comment'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'priority'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'department'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'attributeData'));
    errors = errors.filter(error => error); // get rid of null entries

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: errors.join('\n'),
        });
    }
    DocumentModel.create({
        name: req.body.name,
        pathOnDisk: req.body.pathOnDisk,
        rootFolderId: req.body.rootFolderId,
        documentTypeId: req.body.documentTypeId,
        recordId: req.body.recordId,
        uploadedBy: req.body.uploadedBy,
        completeOcrText: req.body.completeOcrText,
        comment: req.body.comment,
        priority: req.body.priority,
        department: req.body.department,
        attributes: req.body.attributeData
    })
        .then(() => {
            res.status(200).json({response: "Inserted attribute-data"});
        })
        .catch(error => {
            res.status(400).json({
                error: error.message,
                message: error.message,
            });
        });
};

module.exports = {
    uploadDocument,
    addAttributes,
};
