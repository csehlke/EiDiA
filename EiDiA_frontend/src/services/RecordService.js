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

    static getWidgets(recordId) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/dashboard/widget/list/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static addWidget(widgetData) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/dashboard/widget/add', widgetData, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

}
