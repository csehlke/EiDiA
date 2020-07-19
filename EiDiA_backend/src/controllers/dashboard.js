"use strict";
const WidgetModel = require('../models/widget');
const mongoose = require('mongoose');
const LogModel = require('../models/log')
const ErrorHandling = require("./errorHandling");

const getDashboard = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const listWidgetsToRecord = (req, res) => {
    WidgetModel.find({'recordId': req.params.recordId})
        .then(widgets => {
            if (widgets.length > 0) {
                return res.status(200).json(widgets);

            }


        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        }));
};

const addWidget = (req, res) => {
    let errors = []
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'title'))
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'recordId'))
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'positionInfo'))
    errors.push(ErrorHandling.checkBodyForAttribute(req, 'widgetType'))
    errors = errors.filter(error => error); // get rid of null entries

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: errors.join('\n')
        })
    }

    const widget = {};

    widget['title'] = req.body.title;
    widget['recordId'] = mongoose.Types.ObjectId(req.body.recordId);
    widget['positionInfo'] = req.body.positionInfo;
    widget['widgetType'] = req.body.widgetType;
    widget['graphType'] = req.body.graphType;
    widget['attributeMapping'] = req.body.attributeMapping;

    const filter = {positionInfo: req.body.positionInfo, recordId: req.body.recordId}
    const options = {upsert: true, new: true, setDefaultsOnInsert: true, returnNewDocument: true};

    WidgetModel.findOneAndUpdate(filter, widget, options).then(updated => {
        res.status(200).json(updated);

        LogModel.create({
            userId: req.userId,
            recordId: updated.recordId,
            log: "changed widget \"" + updated.title + "\""
        }).then("Created Log").catch((e) => {
            console.log("Didnt Create Log" + e)
        })
    }).catch(error => {
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
        });
    })
};


module.exports = {
    getDashboard,
    listWidgetsToRecord,
    addWidget,
};
