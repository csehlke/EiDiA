"use strict";
const LogModel = require('../models/log');
const mongoose = require('mongoose');


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
            else
                res.status(200).json(logs.slice(0, 20));

        });

};


module.exports = {
    getLogs,
};