const baseURL = 'http://localhost:3000';

// for local testing
const mongoDBUrl = 'mongodb://localhost:27017/EiDiA-db';

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
    color: 'primary',
};
const elementIconSize = '24';
const logCount = 5;

const recordMenuOptions = {
    DASHBOARD: 1,
    FILEEXPLORER: 2,
};

const DragTypes = {
    ELEMENT: 'element',
    WIDGET: 'widget'
}

const WidgetTypes = {
    LOG: 'Log',
    GRAPH: 'Graph',
    INDICATOR: 'Indicator'
}

const GraphType = {
    Line: 'Line Chart',
    Bar: 'Bar Chart',
}

module.exports = {
    baseURL,
    mongoDBUrl,
    fileTypes,
    fileActions,
    styleFabButton,
    elementIconSize,
    logCount,
    DragTypes,
    recordMenuOptions,
    WidgetTypes,
    GraphType,


};
