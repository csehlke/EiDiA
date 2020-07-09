"use strict";
import HttpService from './HttpService';
import {baseURL} from "../../../constants";

export default class UserService {
    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(baseURL + '/auth/login', {
                username: user,
                password: pass
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
}
