"use strict";

const {fileTypes} = require("../../../constants");
const RecordModel = require('../models/record');
const DocumentModel = require('../models/document')
const LogModel = require('../models/log')
const mongoose = require("mongoose")
const ErrorHandling = require("./errorHandling");
const {format} = require('date-fns');

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
const getRecordName = (req, res) => {
    RecordModel.aggregate([
            {$match: {_id: mongoose.Types.ObjectId(req.params.recordId)}},

        ],
        function (err, record) {
            if (err) {
                res.status(500).json({
                    error: "Internal Server error",
                    message: err.message
                })
            }
            res.status(200).json({name: record[0].name});

        });
}
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
            res.status(200).json({
                record: {
                    id: record._id,
                    name: record.name
                }
            });
            LogModel.create({
                userId: req.userId,
                recordId: record._id,
                log: "created record \"" + record.name + "\""
            }).then("Created Log").catch((e) => {
                console.error("Didnt Create Log" + e)
            })
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


const getDocTypesForRecord = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.params, "recordId")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a recordId property',
        });
    }
    DocumentModel.aggregate([{$match: {recordId: mongoose.Types.ObjectId(req.params.recordId)}},
            {$group: {_id: '$documentTypeId'}},
            {$lookup: {from: 'documenttypes', localField: '_id', foreignField: '_id', as: 'test'}},
            {$unwind: "$test"},
            {
                "$project": {
                    "_id": 1,
                    "docTypeId": "$_id",
                    "name": "$test.name"
                }
            }
        ],
        function (err, documents) {
            if (err) {
                res.status(500).json({
                    error: "Internal Server error",
                    message: err.message
                })
            }
            res.status(200).json({documents: documents});

        });

}
const getAttributeTypesForRecord = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.params, "recordId")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a recordId property',
        });
    }
    DocumentModel.aggregate([{$match: {recordId: mongoose.Types.ObjectId(req.params.recordId)}},
            {$group: {_id: '$documentTypeId', attributes: {$first: "$attributes.attributeId"}}},
            {$lookup: {from: 'attributetypes', localField: 'attributes', foreignField: '_id', as: 'test'}},
            {$unwind: "$test"},
            {
                "$project": {
                    "_id": 1,
                    "docTypeId": "$_id",
                    "attributeId": "$test._id",
                    "name": "$test.name"
                }
            }
        ],
        function (err, documents) {
            if (err) {
                res.status(500).json({
                    error: "Internal Server error",
                    message: err.message
                })
            }
            res.status(200).json(documents);
        });

}
const getAttributeValuesForRecord = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.params, "recordId")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a recordId property',
        });
    }
    DocumentModel.aggregate([{$match: {recordId: mongoose.Types.ObjectId(req.params.recordId)}},
            {$unwind: "$attributes"},
            {
                "$project": {

                    "docTypeId": "$documentTypeId",
                    "date": "$createdOnDate",
                    "attributeId": "$attributes.attributeId",
                    "value": "$attributes.value",

                }
            },
        ],
        function (err, documents) {
            if (err) {
                res.status(500).json({
                    error: "Internal Server error",
                    message: err.message
                })
            }
            res.status(200).json(documents);
        });
}

const listDocumentByRecordId = (req, res) => { // Return attributes based on selected DocumentTypeId
    if (!Object.prototype.hasOwnProperty.call(req.params, "recordId")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a recordId property',
        });
    }
    DocumentModel.find({'recordId': mongoose.Types.ObjectId(req.params.recordId)})
        .then(documentList => {
            let response = documentList.map(document => {
                return {
                    id: document._id,
                    name: document.name,
                    parentFolderId: document.parentFolderId.toString() === "000000000000000000000000" ? 0 : document.parentFolderId,
                    fileType: document.fileType,
                    createdOnDate: format(document.createdOnDate, 'dd/MM/yyyy'),
                    lastModifiedOnDate: format(document.lastModifiedOnDate, 'dd/MM/yyyy'),
                    comment: document.comment,
                    documentTypeId: document.documentTypeId,
                    createdBy: document.createdBy,
                };
            });
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({
                error: 'Internal server error',
                message: error.message,

            });
        });
};


