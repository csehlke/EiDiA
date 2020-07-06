"use strict";

const RecordModel = require('../models/record');

const listRecords = (req, res) => {
    RecordModel.find()
        .then(records => {
            let response = records.map(record => {
                return {
                    id: record._id,
                    name: record.name,
                };
            });
            res.status(200).json({records: response});
        })
        .catch(error => {
            res.status(400).json({
                error: 'Internal server error',
                message: error.message,
            });
        });
};

const addRecord = (req, res) => {
    res.status(200).json({response: "dummy response"});
};

const getRecordName = (id) => {
    return new Promise((resolve, reject) => {
        RecordModel.findById(id, {}, {}, (err, record) => {
            if (err) {
                reject(err);
            } else if (record === null) {
                reject({message: "Record not found"});
            } else {
                resolve(record.name);
            }
        });
    });
}

module.exports = {
    listRecords,
    addRecord,
    getRecordName,
};
