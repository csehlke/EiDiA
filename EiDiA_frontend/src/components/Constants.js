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
export const GraphType = {
    Line: 'Line Chart',
    Bar: 'Bar Chart',
    Pie: 'Pie Chart'
}
export const ActionTypes = {
    NewDocument: "new Document",
    EditedDocument: "Changed Document",
    RemovedDocument: "Removed Document",
    NewWidget: "NewWidget"

}
export const LogEntries = [
    {
        logID: 1,
        name: "John Doe",
        action: "added Document \"Tax Assesment\"",
        date: "2009-05-12",
        recordId: "34" //e.g. BMW
    },
    {
        logID: 2,
        name: "Max Mustermann",
        action: "added Widget \"Indicator One\"",
        date: "2011-05-14",
        recordId: "34"

    },
    {
        logID: 3,
        name: "Jane Doe",
        action: "did something that should not show up it is simply to old and outside of the count (if set to three)",
        date: "1900-06-13",
        record: "2" //e.g. VW

    },
    {
        logID: 2,
        name: "Jane Doe",
        action: "changed Widget \"Indicator One\"",
        date: "2012-06-13",
        recordId: "34"

    }
]
export const Attributes = [
    {
        attrId: 55, //Factory Count
        value: "24",
        date: "2020-05-15",
        record: "",
        document: ""
    },
    {
        attrId: 56, //Pending Factory Assesments
        value: "18",
        date: "2020-05-15",
        record: "",
        document: ""
    },
    {
        attrId: 10, //Some Tax assesment maybe
        value: 1000,
        date: "2009-05-12",
        record: "",
        document: ""
    },
    {
        attrId: 10,
        value: 1100,
        date: "2010-05-13",
        record: "",
        document: ""
    },
    {
        attrId: 10,
        value: 950,
        date: "2012-05-15",
        record: "",
        document: ""
    },
    {
        attrId: 10,
        value: 950,
        date: "2012-05-15",
        record: "",
        document: ""
    },
    {
        attrId: 11,//Some other Tax assesment maybe
        value: 10500,
        date: "2009-05-12",
        record: "",
        document: ""
    },
    {
        attrId: 11,
        value: 11000,
        date: "2010-05-13",
        record: "",
        document: ""
    },
    {
        attrId: 11,
        value: 13000,
        date: "2012-05-15",
        record: "",
        document: ""
    },
    {
        attrId: 11,
        value: 10000,
        date: "2012-05-15",
        record: "",
        document: ""
    },
    {
        attrId: 58,//name: "Last customer Inquiry",
        date: "2020-01-04",
        value: "2020-01-03"

    },
    {
        attrId: 156, //       name: "Date of Last File Update",
        date: "2020-04-19",
        value: "2020-04-20"
    },
    {
        attrId: 25,//Tax Due
        value: "12345$"
    }


]
export const Widgets =
    [
        {
            positionInfo: {
                x: 1,
                y: 1,
                rows: 1,
                cols: 1,
            },
            TITLE: "Indicator One",
            Type: WidgetTypes.INDICATOR,
            attributeMapping: [
                {
                    attrId: 55,
                    name: "Factory Count",
                },
                {
                    attrId: 56,
                    name: "Pending Factory assesments",
                }
            ]
        },
        {
            positionInfo: {
                x: 2,
                y: 1,
                rows: 1,
                cols: 1,
            },
            TITLE: "Graph One",
            Type: WidgetTypes.GRAPH,
            attributeMapping: [
                {
                    attrId: 10,
                    name: "Tax assesment",
                    color: "red"
                },
                {
                    attrId: 11,
                    name: "Revenue",
                    color: "green"
                }
            ]
        },
        {
            positionInfo: {
                x: 1,
                y: 2,
                rows: 1,
                cols: 2,
            },
            TITLE: "Indicator Two",
            Type: WidgetTypes.INDICATOR,
            attributeMapping: [
                {
                    attrId: 58,
                    name: "Last customer Inquiry",
                },
                {
                    attrId: 156,
                    name: "Date of Last File Update",
                },
                {
                    attrId: 25,
                    name: "Tax Due",
                },
                {
                    attrId: 58,
                    name: "Last customer Inquiry",
                },
                {
                    attrId: 156,
                    name: "Date of Last File Update",
                },
                {
                    attrId: 58,
                    name: "Last customer Inquiry",
                },
                {
                    attrId: 156,
                    name: "Date of Last File Update",
                },
                {
                    attrId: 25,
                    name: "Tax Due",
                }
            ]
        },
        {
            positionInfo: {
                x: 3,
                y: 1,
                rows: 2,
                cols: 3,
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