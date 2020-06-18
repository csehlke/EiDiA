"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordMenu} from "../components/fileCabinet/RecordMenu";
import {FileExplorer} from "../components/fileCabinet/FileExplorer";

export class RecordView extends React.Component {

    /*
     *TODO:
     * - add getRecordFromDatabase functionality
     * - add Pages if too many records
     * - add Add Button
     */
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setTitle("Record");
    }

    render() {
        return (
            <Page>
                <RecordMenu/>
                <FileExplorer/>
            </Page>
        );
    }
}
