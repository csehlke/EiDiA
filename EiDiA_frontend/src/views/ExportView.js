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
        this.editorStateChanged = this.editorStateChanged.bind(this);
        this.dontSave = this.dontSave.bind(this);
    }

    editorStateChanged() {
        this.setState({editorStateChanged: true})
    }

    toggleAlert() {
        this.setState({showAlert: !this.state.showAlert});
    }

    componentDidMount() {
        this.props.setTitle("Create Document");
    }

    changeView(page) {
        this.setState({nextPage: page});
        if (this.state.currentPage === pageNames.edit && this.state.editorStateChanged) {
            this.toggleAlert()
        } else {
            this.setState({
                currentPage: page,
                readOnly: (page !== pageNames.editTemplate)
            });
        }
    }

    dontSave() {
        this.toggleAlert();
        this.setState({editorStateChanged: false}, () => {
            this.changeView(this.state.nextPage);
        });
    }

    render() {
        return (
            <Page>
                <ExportMenuBar title={this.state.currentPage} changeView={this.changeView}/>
                <ExportMainView
                    pageNames={pageNames}
                    currentPage={this.state.currentPage}
                    readOnly={this.state.readOnly}
                    changeView={this.changeView}
                    editorStateChanged={this.state.editorStateChanged}
                    editorDidChange={this.editorStateChanged}
                />
                <Dialog
                    open={this.state.showAlert}
                    onClose={this.toggleAlert}
                >
                    <DialogTitle>Do you want to leave this view?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your changes will be lost. You can export this document.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.dontSave}>Leave & Discard changes</Button>
                        <Button color="primary" onClick={this.toggleAlert}>Stay</Button>
                    </DialogActions>
                </Dialog>
            </Page>
        );
    }
}
