"use strict";

const RecordModel = require('../models/record');
const DocumentModel = require('../models/document')
const mongoose = require("mongoose")
const listRecords = (req, res) => {
    RecordModel.find()
        .then(records => {
            let response = records.map(record => {
                return {
                    id: record._id,
                    name: record.name,
                };
            });
            response.sort((a, b) => {
                return ('' + a.name).localeCompare(b.name);
            });
            res.status(200).json({records: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const addRecord = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "recordName")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a recordName property',
        });
    }

    const record = {
        name: req.body.recordName,
    }

    RecordModel.create(record)
        .then(record => {
            res.status(200).json({record: record});
        })
        .catch(error => {
            if (error.code === 11000) {
                res.status(400).json({
                    error: 'Record already exists',
                    message: error.message
                })
            } else {
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message,
                });
            }
        });
};

const listDocumentByRecordId = (req, res) => { // Return attributes based on selected DocumentTypeId
    DocumentModel.find({'recordId': mongoose.Types.ObjectId(req.params.recordId)})
        .then(documentList => {
            let response = documentList.map(document => {
                return {
                    id: document._id,
                    name: document.name,
                    parentFolderId: document.parentFolderId,
                    fileType: document.fileType,
                    createdOnDate: document.createdOnDate,
                    lastModifiedOnDate: document.lastModifiedOnDate,
                    comment: document.comment,
                    documentTypeId: document.documentTypeId,
                    createdBy: document.createdBy,
                };
            });
            res.status(200).json({documents: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

module.exports = {
    listRecords,
    addRecord,
    listDocumentByRecordId,
};
