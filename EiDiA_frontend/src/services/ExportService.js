"use strict";

import HttpService from './HttpService';
import {baseURL} from '../../../constants.js'

export default class CommonService {


    static getAllTemplates() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + "/exporttemplate/list", function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getTemplate(templateID) {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + "/exporttemplate/template/" + templateID, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static searchDocuments(query) {
        let url = new URL("/exporttemplate/documentNames", baseURL);
        url.searchParams.set("documentName", query);
        return new Promise((resolve, reject) => {
            HttpService.get(url, function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static saveTemplate(templateData) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + "/exporttemplate/save", templateData, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            })
        })
    }

    static exportDocuments(documentIDs) {
        let url = new URL("/exporttemplate/exportDocuments", baseURL);
        url.searchParams.set('documentIDs', documentIDs)
        return new Promise((resolve, reject) => {
            HttpService.get(url, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            })
        })
    }

    static getDocumentAttributes(documentIDs) {
        let url = new URL("/exporttemplate/documents", baseURL);
        url.searchParams.set('documentIDs', documentIDs)
        return new Promise((resolve, reject) => {
            HttpService.get(url, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            })
        })
    }
}