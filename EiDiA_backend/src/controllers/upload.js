"use strict";

const DateFns = require('date-fns');
const DocumentModel = require('../models/document');
const ErrorHandling = require('./errorHandling');
const LogModel = require('../models/log')

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

    let attributeData = req.body.attributeData.map(attribute => {
        switch (attribute.type) {
            case 'date':
                return {
                    attributeId: attribute.attributeId,
                    value: DateFns.parseISO(attribute.value),
                }
            case 'number':
                return {
                    attributeId: attribute.attributeId,
                    value: Number.parseInt(attribute.value, 10),
                }
            default:
                return {
                    attributeId: attribute.attributeId,
                    value: attribute.value,
                }
        }
    })

    DocumentModel.create({
        name: req.body.name,
        parentFolderId: parentFolderId,
        documentTypeId: req.body.documentTypeId,
        recordId: req.body.recordId,
        createdBy: req.userId, //from middleware
        comment: req.body.comment,
        priority: req.body.priority,
        department: req.body.department,
        attributes: attributeData,
        base64Image: req.body.base64Image,
        fileType: req.body.fileType
    })
        .then((insertedData) => {
            res.status(200).json({response: "Inserted attribute-data"});
            fullTextOCR(insertedData._id, insertedData.base64Image) //Start backend-OCR after inserting attributes
            LogModel.create({
                userId: req.userId,
                recordId: req.body.recordId,
                log: "uploaded document \"" + req.body.name + "\""
            }).then("Created Log").catch((e) => {
                console.log("Didn't Create Log" + e)
            })
        })
        .catch(error => {
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
