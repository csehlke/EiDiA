"use strict";

import HttpService from './HttpService';
import {baseURL} from '../../../constants.js'

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

    static getAllUsersForAdministration() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/auth/admin/list', function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static addUserAdmin(user) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/auth/admin/register', user, function (data) {
                resolve(data.user);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateUserAdmin(updatedUser) {
        return new Promise((resolve, reject) => {
            HttpService.put(baseURL + '/auth/admin/update/' + updatedUser.id, updatedUser, function (data) {
                resolve(data.user);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteUserAdmin(deletedUserId) {
        return new Promise((resolve, reject) => {
            HttpService.remove(baseURL + '/auth/admin/delete/' + deletedUserId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getAllUsernames() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/auth/list', function (data) {
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

    static getMe() {
        return new Promise((resolve, reject) => {
            HttpService.get(baseURL + '/auth/me', function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    };
}

