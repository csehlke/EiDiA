"use strict";

import React from 'react';
import Page from "../components/Page";
import FileExplorer from "../components/record/FileExplorer";
import {Dashboard} from "../components/record/Dashboard";
import {WrapperRecordMenue, WrapperRecordView} from "../components/StyleElements";
import {Tab, Tabs} from "@material-ui/core";
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
            recordId: 34//TODO: get this from calling Component
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

    handleChange(event, value) {
        // this.state.currentPage=value;
        this.setState({currentPage: value})
        // this.setState(this.state);
    }

    render() {

        let toShow;

        switch (this.state.currentPage) {
            case recordMenuOptions.DASHBOARD:
                toShow = <Dashboard recordId={this.state.recordId}/>;
                break;
            case recordMenuOptions.FILEEXPLORER:
                toShow = <FileExplorer recordId={this.state.recordId}/>;
                break;
            default:
                toShow = <Dashboard recordId={this.state.recordId}/>;
                break;
        }

        return (
            <Page title={"Record"}>
                <WrapperRecordMenue>
                    <Tabs
                        value={this.state.currentPage}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange.bind(this)}
                    >
                        <Tab label="Dashboard" value={recordMenuOptions.DASHBOARD}/>
                        <Tab label="File Explorer" value={recordMenuOptions.FILEEXPLORER}/>
                    </Tabs>
                </WrapperRecordMenue>
                <WrapperRecordView>
                    {toShow}
                </WrapperRecordView>
            </Page>
        );
    }
}