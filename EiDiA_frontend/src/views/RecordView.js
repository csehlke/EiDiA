"use strict";

import React from 'react';
import Page from "../components/Page";
import {RecordMenu} from "../components/fileCabinet/RecordMenu";
import FileExplorer from "../components/filetable/FileExplorer";
import {Dashboard} from "../components/fileCabinet/Dashboard";
import {recordMenuOptions} from "../assets/Constants";

export class RecordView extends React.Component {

    /*
     *TODO:
     * - add getRecordFromDatabase functionality
     * - add Pages if too many records
     * - add Add Button
     */
    constructor(props) {
        super(props);
        this.state = {
            currentPage: recordMenuOptions.DASHBOARD,
        }
    }

    componentDidMount() {
        //TODO: set a variable title
        this.props.setTitle("Record View");
    }

    changePage(option) {
        this.state.currentPage = option;
        this.setState(this.state);
    }

    render() {
        let toShow;

        switch (this.state.currentPage) {
            case recordMenuOptions.DASHBOARD:
                toShow = <Dashboard/>;
                break;
            case recordMenuOptions.FILEEXPLORER:
                toShow = <FileExplorer/>;
                break;
            default:
                toShow = <Dashboard/>;
                break;
        }

        return (
            <Page>
                <RecordMenu
                    handle={(option) => this.changePage(option)}/>
                <div>
                    {toShow}
                </div>
            </Page>
        );
    }
}
