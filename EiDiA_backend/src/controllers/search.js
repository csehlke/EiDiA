"use strict";

const {format} = require('date-fns');
const mongoose = require('mongoose');
const DocumentModel = require('../models/document');
const FileTypes = require('../../../constants').fileTypes;
const RecordModel = require('../models/record');
const DateFns = require('date-fns');
const {fileTypes} = require("../../../constants");


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
    const dbQuery = {fileType: {$ne: fileTypes.FOLDER}};
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
        .then(fileArray => {
            return getSearchTable(fileArray, req.userId)
        })
        .then(table => {
            res.status(200).json({table: table});
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
    DocumentModel.find({$or: dbQuery, fileType: {$ne: fileTypes.FOLDER}})
        .then(fileArray => {
            return getSearchTable(fileArray, req.userId)
        })
        .then(table => {
            res.status(200).json({table: table});
        })
        .catch(error => {
            return res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

function getSearchTable(fileArray, userId) {
    let recordIds = [];
    fileArray.forEach(file => {
        if (!recordIds.includes('' + file.recordId)) {
            recordIds.push('' + file.recordId);
        }
    });

    return new Promise((resolve, reject) => {
        Promise.all(recordIds.map(recordId => getRecordFolderElements(recordId)))
            .then(folders => {
                fileArray.map(document => {

                    folders.push({
                        parentFolderId: document.recordId,
                        id: document._id,
                        activeFolder: false,
                        fileType: document.fileType,
                        name: document.name,
                        createdOnDate: format(document.createdOnDate, 'dd/MM/yyyy'),
                        lastModifiedOnDate: format(document.lastModifiedOnDate, 'dd/MM/yyyy'),
                        comment: document.comment,
                    });
                });
                return resolve(folders);
            })
            .catch(error => reject(error));
    });
}

function getRecordFolderElements(recordId) {
    return new Promise((resolve, reject) => {
        RecordModel.findById(recordId, {}, {}, (err, record) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (record === undefined || record === null) {
                resolve();
                return;
            }
            let folderElement = {
                parentFolderId: 0,
                id: recordId,
                activeFolder: true,
                fileType: FileTypes.FOLDER,
                name: record.name,
                createdOnDate: '',
                lastModifiedOnDate: '',
                comment: '',
            };
            resolve(folderElement);
        });
    });
}

module.exports = {
    basicSearch,
    advancedSearch,
};
