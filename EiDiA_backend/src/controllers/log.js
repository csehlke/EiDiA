"use strict";
const LogModel = require('../models/log');
const mongoose = require('mongoose');
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
                res.status(200).json(logs.slice(0, 20));

            }

        });

};
const getRecentRecords = (req, res) => {
    LogModel.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(req.params.userId)}},
            {$sort: {date: -1}},
            {$group: {_id: '$recordId',}},
            {$lookup: {from: 'records', localField: '_id', foreignField: '_id', as: 'records'}},
            {$unwind: "$records"},
            {
                "$project": {
                    "_id": 0,
                    "recordId": "$records._id",
                    "name": "$records.name"

                }
            }
        ],
        function (err, logs) {
            console.log(logs)
            if (err)
                res.status(400).json({
                    error: 'Internal server error',
                    message: err.message,

                });
            else {
                res.status(200).json(logs.slice(0, 5));

            }

        });
}


module.exports = {
    getLogs,
    getRecentRecords,
};
