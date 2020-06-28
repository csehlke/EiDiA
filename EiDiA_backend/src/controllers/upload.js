"use strict";

const AttributeTypeModel = require('../models/attributeType');


const listAttributes = (req, res) => {
    AttributeTypeModel.find({'documentTypeId': req.params.selectedDocumentTypeId}) //Condition
        .then(attributeTypes => {
            let response = attributeTypes.map(attributeType => {
                return {
                    id: attributeType._id,
                    name: attributeType.name,
                    dataType: attributeType.dataType,
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

const uploadDocument = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const addAttributes = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

module.exports = {
    listAttributes,
    uploadDocument,
    addAttributes,
};
