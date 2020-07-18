const baseURL = 'http://localhost:3000';

const pass = 'SEBApass'; //TODO change when live
const mongoDBUrl = 'mongodb+srv://seba-dev:' + pass + '@eidia-0-wtpll.mongodb.net/EiDiA-db?retryWrites=true&w=majority';

// for local testing
// const mongoDBUrl = 'mongodb://localhost:27017/EiDiA-db';

// File browser
const fileTypes = {
    FOLDER: 'Folder',
    PDF: 'PDF',
    WORD: 'Word',
    NONE: 'None',
    IMAGE: 'Image'
};

const fileActions = {
    EDIT: 'EDIT',
    DOWNLOAD: 'DOWNLOAD',
    DELETE: 'DELETE',
}
const styleFabButton = {
    top: 'auto',
    bottom: '2em',
    right: '2em',
    left: 'auto',
    position: 'fixed',
};

module.exports = {
    baseURL,
    mongoDBUrl,
    fileTypes,
    fileActions,
    styleFabButton
};
