"use strict";
const WidgetModel = require('../models/widget');
const mongoose = require('mongoose');


const getDashboard = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const listWidgetTypes = (req, res) => {
    console.log(req.body)
    WidgetModel.find({'recordId': req.params.recordId})
        .then(widgets => {
            if (widgets.length > 0) {
                return res.status(200).json(widgets);

            }
            return res.status(404).json({
                error: 'Not Found',
                message: `Widgets not found`,
            });

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        }));
    // TODO is this really the function we want to send to the backend? i.e. haben wir keine vordefiniete Anzahl an WidgetTypes
};

const addWidget = (req, res) => {
    console.log(req.body)
    if (!Object.prototype.hasOwnProperty.call(req.body, 'title')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body must contain a password property',
        });
    }
    const widget = {};

    widget['title'] = req.body.title;
    widget['recordId'] = mongoose.Types.ObjectId(req.body.recordId);
    widget['positionInfo'] = req.body.positionInfo;
    widget['widgetType'] = req.body.widgetType;
    widget['graphType'] = req.body.graphType;
    widget['attributeMapping'] = req.body.attributeMapping;

    const filter = {positionInfo: req.body.positionInfo, recordId: req.body.recordId}
    const options = {upsert: true, new: true, setDefaultsOnInsert: true};
    //TODO
    WidgetModel.findOneAndUpdate(filter, widget, options).then(body => {
        // console.log(body)
        res.status(200).json(
            "all alright");
    })
        .catch(error => {

            res.status(500).json({
                error: 'Internal server erroerr' + error.message,
                message: error.message,
            });

        });


};

const moveWidget = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

module.exports = {
    getDashboard,
    listWidgetTypes,
    addWidget,
    moveWidget,
};
