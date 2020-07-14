const PORT = 3000;
const BASE_URL = "http://localhost:" + PORT + "/";

export const makeGetRequest = (endpoint, callback) => {
    fetch(BASE_URL + endpoint)
        .then(res => res.json())
        .then(
            (result) => {
                callback(result.response);
            },
            (error) => {
                console.log(error);
            }
        )
}

export const makePostRequest = (endpoint, data, callback) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: data})
    }
    fetch(BASE_URL + endpoint, requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                callback(result.response);
            },
            (error) => {
                console.log(error);
            }
        )
}


// Checks if string/variable is URI, e.g. Document1/VARIABLE1
export const isPath = (string) => {
    return /^(?:\/|[a-z]+:\/\/)/.test(string);
}