"use strict";

const DocumentModel = require('../models/document');
const ErrorHandling = require('./errorHandling');

const tes = require('tesseract.js')

const fullTextOCR = (documentId, base64Image) => {

    const worker = tes.createWorker({
        logger: m => console.log(m)
    });

    (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {data: {text}} = await worker.recognize(base64Image);
        DocumentModel.findByIdAndUpdate({_id: documentId}, {completeOcrText: text}, {new: true}, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Inserted completeOcrText")
            }
        })
        await worker.terminate();
    })();
}

const addDocument = (req, res) => {
    let errors = [];
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'name'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'parentFolderId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'documentTypeId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'recordId'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'comment'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'priority'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'department'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'attributeData'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'base64Image'));
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'fileType'));
    errors = errors.filter(error => error); // get rid of null entries

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: errors.join('\n'),
        });
    }

    let parentFolderId;
    if (req.body.parentFolderId === '0') {
        parentFolderId = '000000000000000000000000' //valid ObjectId for MongoDB
    } else {
        parentFolderId = req.body.parentFolderId
    }

    DocumentModel.create({
        name: req.body.name,
        parentFolderId: parentFolderId,
        documentTypeId: req.body.documentTypeId,
        recordId: req.body.recordId,
        createdBy: req.userId, //from middleware
        comment: req.body.comment,
        priority: req.body.priority,
        department: req.body.department,
        attributes: req.body.attributeData,
        base64Image: req.body.base64Image,
        fileType: req.body.fileType
    })
        .then((insertedData) => {
            console.log("yes")
            res.status(200).json({response: "Inserted attribute-data"});
            fullTextOCR(insertedData._id, insertedData.base64Image) //Start backend-OCR after inserting attributes
        })
        .catch(error => {
            console.log("no")
            console.log(error.message)
            res.status(400).json({
                error: error.message,
                message: error.message,
            });
        });
};

module.exports = {
    addDocument,
};
