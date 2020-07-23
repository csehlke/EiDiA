"use strict";
const LogModel = require('../models/log');
const mongoose = require('mongoose');
const {logCount} = require("../../../constants");
const {format} = require('date-fns');


const getLogs = (req, res) => {
    LogModel.aggregate([{$match: {recordId: mongoose.Types.ObjectId(req.params.recordId)}},
            {$sort: {date: -1}},
            {$lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'}},
            {$unwind: "$user"},
            {
                "$project": {
                    "_id": 0,
                    "logID": "$_id",
                    "action": "$log",
                    "user": "$user.username",
                    "date": "$date",

                }
            }
        ],
        function (err, logs) {
            if (err)
                res.status(400).json({
                    error: 'Internal server error',
                    message: error.message,

                });
            else {
                logs = logs.map(log => {
                    log.date = format(log.date, 'dd/MM/yyyy');
                    return log
                })
                res.status(200).json(logs.slice(0, logCount));

            }

        });

};
const getRecentRecords = (req, res) => {
    LogModel.aggregate([{$match: {userId: mongoose.Types.ObjectId(req.userId)}}, //select logs with userId
            {$sort: {date: -1}},
            {$group: {_id: '$recordId',}}, // no duplicates
            {$lookup: {from: 'records', localField: '_id', foreignField: '_id', as: 'records'}}, //join with records to get name
            {$unwind: "$records"}, // 1 output for each record
            {
                "$project": { // structure output
                    "_id": 0,
                    "recordId": "$records._id",
                    "name": "$records.name"

                }
            }
        ],
        function (err, logs) {
            if (err)
                res.status(400).json({
                    error: 'Internal server error',
                    message: err.message,

                });
            else {
                res.status(200).json(logs.slice(0, 4));

            }

        });
}


module.exports = {
    getLogs,
    getRecentRecords,
};
