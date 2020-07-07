"use strict";

import React from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import SmartDropDownBox from "../SmartDropDownBox";
import Box from "@material-ui/core/Box";

import CommonService from '../../services/CommonService';
import TextField from "@material-ui/core/TextField";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-direction: column;
    flex-grow: 1; //For Splitview
    flex-basis: 50%;
    justify-content: center;
    margin: 8%;
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
            selectedAttrType: '',
            newDocumentTypeName: '',
            newAttributeName: ''
        }

        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.handleNextButtonOnClick = this.handleNextButtonOnClick.bind(this);
        this.assignRecord = this.assignRecord.bind(this);
        this.handleDocumentNameChange = this.handleDocumentNameChange.bind(this);
        this.openDocDialog = this.openDocDialog.bind(this);
        this.closeDocDialog = this.closeDocDialog.bind(this);
        this.newDocTypeToBackend = this.newDocTypeToBackend.bind(this);
        this.handleAttrTypeChange = this.handleAttrTypeChange.bind(this);
        this.handleNewDocumentTypeName = this.handleNewDocumentTypeName.bind(this);
        this.handleNewAttributeName = this.handleNewAttributeName.bind(this);
    }

    componentDidMount() {
        CommonService.getAllDocumentTypes().then((data) => {
            this.setState({
                documentTypes: [...data.documentTypes],
            });
        }).catch((e) => {
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
        this.props.callbackUploadView(this.state.selectedDocumentTypeId, this.state.documentName);
    }

    assignRecord() {
        console.log("Open FilePicker here (to assign to record)");
    }

    handleDocumentNameChange(event) {
        this.setState({
            documentName: event.target.value,
        });
    }

    handleAttrTypeChange(event) {
        this.setState({
            selectedAttrType: event.target.value,
        });
        console.log(this.state.selectedAttrType)
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

    newDocTypeToBackend() {
        //TODO SEND NEW DOCTYPES TO BACKEND
    }

    handleNewDocumentTypeName(event) {
        this.setState({
            newDocumentTypeName: event.target.value
        });
    }

    handleNewAttributeName(event) {
        this.setState({
            newAttributeName: event.target.value
        });
    }

    addNewAttribute() {
        //TODO Add new Attribute to List
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
                        <Box mt={40}/>
                    </Grid>

                    <Grid item xs={2} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.openDocDialog}>
                            Create new Document Type
                        </Button>
                    </Grid>
                    <Grid item xs={2} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.assignRecord}>
                            Assign to Record
                        </Button>
                    </Grid>
                    <Grid item xs={2} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={this.state.isNextButtonDisabled}
                            onClick={this.handleNextButtonOnClick}>
                            Next
                        </Button>
                    </Grid>
                </Grid>

                <Dialog open={this.state.docDialogOpened} onClose={this.closeDocDialog}>
                    <DialogTitle>
                        Create New Document Type
                        <TextField
                            label="Document Type Name"
                            variant="outlined"
                            onChange={this.handleNewDocumentTypeName}
                            fullWidth
                        />
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="center">

                            <Grid item xs={6} style={{padding: 10}}>
                                <TextField
                                    label={"attrName"}
                                    variant="outlined"/>
                            </Grid>
                            <Grid item xs={6} style={{padding: 10}}>
                                <TextField
                                    label={"attrName"}
                                    variant="outlined"/>
                            </Grid>
                            <Grid item xs={6} style={{padding: 10}}>
                                <TextField
                                    label={"attrName"}
                                    variant="outlined"/>
                            </Grid>
                            <Grid item xs={6} style={{padding: 10}}>
                                <TextField
                                    label={"attrName"}
                                    variant="outlined"/>
                            </Grid>
                            <Grid item xs={6} style={{padding: 10}}>
                                <TextField
                                    label={"attrName"}
                                    variant="outlined"/>
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <TextField
                            label="Attribute Name"
                            variant="outlined"
                            onChange={this.handleNewAttributeName}
                            fullWidth
                        />
                        <FormControl variant="outlined" style={{minWidth: 150}}>
                            <InputLabel>Attribute Type</InputLabel>
                            <Select
                                value={this.state.selectedAttrType}
                                onChange={this.handleAttrTypeChange}
                            >
                                <MenuItem value={'text'}>Text</MenuItem>
                                <MenuItem value={'number'}>Number</MenuItem>
                                <MenuItem value={'date'}>Date</MenuItem>
                            </Select>
                        </FormControl>
                        <Button autoFocus color="primary" onClick={this.addNewAttribute}>
                            Add Attribute
                        </Button>
                    </DialogActions>
                    <DialogActions>
                        <Button autoFocus color="primary" onClick={this.newDocTypeToBackend}>
                            Save Document Type
                        </Button>
                    </DialogActions>
                </Dialog>

            </Container>
        )
    }
}

export default TypePicker;
