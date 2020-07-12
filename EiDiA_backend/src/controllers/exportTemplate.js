"use strict";

const ExportTemplateModel = require('../models/exportTemplate');

const listTemplates = (req, res) => {
    ExportTemplateModel.find()
        .then(exportTemplates => {
            let response = exportTemplates.map(exportTemplate => {
                return {
                    id: exportTemplate._id,
                    name: exportTemplate.name,
                };
            });
            res.status(200).json({exportTemplates: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const saveTemplate = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const exportDocument = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const download = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

module.exports = {
    listTemplates,
    saveTemplate,
    exportDocument,
    download,
};
