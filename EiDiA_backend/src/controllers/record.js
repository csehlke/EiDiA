"use strict";

const {fileTypes} = require("../../../constants");
const RecordModel = require('../models/record');
const DocumentModel = require('../models/document')
const LogModel = require('../models/log')
const AttributeTypeModel = require('../models/attributeType')
const mongoose = require("mongoose")

const listRecords = (req, res) => {
    //TODO: error handling

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
    //TODO: error handling
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
            LogModel.create({
                userId: req.userId,
                recordId: record._id,
                log: "created Record \"" + record.name + "\""
            }).then("Created Log").catch((e) => {
                console.log("Didnt Create Log" + e)
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


const listLatestDocumentsByRecordId = (req, res) => {


    DocumentModel.aggregate([{$match: {recordId: mongoose.Types.ObjectId(req.params.recordId)}},
            {
                $group: {
                    _id: '$documentTypeId',
                    attributes: {$first: "$attributes"}, "createdOnDate": {$max: "$createdOnDate"}
                }
            }],
        function (err, documents) {
            documents.forEach(document => {
                document.documentTypeId = document._id;
                delete document._id
            })
            AttributeTypeModel.aggregate([{$match: {}}])
            res.status(200).json({documents: documents});

        });

}
const getDocTypesForRecord = (req, res) => {
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
            //TODO: check for error
            res.status(200).json({documents: documents});

        });

}
const getAttributeTypesForRecord = (req, res) => {
    //TODO: add sets for unique values
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
            //TODO: check for error

            console.log(documents);
            res.status(200).json(documents);

        });

}
const getAttributeValuesForRecord = (req, res) => {
    //TODO: add sets for unique values
    console.log("hello")
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
            //TODO: check for error

            res.status(200).json(documents);

        });

}

const listDocumentByRecordId = (req, res) => { // Return attributes based on selected DocumentTypeId


    DocumentModel.find({'recordId': mongoose.Types.ObjectId(req.params.recordId)})
        .then(documentList => {
            let response = documentList.map(document => {
                return {
                    id: document._id,
                    name: document.name,
                    parentFolderId: document.parentFolderId.toString() === "000000000000000000000000" ? 0 : document.parentFolderId,
                    fileType: document.fileType, //TODO: implement filetype in database
                    createdOnDate: document.createdOnDate,
                    lastModifiedOnDate: document.lastModifiedOnDate,
                    comment: document.comment,
                    documentTypeId: document.documentTypeId,
                    createdBy: document.createdBy,
                };
            });
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,

            });
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
const addFolder = (req, res) => {
    /* let folder ={};
     folder['name']=req.body.name;
     folder['recordId']=req.body.recordId;
     folder['parentFolderId']=req.body.parentFolderId;
     folder['documentTypeId']=req.body.
     DocumentModel.create(folder).then(doc=>{}).catch()*/
    console.log("hello I am at addFolder")
    let parentFolderId;
    if (req.body.parentFolderId === '0') {
        parentFolderId = '000000000000000000000000' //valid ObjectId for MongoDB
    } else {
        parentFolderId = req.body.parentFolderId
    }

    DocumentModel.create({
        name: req.body.name,
        parentFolderId: parentFolderId,
        //TODO add a folder Id here
        documentTypeId: "000000000000000000000000",
        recordId: req.body.recordId,
        createdBy: "000000000000000000000000",//TODO activate with middleware req.userId, //from middleware
        comment: " ",
        priority: " ",
        department: " ",
        attributes: [],
        base64Image: "empty",
        fileType: fileTypes.FOLDER
    }).then((folder) => {
        let copy = {...folder._doc, id: folder._doc._id}
        copy.parentFolderId = copy.parentFolderId.toString() === "000000000000000000000000" ? 0 : copy.parentFolderId
        res.status(200).json(copy);
        //TODO add log

    })
        .catch(error => {

            res.status(400).json({
                error: error.message,
                message: error.message,
            });
        });
}
const updateDocumentName = (req, res) => {
    DocumentModel.findByIdAndUpdate({_id: req.body.id}, {name: req.body.name}, {new: true})
        .then(document => {
                res.status(200).json(document.name);
                //TODO add log
            }
        )
        .catch((error) =>
            res.status(400).json({
                error: error.message,
                message: error.message,
            })
        )


}
const updateDocumentParentFolderId = (req, res) => {
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
                //TODO add log

            }
        )
        .catch((error) =>
            res.status(400).json({
                error: error.message,
                message: error.message,
            })
        )
}

const deleteDocument = (req, res) => {
    console.log(req.params.documentId)
    DocumentModel.deleteOne({_id: req.params.documentId}).then(result => {
            console.log("Succesfful Delete")
            res.status(200).json(result);
        }
    )
        .catch((error) => {
            console.log(error.message)
            res.status(400).json({

                error: error.message,
                message: error.message,
            })
        })
}


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


module.exports = {
    listRecords,
    addRecord,
    listFoldersByRecordId,
    listDocumentByRecordId,
    listLatestDocumentsByRecordId,
    getDocTypesForRecord,
    getAttributeTypesForRecord,
    getAttributeValuesForRecord,
    addFolder,
    updateDocumentName,
    updateDocumentParentFolderId,
    deleteDocument,
    getRecordName
};
