"use strict";

import React from 'react';
import Page from "../components/Page";
import FileExplorer from "../components/filetable/FileExplorer";
import {Dashboard} from "../components/fileCabinet/Dashboard";
import {recordMenueOptions} from "../components/Constants";
import {WrapperRecordMenue, WrapperRecordView} from "../components/StyleElements";
import {Tab, Tabs} from "@material-ui/core";


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

    handleChange(event, value) {
        // this.state.currentPage=value;
        this.setState({currentPage: value})
        // this.setState(this.state);
    }

    render() {

        let toShow;

        switch (this.state.currentPage) {
            case recordMenuOptions.DASHBOARD:
                toShow = <Dashboard/>;
                break;
            case recordMenueOptions.FILEEXPLORER:
                toShow = <FileExplorer/>;
                break;
            default:
                toShow = <Dashboard/>;
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
                        <Tab label="Dashboard" value={recordMenueOptions.DASHBOARD}/>
                        <Tab label="File Explorer" value={recordMenueOptions.FILEEXPLORER}/>
                    </Tabs>
                </WrapperRecordMenue>
                <WrapperRecordView>
                    {toShow}
                </WrapperRecordView>
            </Page>
        );
    }
}