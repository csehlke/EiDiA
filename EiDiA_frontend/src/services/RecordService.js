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

    static getRecordName(recordId) {

        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/record/name/' + recordId, function (data) {
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



    static addFolder(folder) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/record/folder/add', folder, function (data) {
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


    static listFolders(recordId) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/record/document/listfolders/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getLogs(recordId) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/log/list/' + recordId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateName(requestBody) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/record/document/update/name', requestBody, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateParentFolderId(requestBody) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/record/document/update/parentFolderId', requestBody, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteDocument(documentId) {
        return new Promise((resolve, reject) => {
            HttpService.remove(baseURL + '/record/document/delete/' + documentId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static addNewRecord(recordName) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/record/add', {recordName: recordName}, function (data) {
                resolve(data.record);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}
