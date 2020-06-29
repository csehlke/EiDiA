"use strict";

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
    res.status(200).json({response: "dummy response"});
};

module.exports = {
    basicSearch,
    advancedSearch,
};
