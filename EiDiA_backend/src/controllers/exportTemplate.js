"use strict";

const ExportTemplateModel = require('../models/exportTemplate');
const DocumentModel = require('../models/document');
const RecordController = require('./record');
const {fileTypes} = require('../../../constants');

const listTemplates = (req, res) => {
    // TODO: provide templates in database
    ExportTemplateModel.find()
        .then(() => {
            const dummyData = [
                {name: "Template 0", id: "t_0"},
                {name: "Template 1", id: "t_1"},
                {name: "Template 2", id: "t_2"},
            ];

            res.status(200).json({exportTemplates: dummyData});
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

    res.status(200).json({template: dummyTemplates[templateId]});
};

const saveTemplate = (req, res) => {
    // TODO: save templates in database
    const template = req.body.content;
    res.status(200).json({response: "success!"});
};

const exportDocuments = (req, res) => {
    // TODO: provide documents from database
    const params = req.params.documents;
    res.status(200).json({response: "dummy response"});
};

const search = (req, res) => {
    // TODO: provide documents in database for search
    const searchQuery = req.params.searchqu;

    let out = []
    for (let i = 0; i < 9; i++) {
        const obj = {id: "doc_" + i, name: "Document " + i, documentTypeId: "typed_" + i};
        out.push(obj);
    }
    out.push({
        id: "5efa2869444d2082a89b793a",
        name: "Document1 (Amazon)",
        documentTypeId: "5ef99f619815e6b0c4f9292a"
    })

    res.status(200).json({documents: out});
};

const download = (req, res) => {
    res.status(200).json({response: "success!"});
}

const getDocumentAttributes = (req, res) => {
    // TODO: provide documents for variable extraction
    const docNames = req.params.documentIDs;

    const documentMockData = {
        "doc_1": {
            "VARIABLE1": "BMW",
            "VARIABLE2": "500.000€"
        }
    };

    res.status(200).json({response: documentMockData});
}
const searchDocumentsByName = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.query, "documentName")) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request query must contain the following search param: documentName',
        });
    }
    const query = req.query;
    const dbQuery = {fileType: {$ne: fileTypes.FOLDER}};
    dbQuery['name'] = {$regex: ".*" + query.documentName + ".*"};
    DocumentModel.find(dbQuery)
        .then(documents => {
            return Promise.all(documents.map(document => {
                return new Promise((resolve, reject) => {
                    RecordController.getRecordName(document.recordId)
                        .then(recordName => {
                            resolve({
                                id: document._id,
                                name: document.name + " (" + recordName + ")",
                                documentTypeId: document.documentTypeId,
                            });
                        })
                        .catch(err => reject(err));
                });
            }));
        })
        .then(minimalDocuments => {
            minimalDocuments.sort((a, b) => {
                return ('' + a.name).localeCompare(b.name);
            });
            res.status(200).json({documents: minimalDocuments});
        })
        .catch(error => {
            return res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        })
}

module.exports = {
    listTemplates,
    saveTemplate,
    exportDocuments,
    getTemplate,
    search,
    searchDocumentsByName,
    download,
    getDocumentAttributes
};
