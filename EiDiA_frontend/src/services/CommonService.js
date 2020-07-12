"use strict";

import HttpService from './HttpService';
import {baseURL} from '../../../constants.js'

export default class CommonService { //Contains API-calls that need to be accessed from multiple components
    constructor() {
    }

    static getAllDocumentTypes() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/model/document/list', function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAllAttributeTypes() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/model/attribute/list', function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static addNewDocumentType(docTypeData) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/model/document/create', docTypeData, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}
