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
    res.status(200).json({response: "dummy response"});
};

module.exports = {
    listDocumentTypes,
    listAttributeTypes,
    createDocumentType,
};
