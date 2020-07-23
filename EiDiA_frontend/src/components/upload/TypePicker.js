"use strict";

import React from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import SmartDropDownBox from "../SmartDropDownBox";
import Box from "@material-ui/core/Box";
import CommonService from '../../services/CommonService';
import TextField from "@material-ui/core/TextField";
import NewDocumentTypeDialog from "./NewDocumentTypeDialog";
import RecordPickerDialog from "./RecordPickerDialog";
import {ServerSideErrorSnackBar} from "../ServerSideErrorSnackBar";

const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-direction: column;
    flex-grow: 1; //For Splitview
    flex-basis: 50%;
    justify-content: center;
    margin: 3em;
`;

//Set DropDown width
const DropDownContainer = styled.div`
    width: 100%
`;

class TypePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            documentTypes: [],
            selectedDocumentTypeId: '',
            isNextButtonDisabled: true, // true, if "next"-button is disabled
            hasAutoCompleteValue: false, // true, if autoComplete has value
            documentName: '',
            docDialogOpened: false,
            recDialogOpened: false,
            selectedRecord: '',
            selectedFolder: '',
            isServerError: false,
        }

        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.handleNextButtonOnClick = this.handleNextButtonOnClick.bind(this);
        this.handleDocumentNameChange = this.handleDocumentNameChange.bind(this);
        this.openDocDialog = this.openDocDialog.bind(this);
        this.closeDocDialog = this.closeDocDialog.bind(this);
        this.newDocTypeToBackend = this.newDocTypeToBackend.bind(this);
        this.openRecDialog = this.openRecDialog.bind(this);
        this.closeRecDialog = this.closeRecDialog.bind(this);
        this.getDataFromRecDialog = this.getDataFromRecDialog.bind(this);
        this.handleServerErrorBarClose = this.handleServerErrorBarClose.bind(this);
    }

    componentDidMount() {
        CommonService.getAllDocumentTypes().then((data) => {
            this.setState({
                documentTypes: [...data.documentTypes],
            });
        }).catch((e) => {
            this.setState({
                isServerError: true,
            });
            console.error(e);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.picUploaded !== this.props.picUploaded &&
            this.state.hasAutoCompleteValue &&
            this.props.picUploaded) {
            this.setState({
                isNextButtonDisabled: false
            });
        }
    }

    handleDocumentTypeChange(event, value) {
        this.setState({
            selectedDocumentTypeId: value.id,
        });

        if (this.props.picUploaded) { //Check if image has been uploaded yet
            this.setState({
                isNextButtonDisabled: false
            });
        } else {
            this.setState({
                hasAutoCompleteValue: true
            });
        }
    }

    handleNextButtonOnClick() {
        this.props.callbackUploadView(this.state.selectedDocumentTypeId, this.state.documentName, this.state.selectedRecord, this.state.selectedFolder);
    }


    handleDocumentNameChange(event) {
        this.setState({
            documentName: event.target.value,
        });
    }

    openDocDialog() {
        this.setState({
            docDialogOpened: true
        });
    }

    closeDocDialog() {
        this.setState({
            docDialogOpened: false
        });
    }

    openRecDialog() {
        this.setState({
            recDialogOpened: true
        });
    }

    closeRecDialog() {
        this.setState({
            recDialogOpened: false
        });
    }

    getDataFromRecDialog(selectedRecord, selectedFolder) {
        this.setState({
            selectedRecord: selectedRecord,
            selectedFolder: selectedFolder,
        });
    }


    newDocTypeToBackend(requestData) {
        CommonService.addNewDocumentType(requestData)
            .then(() => {
                return CommonService.getAllDocumentTypes();
            })
            .then((data) => { // Update dropdown with new DocType
                this.setState({
                    documentTypes: [...data.documentTypes],
                });
            })
            .catch((e) => {
                this.setState({
                    isServerError: true,
                });
                console.error(e);
            });
    }

    handleServerErrorBarClose() {
        this.setState({
            isServerError: false,
        })
    }

    render() {
        return (
            <Container>
                <Grid container
                      direction="row"
                      justify="space-between"
                      alignItems="center">

                    <Grid item xs={12} align="center">
                        <TextField
                            label="Document Name"
                            variant="outlined"
                            fullWidth
                            size={"small"}
                            style={{margin: '0.5em'}}
                            onChange={this.handleDocumentNameChange}
                        />
                    </Grid>

                    <Grid item xs={12} align="center">
                        <DropDownContainer>
                            <SmartDropDownBox
                                onChange={this.handleDocumentTypeChange}
                                options={this.state.documentTypes}
                                label='Document Type'/>
                        </DropDownContainer>
                    </Grid>

                    <Grid item xs={12} align="center">
                        <Box mt={20}/>
                    </Grid>

                    <Grid item xs={6} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.openDocDialog}>
                            Create new Document Type
                        </Button>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.openRecDialog}>
                            Assign to Record
                        </Button>
                    </Grid>
                    <Grid item xs={2} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={this.state.selectedFolder === '' || this.state.isNextButtonDisabled}
                            onClick={this.handleNextButtonOnClick}>
                            Next
                        </Button>
                    </Grid>
                </Grid>

                <NewDocumentTypeDialog
                    open={this.state.docDialogOpened}
                    onClose={this.closeDocDialog}
                    createNewDocumentType={(newDocumentType) => this.newDocTypeToBackend(newDocumentType)}/>

                <RecordPickerDialog
                    open={this.state.recDialogOpened}
                    onClose={this.closeRecDialog}
                    sendData={this.getDataFromRecDialog}/>

                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>
            </Container>
        )
    }
}

export default TypePicker;
