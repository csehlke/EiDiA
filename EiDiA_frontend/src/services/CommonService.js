"use strict";

import HttpService from './HttpService';

export default class CommonService { //Contains API-calls that need to be accessed from multiple components
    constructor() {
    }

    static docURL() {return 'http://localhost:3000/model/document/list' }
    static attrURL() {return 'http://localhost:3000/model/attribute/list' }

    static getAllDocumentTypes(){
        return new Promise((resolve, reject) => {
            HttpService.get(this.docURL(), function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAllAttributeTypes(){
        return new Promise((resolve, reject) => {
            HttpService.get(this.attrURL(), function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}