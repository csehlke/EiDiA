"use strict";


export default class UserService {
    static login() {
        return new Promise((resolve, reject) =>
            reject("TestError"));
        // TODO
    }

    static isAuthenticated() {
        return true;// TODO !!window.localStorage['jwtToken'];
    }
}
