"use strict";

const mongoose = require('mongoose');
const DocumentModel = require('../models/document');
const DateFns = require('date-fns');


const basicSearch = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.query, "recordId") &&
        !Object.prototype.hasOwnProperty.call(req.query, "documentTypeId") &&
        !Object.prototype.hasOwnProperty.call(req.query, "dateFrom") &&
        !Object.prototype.hasOwnProperty.call(req.query, "dateTo") &&
        !Object.prototype.hasOwnProperty.call(req.query, "fullText") &&
        !Object.prototype.hasOwnProperty.call(req.query, "userId")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request query must contain one of the following search params: recordId, documentTypeId, dateFrom, dateTo, fullText, userId',
        });
    }

    // Create DB Query
    const query = req.query;
    const dbQuery = {};
    if (query.recordId) {
        dbQuery['recordId'] = query.recordId;
    }
    if (query.documentTypeId) {
        dbQuery['documentTypeId'] = query.documentTypeId;
    }
    if (query.dateFrom) {
        const date = DateFns.parse(query.dateFrom, 'dd/MM/yyyy', new Date());
        dbQuery['lastModifiedOnDate'] = {$gte: date};
    }
    if (query.dateTo) {
        const date = DateFns.parse(query.dateTo, 'dd/MM/yyyy', new Date());
        dbQuery['createdOnDate'] = {$lte: date};
    }
    if (query.fullText) {
        dbQuery['completeOcrText'] = {$regex: ".*" + query.fullText + ".*"};
    }
    if (query.userId) {
        dbQuery['createdBy'] = query.userId;
    }

    // Query DB
    DocumentModel.find(dbQuery)
        .then(documents => {
            res.status(200).json({response: documents}); // TODO bring in correct format
        })
        .catch(error => {
            return res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const advancedSearch = (req, res) => {
    const query = req.query;
    let i = 0;
    let structuredQueries = [];
    // create objects that contain everything to one constraint
    while (Object.prototype.hasOwnProperty.call(req.query, "documentTypeId-" + i)) {
        let structuredQuery = {};
        structuredQuery['documentTypeId'] = query['documentTypeId-' + i];
        if (query['attributeTypeId-' + i]) {
            structuredQuery['attributeTypeId'] = query['attributeTypeId-' + i];
        }
        if (query['compareTypeId-' + i]) {
            structuredQuery['compareTypeId'] = query['compareTypeId-' + i];
        }
        if (query['value1-' + i]) {
            structuredQuery['value1'] = query['value1-' + i];
        }
        if (query['value2-' + i]) {
            structuredQuery['value2'] = query['value2-' + i];
        }
        structuredQueries.push(structuredQuery);
        i++;
    }
    let documentTypes = [];
    let groupedByDocumentTypeQueries = {};
    // create object that contain everything to one documentType
    structuredQueries.map(structuredQuery => {
        if (documentTypes.includes(structuredQuery.documentTypeId)) {
            groupedByDocumentTypeQueries[structuredQuery.documentTypeId].push(structuredQuery);
        } else {
            documentTypes.push(structuredQuery.documentTypeId);
            groupedByDocumentTypeQueries[structuredQuery.documentTypeId] = [structuredQuery];
        }
    });

    // create query
    let dbQuery = []; // OR operator will be applied to elements
    documentTypes.map(documentType => {
        let attributeQueries = [];
        groupedByDocumentTypeQueries[documentType].map(attributeConstraint => {
            let date;
            // EiDiA_frontend/src/assets/CompareTypes
            switch (attributeConstraint.compareTypeId) {
                case '101':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: attributeConstraint.value1
                        }
                    });
                    break;
                case '102':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$regex: attributeConstraint.value1 + ".*"}
                        }
                    });
                    break;
                case '103':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$regex: ".*" + attributeConstraint.value1}
                        }
                    });
                    break;
                case '104':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$regex: ".*" + attributeConstraint.value1 + ".*"}
                        }
                    });
                    break;
                case '201':
                    date = DateFns.parse(attributeConstraint.value1, 'dd/MM/yyyy', new Date());
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$lte: date}
                        }
                    });
                    break;
                case '202':
                    date = DateFns.parse(attributeConstraint.value1, 'dd/MM/yyyy', new Date());
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$gte: date}
                        }
                    });
                    break;
                case '203':
                    date = DateFns.parse(attributeConstraint.value1, 'dd/MM/yyyy', new Date());
                    const date2 = DateFns.parse(attributeConstraint.value2, 'dd/MM/yyyy', new Date());
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$gte: date, $lte: date2}
                        }
                    });
                    break;
                case '301':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: Number.parseInt(attributeConstraint.value1, 10)
                        }
                    });
                    break;
                case '302':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$gt: Number.parseInt(attributeConstraint.value1, 10)}
                        }
                    });
                    break;
                case '303':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$gte: Number.parseInt(attributeConstraint.value1, 10)}
                        }
                    });
                    break;
                case '304':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$lt: Number.parseInt(attributeConstraint.value1, 10)}
                        }
                    });
                    break;
                case '305':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {$lte: Number.parseInt(attributeConstraint.value1, 10)}
                        }
                    });
                    break;
                case '306':
                    attributeQueries.push({
                        $elemMatch: {
                            attributeId: mongoose.Types.ObjectId(attributeConstraint.attributeTypeId),
                            value: {
                                $gte: Number.parseInt(attributeConstraint.value1, 10),
                                $lte: Number.parseInt(attributeConstraint.value2, 10)
                            }
                        }
                    });
                    break;
                default:
            }
        });
        let documentQuery = {
            documentTypeId: groupedByDocumentTypeQueries[documentType][0].documentTypeId,
            attributes: {$all: attributeQueries},
        }
        dbQuery.push(documentQuery);
    });

    // Query DB
    DocumentModel.find({$or: dbQuery})
        .then(documents => {
            res.status(200).json({response: documents}); // TODO bring in correct format
        })
        .catch(error => {
            return res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

module.exports = {
    basicSearch,
    advancedSearch,
};