const listFoldersByRecordId = (req, res) => { // Return only folders based on selected DocumentTypeId
    if (!Object.prototype.hasOwnProperty.call(req.params, "recordId")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a recordId property',
        });
    }
    let parentFolderId;

    DocumentModel.find(
        {'recordId': mongoose.Types.ObjectId(req.params.recordId), 'fileType': fileTypes.FOLDER}
    )
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
                    createdOnDate: format(document.createdOnDate, 'dd/MM/yyyy'),
                    lastModifiedOnDate: format(document.lastModifiedOnDate, 'dd/MM/yyyy'),
                    comment: document.comment,
                    documentTypeId: document.documentTypeId,
                    createdBy: document.createdBy,
                };
            });
            res.status(200).json({documents: response});
        })
        .catch(error => {
            res.status(500).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};
const addFolder = (req, res) => {

    let errors = []
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'name'))
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'recordId'))
    errors = errors.filter(error => error); // get rid of null entries

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: errors.join('\n')
        })
    }

    let parentFolderId;
    if (req.body.parentFolderId === '0') {
        parentFolderId = '000000000000000000000000' //valid ObjectId for MongoDB
    } else {
        parentFolderId = req.body.parentFolderId
    }

    DocumentModel.create({
        name: req.body.name,
        parentFolderId: parentFolderId,
        documentTypeId: "000000000000000000000000",
        recordId: req.body.recordId,
        createdBy: req.userId,
        comment: " ",
        priority: " ",
        department: " ",
        attributes: [],
        base64Image: "empty",
        fileType: fileTypes.FOLDER
    }).then((folder) => {
        let copy = {...folder._doc, id: folder._doc._id}
        copy.parentFolderId = copy.parentFolderId.toString() === "000000000000000000000000" ? 0 : copy.parentFolderId
        copy.createdOnDate = format(new Date(copy.createdOnDate), 'dd/MM/yyyy')
        copy.lastModifiedOnDate = format(new Date(copy.lastModifiedOnDate), 'dd/MM/yyyy')
        res.status(200).json(copy);
        LogModel.create({
            userId: req.userId,
            recordId: folder.recordId,
            log: "created folder \"" + folder.name + "\""
        }).then("Created Log").catch((e) => {
            console.error("Didnt Create Log" + e)
        })
    })
        .catch(error => {
            res.status(500).json({
                error: "Internal Server Error",
                message: error.message,
            });
        });
}
const updateDocumentName = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "name")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a name property',
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, "id")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain an id property',
        });
    }
    DocumentModel.findByIdAndUpdate({_id: req.body.id}, {name: req.body.name})
        .then(document => {
                res.status(200).json(req.body.name);
                LogModel.create({
                    userId: req.userId,
                    recordId: document.recordId,
                    log: "changed " + document.fileType + " name: " + document.name + " to " + req.body.name
                }).then("Created Log").catch((e) => {
                    console.error("Didnt Create Log" + e)
                })
            }
        )
        .catch((error) =>
            res.status(500).json({
                error: "Internal Server Error",
                message: error.message,
            })
        )


}
const updateDocumentParentFolderId = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "parentFolderId")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a name property',
        });
    }
    if (!Object.prototype.hasOwnProperty.call(req.body, "id")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain an id property',
        });
    }
    let parentFolderId;
    if (req.body.parentFolderId === '0') {
        parentFolderId = '000000000000000000000000' //valid ObjectId for MongoDB
    } else {
        parentFolderId = req.body.parentFolderId
    }
    DocumentModel.findByIdAndUpdate({_id: req.body.id}, {parentFolderId: parentFolderId}, {new: true})
        .then(document => {
                let copy = document.parentFolderId
                copy = copy.toString() === "000000000000000000000000" ? 0 : copy
                res.status(200).json(copy);
                LogModel.create({
                    userId: req.userId,
                    recordId: document.recordId,
                    log: "moved " + document.fileType + ": \"" + document.name + "\""
                }).then("Created Log").catch((e) => {
                    console.error("Didnt Create Log" + e)
                })
            }
        )
        .catch((error) =>
            res.status(500).json({
                error: "Internal Server Error",
                message: error.message,
            })
        )
}
const deleteDocument = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.params, "documentId")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a documentId property',
        });
    }
    DocumentModel.findById({_id: req.params.documentId})
        .then((document) => {
                if (document.createdBy === req.userId || req.userRole === 'admin') {
                    DocumentModel.deleteOne({_id: req.params.documentId})
                        .then(result => {

                                res.status(200).json(result);
                                LogModel.create({
                                    userId: req.userId,
                                    recordId: document.recordId,
                                    log: "deleted " + document.fileType + ": " + document.name
                                }).then("Created Log").catch((e) => {
                                    console.error("Didnt Create Log" + e)
                                })
                            }
                        )
                        .catch((error) => {
                            console.log(error.message)
                            res.status(500).json({

                                error: "Internal Server error",
                                message: error.message,
                            })
                        })
                } else {
                    return res.status(400).json({
                        error: "Not authorised to make this delete Request"
                    })
                }

            }
        )
        .catch((error) => {
            console.log(error.message)
            res.status(500).json({

                error: "Internal Server error",
                message: error.message,
            })
        })

}


module.exports = {
    listRecords,
    addRecord,
    listFoldersByRecordId,
    listDocumentByRecordId,
    getDocTypesForRecord,
    getAttributeTypesForRecord,
    getAttributeValuesForRecord,
    addFolder,
    updateDocumentName,
    updateDocumentParentFolderId,
    deleteDocument,
    getRecordName
};
