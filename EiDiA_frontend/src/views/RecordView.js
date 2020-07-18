"use strict";

import React from 'react';
import Page from "../components/Page";
import FileExplorer from "../components/record/FileExplorer";
import {Dashboard} from "../components/record/Dashboard";
import {WrapperRecordMenue, WrapperRecordView} from "../components/StyleElements";
import {Tab, Tabs} from "@material-ui/core";
import {recordMenuOptions} from "../assets/Constants";
import {withRouter} from "react-router-dom";
import RecordService from "../services/RecordService";

class RecordView extends React.Component {

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
            recordId: this.props.match.params.id,
            documents: [],
        }
    }

    componentDidMount() {
        this.getDocuments()
        this.props.setTitle("Record View");

    }


    changePage(option) {
        this.state.currentPage = option;
        this.setState(this.state);
    }

    handleChange(event, value) {
        this.setState({currentPage: value})
    }

    getDocuments() {
        RecordService.getDocuments(this.state.recordId)
            .then(response => {
                this.setState({documents: response})
            })
            .catch(e => console.error(e))
    }

    updateData = () => {
        console.log("hello")
        this.getDocuments();
    }
    getAttributes = () => {

    }
    getDocTypes = () => {

    }
    groupBy = (xs, key) => {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };


    render() {

        let toShow;

        switch (this.state.currentPage) {
            case recordMenuOptions.DASHBOARD:
                toShow = <Dashboard recordId={this.state.recordId}/>;
                break;
            case recordMenuOptions.FILEEXPLORER:
                toShow = <FileExplorer
                    updateData={this.updateData}
                    data={this.state.documents}
                    recordId={this.state.recordId}/>;
                break;
            default:
                toShow = <Dashboard recordId={this.state.recordId}/>;
                break;
        }
        console.log(this.state.documents)
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
                        <Tab label="File Explorer"
                             value={recordMenuOptions.FILEEXPLORER}/>
                    </Tabs>
                </WrapperRecordMenue>
                <WrapperRecordView>
                    {toShow}
                </WrapperRecordView>
            </Page>
        );
    }
}

export default withRouter(RecordView);
