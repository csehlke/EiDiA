export const recordMenueOptions ={
    DASHBOARD:1,
    FILEEXPLORER:2
}
export const DragTypes = {
    ELEMENT: 'element'
}
export const fileTypes = {
    FOLDER: 'Folder',
    PDF: 'PDF',
    WORD: 'Word',
    NONE: 'None'


}
export const Widgets ={
    X:1,
    Y:1,
    ROWS:1,
    COLUMNS:1,
    TITLE: "Last Activities",
    Type: "LOG"
}
export const WidgetTypes = {
    LOG:'LOG',
    GRAPH:'GRAPH',
    INDICATOR:'INDICATOR'


}
export const logs = [
    {
        PERSON: "John Doe",
        ACTIVITY: "added Document \"Tax assesment\"",
        TIMESTAMP: "1.1.1970"
    },
    {
        PERSON: "John Doe",
        ACTIVITY: "added Document \"Tax assesment\"",
        TIMESTAMP: "1.1.1970"
    },
    {
        PERSON: "John Doe",
        ACTIVITY: "added Document \"Tax assesment\"",
        TIMESTAMP: "1.1.1970"
    }

]


export const databaseEntriesPlaceholder = [
    {
        parentId: 0,
        id: 1,
        active: false,
        type: fileTypes.WORD,
        name: "Sample Word Document",
        dateCreation: '1.1.1970',
        dateModification: '1.1.2020',
        comment: 'This is a long long Lorem Ipsum Comment talking blablabla',
        actions: ['DOWNLOAD', 'EDIT', 'DELETE'],
        children: []
    },

    {
        parentId: 0,
        id: 3,
        active: false,
        type: fileTypes.FOLDER,
        name: "Sample Folder",
        dateCreation: '',
        dateModification: '',
        comment: 'TJust some Folder',
        actions: ['EDIT', 'DELETE'],
        children: [
            {
                parentId: 3,
                id: 2,
                active: false,
                type: fileTypes.PDF,
                name: "Sample PDF Document",
                dateCreation: '2.2.1970',
                dateModification: '2.2.2020',
                comment: 'Second Document Comment',
                actions: ['DOWNLOAD', 'EDIT', 'DELETE'],
                children: []
            },
            {
                parentId: 3,
                id: 6,
                active: false,
                type: fileTypes.FOLDER,
                name: "Sample Folder",
                dateCreation: '',
                dateModification: '',
                comment: 'TJust some Folder',
                actions: ['EDIT', 'DELETE'],
                children:
                    [
                        {
                            parentId: 3,
                            id: 5,
                            active: false,
                            type: fileTypes.WORD,
                            name: "Sample Word Document",
                            dateCreation: '1.1.1970',
                            dateModification: '1.1.2020',
                            comment: 'This is a long long Lorem Ipsum Comment talking blablabla',
                            actions: ['DOWNLOAD', 'EDIT', 'DELETE'],
                            children: []
                        }
                    ]
            },
            {
                parentId: 3,
                id: 4,
                active: false,
                type: fileTypes.PDF,
                name: "Sample PDF Document",
                dateCreation: '2.2.1970',
                dateModification: '2.2.2020',
                comment: 'Second Document Comment',
                actions: ['DOWNLOAD', 'EDIT', 'DELETE'],
                children: []
            }
        ]
    }
];