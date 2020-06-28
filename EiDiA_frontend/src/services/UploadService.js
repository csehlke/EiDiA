"use strict";

import HttpService from './HttpService';
import {baseURL} from "../../../constants";

export default class UploadService {
    constructor() {
    }

    static listAttributes(documentTypeID) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/upload/attributes/get/' + documentTypeID, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }


}