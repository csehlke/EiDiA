"use strict";


const DocumentModel = require('../models/document');
const ErrorHandling = require('./errorHandling');

const tes = require('tesseract.js')


const uploadDocument = (req, res) => {
    res.status(200).json({response: "dummy response"});
};


const fullTextOCR = (base64Image) => { //TODO Send to Backend (OCR IS VERY SLOW) --> Do it on backend?
    const worker = tes.createWorker({
        logger: m => console.log(m)
    });

    (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {data: {text}} = await worker.recognize(base64Image);
        console.log(text);
        await worker.terminate();
    })();
}


const addAttributes = (req, res) => {
    let errors = [];
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'name'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'rootFolderId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'documentTypeId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'recordId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'createdBy'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'comment'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'priority'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'department'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'attributeData'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'base64Image'));
    errors = errors.filter(error => error); // get rid of null entries

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: errors.join('\n'),
        });
    }

    DocumentModel.create({
        name: req.body.name,
        rootFolderId: req.body.rootFolderId,
        documentTypeId: req.body.documentTypeId,
        recordId: req.body.recordId,
        createdBy: req.body.createdBy,
        comment: req.body.comment,
        priority: req.body.priority,
        department: req.body.department,
        attributes: req.body.attributeData,
        base64Image: req.body.base64Image,
        })

        .then(() => {
            res.status(200).json({response: "Inserted attribute-data"});
        })
        .catch(error => {
            res.status(400).json({
                error: error.message,
                message: error.message,
            });
        });


};

module.exports = {
    uploadDocument,
    addAttributes,
};
