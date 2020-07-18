"use strict";

import HttpService from './HttpService';
import {baseURL} from '../../../constants.js'

export default class LogService {
    constructor() {
    }

    static getRecentRecords() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/log/recentRecords/list', function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }


}
