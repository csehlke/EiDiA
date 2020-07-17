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

    //TODO:
    static getAttributesforWidget(widgetAttributeMapping) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/dashboard/widget/list/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static listDocumentTypes(recordId) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/model/document/list/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getDocuments(recordId) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/record/document/list/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getDocTypes(recordId) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/record/docTypes/list/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAttributeTypes(recordId) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/record/attributeTypes/list/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAttributeValues(recordId) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/record/attributeValues/list/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

}
