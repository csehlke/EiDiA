"use strict";

const DocumentTypeModel = require('../models/documentType');
const AttributeTypeModel = require('../models/attributeType');


const listDocumentTypes = (req, res) => {
    DocumentTypeModel.find()
        .then(documentTypes => {
            let response = documentTypes.map(documentType => {
                return {
                    id: documentType._id,
                    name: documentType.name,
                };
            });
            response.sort((a, b) => {
                return ('' + a.name).localeCompare(b.name);
            });
            res.status(200).json({documentTypes: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const listAttributeTypes = (req, res) => {
    AttributeTypeModel.find()
        .then(attributeTypes => {
            let response = attributeTypes.map(attributeType => {
                return {
                    id: attributeType._id,
                    name: attributeType.name,
                    dataType: attributeType.dataType,
                    documentTypeId: attributeType.documentTypeId,
                };
            });
            response.sort((a, b) => {
                return ('' + a.name).localeCompare(b.name);
            });
            res.status(200).json({attributeTypes: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const listAttributeTypesByDocumentId = (req, res) => { // Return attributes based on selected DocumentTypeId
    AttributeTypeModel.find({'documentTypeId': req.params.selectedDocumentTypeId})
        .then(attributeTypes => {
            let response = attributeTypes.map(attributeType => {
                return {
                    id: attributeType._id,
                    name: attributeType.name,
                    dataType: attributeType.dataType,
                };
            });
            response.sort((a, b) => {
                return ('' + a.name).localeCompare(b.name);
            });
            res.status(200).json({attributeTypes: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const createDocumentType = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'newDocumentTypeName')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a newDocumentTypeName property',
        });
    }

    DocumentTypeModel.create({
        name: req.body.newDocumentTypeName
    })
        .then((insertedData) => {
            req.body.newAttributes.map(item =>
                AttributeTypeModel.create({
                    documentTypeId: insertedData._id, //Insert Attribute with corresponding documentTypeId
                    name: item.name,
                    dataType: item.dataType
                }))
            res.status(200).json({response: "Inserted new Document Type"});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

module.exports = {
    listDocumentTypes,
    listAttributeTypes,
    createDocumentType,
    listAttributeTypesByDocumentId
};
