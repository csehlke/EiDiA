"use strict";

import React from 'react';
import Page from "../components/Page";
import DocEditor from "../components/DocEditor";


export class ExportView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page title={"Export"}>
                <DocEditor>hallo</DocEditor>
            </Page>
        );
    }
}
