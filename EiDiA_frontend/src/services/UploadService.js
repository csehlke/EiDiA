"use strict";

import HttpService from './HttpService';
import {baseURL} from "../../../constants";

export default class UploadService {
    constructor() {
    }

    //TODO rename this to listAttributeTypes
    static listAttributes(documentTypeID) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/model/attribute/list/' + documentTypeID, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
    //TODO rename addDocument
    static addAttributes(attributeData) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/upload/add', attributeData, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}
