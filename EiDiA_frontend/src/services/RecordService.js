"use strict";

import HttpService from './HttpService';
import {baseURL} from '../../../constants.js'

export default class RecordService {
    constructor() {
    }

    static getAllRecords() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/record/list', function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}
