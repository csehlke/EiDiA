"use strict";

import HttpService from './HttpService';

export default class UploadService {
    constructor() {
    }

    static docURL() {return 'http://localhost:3000/model/document/list' }

    static getDocumentTypes(){
        return new Promise((resolve, reject) => {
            HttpService.get(this.docURL(), function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }



}