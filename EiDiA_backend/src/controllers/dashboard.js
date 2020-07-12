"use strict";


const getDashboard = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const listWidgetTypes = (req, res) => {
    res.status(200).json({response: "dummy response"});
    // TODO is this really the function we want to send to the backend? i.e. haben wir keine vordefiniete Anzahl an WidgetTypes
};

const addWidget = (req, res) => {
    res.status(200).json({response: "dummy response"});
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
