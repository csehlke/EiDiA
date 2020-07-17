const {fileTypes} = require('../../../constants');

export const recordMenuOptions = {
    DASHBOARD: 1,
    FILEEXPLORER: 2,
};

export const DragTypes = {
    ELEMENT: 'element',
    WIDGET: 'widget'
}

export const WidgetTypes = {
    LOG: 'Log',
    GRAPH: 'Graph',
    INDICATOR: 'Indicator'


}
export const GraphType = {
    Line: 'Line Chart',
    Bar: 'Bar Chart',
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
        recordId: "2" //e.g. VW

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
        attributeId: 55, //Factory Count
        name: "factoryCount",
        value: "24",
        date: "2020-05-15",
        record: "",
        docTypeId: 123
    },
    {
        attributeId: 56, //Pending Factory Assesments
        name: "pendingFactoryAssesments",

        value: "18",
        date: "2020-05-15",
        record: "",
        docTypeId: 123
    },
    {
        attributeId: 10, //Some Tax assesment maybe
        name: "taxAssesment",

        value: 1000,
        date: "2009-05-12",
        record: "",
        docTypeId: 124
    },
    {
        attributeId: 10,
        name: "taxAssesment",

        value: 1100,
        date: "2010-05-13",
        record: "",
        docTypeId: 124
    },
    {
        attributeId: 10,
        name: "taxAssesment",

        value: 950,
        date: "2012-05-15",
        record: "",
        docTypeId: 124
    },
    {
        attributeId: 10,
        name: "taxAssesment",

        value: 950,
        date: "2012-05-15",
        record: "",
        docTypeId: 124
    },
    {
        attributeId: 11,//Some other Tax assesment maybe
        name: "revenue",

        value: 10500,
        date: "2009-05-12",
        record: "",
        docTypeId: 124
    },
    {
        attributeId: 11,
        name: "revenue",

        value: 11000,
        date: "2010-05-13",
        record: "",
        docTypeId: 124
    },
    {
        attributeId: 11,
        name: "revenue",

        value: 13000,
        date: "2012-05-15",
        record: "",
        docTypeId: 124
    },
    {
        attributeId: 11,
        name: "revenue",

        value: 10000,
        date: "2012-05-15",
        record: "",
        docTypeId: 124
    },
    {
        attributeId: 58,//name: "Last customer Inquiry",
        name: "lastCustomerInquiry",

        date: "2020-01-04",
        value: "2020-01-03",
        docTypeId: 125

    },
    {
        attributeId: 156, //       name: "Date of Last File Update",
        name: "lastFileUpdate",

        date: "2020-04-19",
        value: "2020-04-20",
        docTypeId: 125,
    },
    {
        attributeId: 25,//Tax Due
        name: "taxDue",

        value: "12345$",
        docTypeId: 124,
    }


]
export const DatabaseDocTypes =
    [
        {name: "DocTypA", docTypeId: 123},
        {name: "DocTypB", docTypeId: 124},
        {name: "DocTypC", docTypeId: 125}
    ]
/*export const Widgets =
    [
        {
            positionInfo: {
                x: 1,
                y: 1,
            },
            title: "Indicator One",
            widgetType: WidgetTypes.INDICATOR,
            attributeMapping: [
                {
                    docTypeId: 123,

                    attributeId: 55,
                    displayName: "Factory Count",
                },
                {
                    docTypeId: 123,
                    attributeId: 56,
                    displayName: "Pending Factory assesments",

                }
            ]
        },
        {
            positionInfo: {
                x: 2,
                y: 1,
            },
            title: "Graph One",
            widgetType: WidgetTypes.GRAPH,
            graphType: GraphType.Bar,
            attributeMapping: [
                {
                    docTypeId: 124,
                    attributeId: 10,
                    displayName: "Tax assesment",
                    color: "red"
                },
                {
                    docTypeId: 124,
                    attributeId: 11,
                    displayName: "Revenue",
                    color: "green"
                }
            ]
        },
        {
            positionInfo: {
                x: 1,
                y: 2,
            },
            title: "Indicator Two",
            widgetType: WidgetTypes.INDICATOR,
            attributeMapping: [
                {
                    docTypeId: 125,

                    attributeId: 58,
                    displayName: "Date of Last customer Inquiry",
                },
                {
                    docTypeId: 125,
                    attributeId: 156,
                    displayName: "Date of Last File Update",
                },
                {
                    docTypeId: 124,
                    attributeId: 25,
                    displayName: "Tax Due",

                },
                {
                    docTypeId: 125,
                    attributeId: 58,
                    displayName: "Date of Last customer Inquiry",

                },
                {
                    docTypeId: 125,
                    attributeId: 156,
                    displayName: "Date of Last File Update",

                }
            ]
        },
        {
            positionInfo: {
                x: 3,
                y: 1,
            },
            title: "Log",
            widgetType: WidgetTypes.LOG,
            attributeMapping: []
        }

    ]*/


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
        activeFolder: false,
        type: fileTypes.WORD,
        name: "Sample Word Document",
        dateCreation: '1.1.1970',
        dateModification: '1.1.2020',
        comment: 'This is a long long Lorem Ipsum Comment talking blablabla',
        actions: ['DOWNLOAD', 'EDIT', 'DELETE'],

    },
    {
        parentId: 0,
        id: 3,
        activeFolder: false,
        type: fileTypes.FOLDER,
        name: "Sample Tom Folder",
        dateCreation: '',
        dateModification: '',
        comment: 'TJust some Folder',
        actions: ['EDIT', 'DELETE'],
    },
    {
        parentId: 3,
        id: 2,
        activeFolder: false,
        type: fileTypes.PDF,
        name: "Sample PDF Document",
        dateCreation: '2.2.1970',
        dateModification: '2.2.2020',
        comment: 'Second Document Comment',
        actions: ['DOWNLOAD', 'EDIT', 'DELETE'],

    },
    {
        parentId: 3,
        id: 6,
        activeFolder: false,
        type: fileTypes.FOLDER,
        name: "Sample Folder",
        dateCreation: '',
        dateModification: '',
        comment: 'TJust some Folder',
        actions: ['EDIT', 'DELETE'],
    },
    {
        parentId: 6,
        id: 5,
        activeFolder: false,
        type: fileTypes.WORD,
        name: "Sample Word Document",
        dateCreation: '1.1.1970',
        dateModification: '1.1.2020',
        comment: 'This is a long long Lorem Ipsum Comment talking blablabla',
        actions: ['DOWNLOAD', 'EDIT', 'DELETE'],

    },


    {
        parentId: 3,
        id: 4,
        activeFolder: false,
        type: fileTypes.PDF,
        name: "Sample PDF Document",
        dateCreation: '2.2.1970',
        dateModification: '2.2.2020',
        comment: 'Second Document Comment',
        actions: ['DOWNLOAD', 'EDIT', 'DELETE'],

    },


];
