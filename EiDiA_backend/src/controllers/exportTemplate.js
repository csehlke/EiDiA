"use strict";

const ExportTemplateModel = require('../models/exportTemplate');
const DocumentModel = require('../models/document');
const RecordController = require('./record');
const {fileTypes} = require('../../../constants');

const listTemplates = (req, res) => {
    ExportTemplateModel.find().select('name')
        .then(templates => {
            res.status(200).json({exportTemplates: templates});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const getTemplate = (req, res) => {
    const templateId = req.params.templateId;

    ExportTemplateModel.findById(templateId).then(template => {
        res.status(200).json({template: template});
    })
};

const saveTemplate = (req, res) => {
    const template = req.body;
    if (template._id) {
        ExportTemplateModel.findByIdAndUpdate(template._id, {
            documentContent: template.documentContent,
            documentTypes: template.documentTypes,
            name: template.name
        }).then(() => {
            res.status(200).json({response: "success!"});
        })
    } else {
        ExportTemplateModel.create({
            documentContent: template.documentContent,
            documentTypes: template.documentTypes,
            name: template.name
        }).then(() => {
            res.status(200).json({response: "success!"});
        })
    }
};

const exportDocuments = (req, res) => {
    // TODO: provide documents from database
    const documentIDs = req.query.documentIDs;
    const dbQuery = {_id: {$in: documentIDs}}
    DocumentModel.find(dbQuery).then((documents) => {
        const docText = documents.map(doc => doc.completeOcrText);
        res.status(200).json({pdfText: docText})
    })
};

const downloadDocuments = (req, res) => {
    res.status(200).json({response: "success!"});
}

const getDocumentAttributes = (req, res) => {
    // TODO: provide documents for variable extraction
    const docNames = req.params.documentIDs;

    const documentMockData = {
        "doc_1": {
            "VARIABLE1": "BMW",
            "VARIABLE2": "500.000€"
        }
    };

    res.status(200).json({response: documentMockData});
}
const searchDocumentsByName = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.query, "documentName")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request query must contain the following search param: documentName',
        });
    }
    const query = req.query;
    const dbQuery = {fileType: {$ne: fileTypes.FOLDER}};
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
    exportDocuments,
    getTemplate,
    searchDocumentsByName,
    download: downloadDocuments,
    getDocumentAttributes
};
