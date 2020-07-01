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
export const WidgetTypes = {
    LOG: 'LOG',
    GRAPH: 'GRAPH',
    INDICATOR: 'INDICATOR'


}
export const ActionTypes = {
    NewDocument: "new Document",
    EditedDocument: "Changed Document",
    RemovedDocument: "Removed Document",
    NewWidget: "NewWidget"

}
export const Widgets =
    [
        {
            positionInfo: {
                x: 1,
                y: 1,
                rows: 1 + 1,
                cols: 1,
            },
            TITLE: "Indicator One",
            Type: WidgetTypes.INDICATOR,
            Data: []
        },
        {
            positionInfo: {
                x: 2,
                y: 1,
                rows: 1 + 1,
                cols: 2 + 1,
            },
            TITLE: "Graph One",
            Type: WidgetTypes.GRAPH,
            Data: []
        },
        {
            positionInfo: {
                x: 1,
                y: 2,
                rows: 1 + 1,
                cols: 2 + 1,
            },
            TITLE: "Indicator Two",
            Type: WidgetTypes.INDICATOR,
            Data: []
        },

        {
            positionInfo: {
                x: 3,
                y: 1,
                rows: 2 + 1,
                cols: 3 + 1,
            },
            TITLE: "Log",
            Type: WidgetTypes.LOG,
            Data: [
                {
                    logID: 2,
                    name: "John Doe",
                    action: "added Document \"Tax Assesment\"",
                    date: "2009-05-12"
                },
                {
                    logID: 2,
                    name: "Max Mustermann",
                    action: "added Widget \"Indicator One\"",
                    date: "2011-05-14"
                },
                {
                    logID: 2,
                    name: "Jane Doe",
                    action: "did something that should not show up it is simply to old and outside of the count (if set to three)",
                    date: "1900-06-13"
                },
                {
                    logID: 2,
                    name: "Jane Doe",
                    action: "changed Widget \"Indicator One\"",
                    date: "2012-06-13"
                }
            ]
        }

    ]




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