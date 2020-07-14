"use strict";

let fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};

const ExportTemplateModel = require('../models/exportTemplate');

const listTemplates = (req, res) => {
    // TODO: provide templates in database
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
    // TODO: provide templates in database
    const dummyTemplates = {
        t_0: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam 25%. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ',
        t_1: '$\/Document1\/VARIABLE1 On the date of $DATE ,\n $\/Document1\/VARIABLE1 has made a revenue of $VARIABLE2',
        t_2: 'Eins Zwei Drei Vier \n mit zeilenbruch'
    }

    const templateId = req.params.templateId;

    res.status(200).json({response: dummyTemplates[templateId]});
};

const saveTemplate = (req, res) => {
    // TODO: save templates in database
    const template = req.body.content;
    res.status(200).json({response: "success!"});
};

const exportDocument = (req, res) => {
    // TODO: provide documents from database
    const params = req.params.documents;
    res.status(200).json({response: "dummy response"});
};

const search = (req, res) => {
    // TODO: provide documents in database for search
    const searchQuery = req.params.query;

    let out = []
    for (let i = 0; i < 9; i++) {
        const obj = {name: "Document " + i, id: "doc_" + i};
        out.push(obj);
    }

    res.status(200).json({response: out});
};

const getDocuments = (req, res) => {
    // TODO: provide documents for variable extraction
    const docNames = req.params.docNames;

    const documentMockData = {
        "doc_1": {
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
    getTemplate,
    search,
    getDocuments
};