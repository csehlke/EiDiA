"use strict";

import HttpService from './HttpService';
import {baseURL} from "../../../constants";
import {format} from "date-fns";

export default class SearchService {
    constructor() {
    }

    static getBasicSearchResult(searchValues) {
        let url = new URL('/search/basic', baseURL);

        if (searchValues.recordId) {
            url.searchParams.set('recordId', searchValues.recordId);
        }
        if (searchValues.documentTypeId) {
            url.searchParams.set('documentTypeId', searchValues.documentTypeId);
        }
        if (searchValues.dateFrom) {
            url.searchParams.set('dateFrom', format(searchValues.dateFrom, 'dd/MM/yyyy'));
        }
        if (searchValues.dateTo) {
            url.searchParams.set('dateTo', format(searchValues.dateTo, 'dd/MM/yyyy'));
        }
        if (searchValues.fullText) {
            url.searchParams.set('fullText', searchValues.fullText);
        }
        if (searchValues.userId) {
            url.searchParams.set('userId', searchValues.userId);
        }

        return new Promise((resolve, reject) => {
            HttpService.get(url, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAdvancedSearchResult(searchValues) {
        let url = new URL('/search/advanced', baseURL);

        // Flatten searchConstraints structure
        let flatSearchConstraints = [];
        searchValues.map(searchValue => {
            searchValue.attributeTypeConstraints.map(attributeTypeConstraint => {
                flatSearchConstraints.push(attributeTypeConstraint);
            });
        });

        flatSearchConstraints.map((searchConstraint, i) => {
            url.searchParams.append('documentTypeId-' + i, searchConstraint.documentTypeId);
            url.searchParams.append('attributeTypeId-' + i, searchConstraint.attributeTypeId);
            url.searchParams.append('compareTypeId-' + i, searchConstraint.constraint.compareTypeId);
            url.searchParams.append('value1-' + i, searchConstraint.constraint.value1);
            if (searchConstraint.constraint.value2 !== null && searchConstraint.constraint.value2 !== '') {
                url.searchParams.append('value2-' + i, searchConstraint.constraint.value2);
            }
        });

        return new Promise((resolve, reject) => {
            HttpService.get(url, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}
