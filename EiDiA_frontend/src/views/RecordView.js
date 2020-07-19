"use strict";

import React from 'react';
import Page from "../components/Page";
import FileExplorer from "../components/record/FileExplorer";
import {Dashboard} from "../components/record/Dashboard";
import {WrapperRecordMenue, WrapperRecordView} from "../components/StyleElements";
import {Tab, Tabs} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import RecordService from "../services/RecordService";
import {recordMenuOptions} from "../../../constants";
import {ServerSideErrorSnackBar} from "../components/ServerSideErrorSnackBar";

class RecordView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentPage: recordMenuOptions.DASHBOARD,
            recordId: this.props.match.params.id,
            documents: [],
            isServerError: false,

        }
    }

    componentDidMount() {
        this.getDocuments()
        RecordService.getRecordName(this.state.recordId)
            .then(response => this.props.setTitle(response.name))
            .catch((e) => {
                this.props.setTitle("Record")
                this.setState({isServerError: true})
            })


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
            .catch((e) => this.setState({isServerError: true}))

    }

    updateData = () => {
        this.getDocuments();
    }

    groupBy = (xs, key) => {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    handleServerErrorBarClose = (e) => {
        this.setState({
            isServerError: false,

        });
    }

    render() {
        console.log(this.state.documents)
        let toShow;

        switch (this.state.currentPage) {
            case recordMenuOptions.DASHBOARD:
                toShow = <Dashboard recordId={this.state.recordId}/>;
                break;
            case recordMenuOptions.FILEEXPLORER:
                toShow = <FileExplorer
                    updateData={this.updateData}
                    elements={this.state.documents}
                    recordId={this.state.recordId}
                    dragEnabled={true}
                />;
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
                        <Tab label="File Explorer"
                             value={recordMenuOptions.FILEEXPLORER}/>
                    </Tabs>
                </WrapperRecordMenue>
                <WrapperRecordView>
                    {toShow}
                </WrapperRecordView>
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>

            </Page>
        );
    }
}

export default withRouter(RecordView);
