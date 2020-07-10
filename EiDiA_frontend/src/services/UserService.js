"use strict";
import HttpService from './HttpService';
import {baseURL} from "../../../constants";

export default class UserService {
    static login(user, password) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/auth/login', {
                username: user,
                password: password
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }

    static isAdmin() {
        return this.getCurrentUser().userRole === 'admin';
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id: JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username,
            userRole: JSON.parse(window.atob(base64)).userRole,
        };
    }

    static logout() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/auth/logout', function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}
