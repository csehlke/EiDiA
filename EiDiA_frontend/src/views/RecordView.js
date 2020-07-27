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

    /**
     * Once the Component did mount, all Documents aswell as the Record Name is pulled from the database for the corresponding recordID
     */
    componentDidMount() {
        this.getDocuments()
        RecordService.getRecordName(this.state.recordId)
            .then(response => this.props.setTitle(response.name))
            .catch((e) => {
                this.props.setTitle("Record")
                this.setState({isServerError: true})
            })


    }

    /**
     * Sets the current Page this can be either
     * recordMenueOptions.FILEEXPLORER or recordMenueOptions.DASHBOARD
     * @param event
     * @param value
     */
    handleChange(event, value) {
        this.setState({currentPage: value})
    }

    /**
     * Pulls a Documents for the current recordID from the Database
     */
    getDocuments() {
        RecordService.getDocuments(this.state.recordId)
            .then(response => {
                this.setState({documents: response})
            })
            .catch((e) => this.setState({isServerError: true}))

    }

    /**
     * This is used as callback function e.g. for the FileExplorer to force an update on the Documents from the Database
     */
    updateData = () => {
        this.getDocuments();
    }


    handleServerErrorBarClose = (e) => {
        this.setState({
            isServerError: false,

        });
    }

    /**
     * Depending on this.state.currentPage this method renders a Dashboard or an FileExplorer
     * TODO shift datahandling from Dashboard to RecordView or push datahandling of Fileexplorer downwards
     * (if this data is not needed within Recordview)
     * @returns {*}
     */
    render() {
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
