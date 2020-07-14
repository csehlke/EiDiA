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
    // widget['yPosition'] = req.body.yPosition;
    widget['widgetType'] = req.body.widgetType;
    widget['graphType'] = req.body.graphType;
    widget['attributeMapping'] = req.body.attributeMapping;


    WidgetModel.create(widget)
        .then(body => {
            res.status(200).json({
                widget: {
                    recordId: body.recordId,
                    title: body.title,
                    widgetType: body.widgetType,
                    graphType: body.graphType,
                    attributeMapping: req.body.attributeMapping
                }
            });
        })
        .catch(error => {

            res.status(500).json({
                error: 'Internal server error',
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
