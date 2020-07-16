"use strict";

import React from 'react';
import ExportMainView from '../components/export/ExportMainView';
import ExportMenuBar from '../components/export/ExportMenuBar';
import Page from "../components/Page";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const pageNames = {
    selectTemplate: "Select Template",
    editTemplate: "Edit Template",
    edit: "Edit"
}


export class ExportView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: pageNames.selectTemplate,
            readOnly: true,
            editorStateChanged: false,
            showAlert: false
        }
        this.changeView = this.changeView.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.editorDidChange = this.editorDidChange.bind(this);
        this.dontSave = this.dontSave.bind(this);
    }

    editorDidChange() {
        console.log("changed")
        this.setState({editorStateChanged: true})
    }

    toggleAlert() {
        this.setState({showAlert: !this.state.showAlert});
    }

    componentDidMount() {
        this.props.setTitle("Create Document");
    }

    changeView(page) {
        if (this.state.currentPage === pageNames.editTemplate && this.state.editorStateChanged) {
            this.toggleAlert()
        } else {
            this.setState({
                currentPage: page,
                readOnly: (page !== pageNames.editTemplate)
            });
        }
    }

    dontSave() {
        console.log(this.state.editorStateChanged);
        this.setState({editorStateChanged: false});
        this.toggleAlert();
        this.changeView(pageNames.selectTemplate);
    }

    render() {
        return (
            <Page>
                <ExportMenuBar title={this.state.currentPage} changeView={this.changeView}/>
                <ExportMainView
                    currentPage={this.state.currentPage}
                    readOnly={this.state.readOnly}
                    changeView={this.changeView}
                    editorStateChanged={this.state.editorStateChanged}
                    editorDidChange={this.editorDidChange}
                />
                <Dialog
                    open={this.state.showAlert}
                    onClose={this.toggleAlert}
                >
                    <DialogTitle>Do you wnat to save the changes you made?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your changes will be lost if you don't save them.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.dontSave}>Don't Save</Button>
                        <Button color="primary" onClick={this.toggleAlert}>Cancel</Button>
                        <Button color="primary" autoFocus>Save</Button>
                    </DialogActions>
                </Dialog>
            </Page>
        );
    }
}
