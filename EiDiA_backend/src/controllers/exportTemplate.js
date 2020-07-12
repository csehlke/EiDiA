"use strict";

const ExportTemplateModel = require('../models/exportTemplate');

const listTemplates = (req, res) => {
    ExportTemplateModel.find()
        .then(() => {
            const dummyData = [
                {name: "Template 0", id: "t_0"},
                {name: "Template 1", id: "t_1"},
                {name: "Template 2", id: "t_2"},
            ];

            res.status(200).json(dummyData);
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
