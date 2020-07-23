"use strict";

export default class HttpService {
    constructor() {
    }

    static get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        fetch(url, {
            method: 'GET',
            headers: header
        })
            .then((resp) => {
                if (this.checkIfUnauthorized(resp)) { //redirects to login if unauthorized
                    window.localStorage.removeItem('jwtToken') //clear token if unauthorized
                    window.location = "/#login";
                } else {
                    return resp.json();
                }
            })
            .then((resp) => {
                if (typeof resp === "undefined") {
                    console.log("User is not authorized")
                } else if (resp.error) {
                    onError(resp.error);
                } else {
                    if (resp.hasOwnProperty('token')) {
                        window.localStorage['jwtToken'] = resp.token;
                    }
                    onSuccess(resp);
                }
            })
            .catch((e) => {
                onError(e.message);
            });
    }

    static put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        })
            .then((resp) => {
                if (this.checkIfUnauthorized(resp)) {
                    window.localStorage.removeItem('jwtToken') //clear token if unauthorized
                    window.location = "/#login";

                } else {
                    return resp.json();
                }
            })
            .then((resp) => {
                if (resp.error) {
                    onError(resp.error);
                } else {
                    if (resp.hasOwnProperty('token')) {
                        window.localStorage['jwtToken'] = resp.token;
                    }
                    onSuccess(resp);
                }
            })
            .catch((e) => {
                onError(e.message);
            });
    }

    static post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');
        fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        })
            .then((resp) => {
                if (this.checkIfUnauthorized(resp)) {
                    window.localStorage.removeItem('jwtToken') //clear token if unauthorized
                    window.location = "/#login";

                } else {
                    return resp.json();
                }
            })
            .then((resp) => {
                if (resp.error) {
                    onError(resp.error);
                } else {
                    if (resp.hasOwnProperty('token')) {
                        window.localStorage['jwtToken'] = resp.token;
                    }
                    onSuccess(resp);
                }
            })
            .catch((e) => {
                onError(e.message);
            });
    }

    static remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        fetch(url, {
            method: 'DELETE',
            headers: header
        })
            .then((resp) => {
                if (this.checkIfUnauthorized(resp)) {
                    window.localStorage.removeItem('jwtToken') //clear token if unauthorized
                    window.location = "/#login";

                } else {
                    return resp.json();
                }
            })
            .then((resp) => {
                if (resp.error) {
                    onError(resp.error);
                } else {
                    onSuccess(resp)
                }
            })
            .catch((e) => {
                onError(e.message);
            });
    }

    static checkIfUnauthorized(res) {
        return res.status === 401; //returns true if unauthorized
    }
}
