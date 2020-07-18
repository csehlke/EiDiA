"use strict";

const {fileTypes} = require("../../../constants");
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

const listFoldersByRecordId = (req, res) => { // Return only folders based on selected DocumentTypeId

    let parentFolderId;

    DocumentModel.find({'recordId': mongoose.Types.ObjectId(req.params.recordId), 'fileType': fileTypes.FOLDER})
        .then(documentList => {
            let response = documentList.map(document => {

                if (document.parentFolderId.toString() === '000000000000000000000000') {
                    parentFolderId = '0' // In frontend, 0 = root Folder
                } else {
                    parentFolderId = document.parentFolderId
                }
                return {
                    id: document._id,
                    name: document.name,
                    parentFolderId: parentFolderId,
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

const getRecordName = (id) => {
    return new Promise((resolve, reject) => {
        RecordModel.findById(id, {}, {}, (err, record) => {
            if (err) {
                reject(err);
            } else if (record === null) {
                reject({message: "Record not found"});
            } else {
                resolve(record.name);
            }
        });
    });
}

const listRecentRecords = (req, res) => {
    DocumentModel.distinct('recordId', {
        'createdBy': req.userId,
        'fileType': {$ne: fileTypes.FOLDER},
        'lastModifiedOnDate': {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) //only look for documents that were modified in the last week
        }
    }, function (error, documentList) {
        return Promise.all(documentList.map(recId => {
            return new Promise((resolve, reject) => {
                RecordModel.findById(recId).exec()
                    .then(record => {
                        if (record === null) {
                            console.log("Record not found");
                        } else {
                            resolve({
                                recordId: recId,
                                recordName: record.name
                            })
                        }
                    }).catch(err => reject(err));
            });

        })).then(recentRecords => { //When recent Records were found, send them to frontend
            let trimmedRecords = recentRecords.slice(0, 5) //only show first five results
            res.status(200).json({records: trimmedRecords});
        })
            .catch(error => {
                res.status(400).json({
                    error: 'Internal server error',
                    message: error.message,
                });
            });
    })
};


module.exports = {
    listRecords,
    addRecord,
    listFoldersByRecordId,
    getRecordName,
    listRecentRecords
};
