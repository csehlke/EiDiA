"use strict";
const LogModel = require('../models/log');
const mongoose = require('mongoose');

const getRecentRecords = (req, res) => {
    LogModel.aggregate([{$match: {userId: mongoose.Types.ObjectId(req.params.userId)}},
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
