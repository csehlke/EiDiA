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

            res.status(200).json({response: dummyData});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const getTemplate = (req, res) => {
    const dummyTemplates = {
        t_0: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 25%. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
        t_1: '$\/Document1\/VARIABLE1 On the date of $DATE ,\n $\/Document1\/VARIABLE1 has made a revenue of $VARIABLE2',
        t_2: 'Eins Zwei Drei Vier \n mit zeilenbruch'
    }

    const templateId = req.params.templateId;

    res.status(200).json({response: dummyTemplates[templateId]});
};

const saveTemplate = (req, res) => {
    const template = req.params.template;

    res.status(200).json({response: "success!"});
};

const exportDocument = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const download = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const search = (req, res) => {
    const searchQuery = req.params.query;

    let out = []
    for (let i = 0; i < 9; i++) {
        const obj = {name: "Document " + i, id: i};
        out.push(obj);
    }

    res.status(200).json({response: out});
};

const getDocuments = (req, res) => {
    const docNames = req.params.docNames;

    const documentMockData = {
        "Document 1": {
            "VARIABLE1": "BMW",
            "VARIABLE2": "500.000€"
        }
    };

    res.status(200).json({response: documentMockData});
}

module.exports = {
    listTemplates,
    saveTemplate,
    exportDocument,
    download,
    getTemplate,
    search,
    getDocuments
};
