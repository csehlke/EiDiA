"use strict";

const {fileTypes} = require("../../../constants");
const RecordModel = require('../models/record');
const DocumentModel = require('../models/document')
const DocumentTypeModel = require('../models/documentType')
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
const listDocumentsByTypeAndRecord = (req, res) => {

    DocumentModel.find(req.body.mapping.map(mapping => {
            return {documentTypeId: mapping.docTypeId, recordId: req.body.recordId}
        }
    ))
        .then(documentList => {
            res.status(200).json({documentList: documentList});
        })
        .catch(error => {

            res.status(500).json({
                error: 'Internal server error',
                message: error.message,
            });

        });
}

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
            console.log(documents)
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

            // {$group: {_id:'$attributes.attributeId', 'date':{$max:"$createdOnDate",$first:"$"},'date2':{$first:"$createdOnDate"},'value':{$first:"$attributes.value"},'docTypeId':{$first:'documentTypeId'},
            //     'doc'}},
            {
                "$project": {

                    "docTypeId": "$documentTypeId",
                    "date": "$createdOnDate",
                    "attributeId": "$attributes.attributeId",
                    "value": "$attributes.value",

                }
            },
            // {$lookup: {from: 'attributetypes', localField: 'attributes.attributeId', foreignField: '_id', as: 'test'}},
            // {
            //      $mergeObjects: [ { $arrayElemAt: [ "$test", 0 ] }, "$$ROOT" ]
            // },
            // {$unwind:"$test"},
            // {
            //     "$project": {
            //         // "docTypeId": "$test.documentTypeId",
            //         "date": "$createdOnDate",
            //         "attributes": "$attributes",
            //         "test": "$test",
            //         // "attributeId":"$test._id",
            //         // "value":"$test.value",
            //         // "name":"$test.name"
            //     }
            // },
            // {$unwind:"$test"},

        ],
        function (err, documents) {
            //TODO: check for error
            /*documents = documents.map(doc => {
                return (

                    doc.attributes.map(attr => {

                        return (
                            {
                                "date": doc.date,
                                "docTypeId": doc.docTypeId,
                                ...attr,
                                ...doc.test.find(testAttr => testAttr._id.toString() === attr.attributeId.toString())
                            }
                        )
                    })
                )
                // doc.test.find(k=>{
                //     console.log(k._id)
                // })
            })*/
            // documents.forEach(doc=>doc['attributeId']=doc._id)
            // console.log(Object.values(documents).flat())
            // documents.flat()
            // console.log(documents);
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
                    parentFolderId: document.parentFolderId,
                    fileType: document.fileType, //TODO: implement filetype in database
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
/*const listDocumentTypesByRecordId = (req, res) => { // Return attributes based on selected DocumentTypeId
    DocumentModel.find({'recordId': req.params.recordId})
        .then(documentList => {
            let idList = [...new Set(documentList.map(document => {
                return {
                    docTypeId:document.documentTypeId

                };
            }))];
            DocumentTypeModel.find(idList.map(id=>{return {_id:id.docTypeId}}))
                .then(documentType=>{
                        let response= documentType.map(type=>
                        {
                            return {
                                name:type.name,
                                docTypeId:type._id
                            }
                        })

                        response.sort((a, b) => {
                            return ('' + a.name).localeCompare(b.name);
                        });
                        res.status(200).json({docTypes: response});
                    }


                ).catch(error => {
                res.status(400).json({
                    error: 'Internal server error',
                    message: error.message,
                });
            });


        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};*/

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


module.exports = {
    listRecords,
    addRecord,
    listFoldersByRecordId,
    getRecordName,
    listDocumentsByTypeAndRecord,
    listDocumentByRecordId,
    listLatestDocumentsByRecordId,
    getDocTypesForRecord,
    getAttributeTypesForRecord,
    getAttributeValuesForRecord
};
