"use strict";

const ExportTemplateModel = require('../models/exportTemplate');
const DocumentModel = require('../models/document');
const RecordController = require('./record');
const {fileTypes} = require('../../../constants');
const mongoose = require('mongoose');

// Send all templates
const listTemplates = (req, res) => {
    ExportTemplateModel.find().select('name')
        .then(templates => {
            res.status(200).json({exportTemplates: templates});
        }).catch(error => {
        res.status(400).json({
            error: 'Internal server error',
            message: error.message,
        });
    });
};

// send template data of given template_id
const getTemplate = (req, res) => {
    const templateId = req.params.templateId;

    ExportTemplateModel.findById(templateId).then(template => {
        res.status(200).json({template: template});
    }).catch(error => {
        res.status(400).json({
            error: 'Internal server error',
            message: error.message,
        });
    });
};

// update or insert template in database
const saveTemplate = (req, res) => {
    const template = req.body;
    if (template._id) {
        ExportTemplateModel.findByIdAndUpdate(template._id, {
            documentContent: template.documentContent,
            documentTypes: template.documentTypes,
            name: template.name
        }).then(() => {
            res.status(200).json({response: "success!"});
        }).catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
    } else {
        ExportTemplateModel.create({
            documentContent: template.documentContent,
            documentTypes: template.documentTypes,
            name: template.name
        }).then(() => {
            res.status(200).json({response: "success!"});
        }).catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
    }
};

// send linked Documents for pdf download
const exportDocuments = (req, res) => {
    let documentIDs = req.query.documentIDs;

    if (!Array.isArray(documentIDs)) {
        documentIDs = [documentIDs]
    }
    const mongooseIDs = documentIDs.map((id) => mongoose.Types.ObjectId(id));
    const dbQuery = {_id: {$in: mongooseIDs}};

    DocumentModel.find(dbQuery).select('completeOcrText -_id').then((documents) => {
        res.status(200).json({pdfText: documents});
    }).catch(error => {
        res.status(400).json({
            error: 'Internal server error',
            message: error.message,
        });
    });
};

// Send document attributes for value mapping
const getDocumentAttributes = (req, res) => {
    let docNames = req.query.documentIDs;

    if (!Array.isArray(docNames)) {
        docNames = [docNames]
    }

    docNames = docNames.map(doc => {
        return mongoose.Types.ObjectId(doc)
    })

    DocumentModel.aggregate([
            {$match: {_id: {$in: docNames}}},
            {$unwind: "$attributes"},
            {
                "$project": {

                    "docTypeId": "$documentTypeId",
                    "date": "$createdOnDate",
                    "attributeId": "$attributes.attributeId",
                    "value": "$attributes.value",

                }
            },
            {$lookup: {from: 'attributetypes', localField: 'attributeId', foreignField: '_id', as: 'test'}},
            {$unwind: "$test"},
            {
                "$project": {

                    "docTypeId": "$documentTypeId",
                    "attribute": {
                        "name": "$test.name",
                        "value": "$value"
                    },
                }
            }

        ],
        function (err, documents) {
            let responseObj = {};
            documents.forEach((doc) => {
                if (!(doc._id in responseObj)) {
                    responseObj[doc._id] = {};
                }
                let name = doc.attribute.name.split(' ').join('');
                responseObj[doc._id][name] = doc.attribute.value;
            })

            res.status(200).json({documentAttributes: responseObj});
        });
}

// send search results
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
        }).then(minimalDocuments => {
        minimalDocuments.sort((a, b) => {
            return ('' + a.name).localeCompare(b.name);
        });
        res.status(200).json({documents: minimalDocuments});
    }).catch(error => {
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
    getDocumentAttributes
};
