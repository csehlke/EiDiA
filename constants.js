const baseURL = 'http://localhost:3000';

const pass = 'SEBApass'; //TODO change when live
const mongoDBUrl = 'mongodb+srv://seba-dev:' + pass + '@eidia-0-wtpll.mongodb.net/EiDiA-db?retryWrites=true&w=majority';

// for local testing
// const mongoDBUrl = 'mongodb://localhost:27017/EiDiA-db';

module.exports = {
    baseURL,
    mongoDBUrl,
};