"use strict";

const ExportTemplateModel = require('../models/exportTemplate');
const DocumentModel = require('../models/document');
const RecordController = require('./record');

const listTemplates = (req, res) => {
    ExportTemplateModel.find()
        .then(exportTemplates => {
            let response = exportTemplates.map(exportTemplate => {
                return {
                    id: exportTemplate._id,
                    name: exportTemplate.name,
                };
            });
            res.status(200).json({exportTemplates: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const saveTemplate = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const exportDocument = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const download = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const searchDocumentsByName = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.query, "documentName")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request query must contain the following search param: documentName',
        });
    }

    const query = req.query;
    const dbQuery = {};
    dbQuery['name'] = {$regex: ".*" + query.documentName + ".*"};

    DocumentModel.find(dbQuery)
        .then(documents => {
            return Promise.all(documents.map(document => {
                return new Promise((resolve, reject) => {
                    RecordController.getRecordName(document.recordId)
                        .then(recordName => {
                            resolve({
                                id: document._id,
                                name: document.name + " (" + recordName + ")",
                                documentTypeId: document.documentTypeId,
                            });
                        })
                        .catch(err => reject(err));
                });
            }));
        })
        .then(minimalDocuments => {
            minimalDocuments.sort((a, b) => {
                return ('' + a.name).localeCompare(b.name);
            });
            res.status(200).json({documents: minimalDocuments});
        })
        .catch(error => {
            return res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        })
}

module.exports = {
    listTemplates,
    saveTemplate,
    exportDocument,
    download,
    searchDocumentsByName,
};
