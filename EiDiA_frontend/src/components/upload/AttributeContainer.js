"use strict";

import React from 'react';
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Snackbar from "@material-ui/core/Snackbar";

import MetaData from "./MetaData";
import Box from "@material-ui/core/Box";
import {Button} from "@material-ui/core";
import {RiCropLine} from "react-icons/all";
import Alert from "@material-ui/lab/Alert";

import UploadService from '../../services/UploadService';
import {fileTypes} from "../../../../constants";
import {ServerSideErrorSnackBar} from "../ServerSideErrorSnackBar";
import {Link} from "react-router-dom";

const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-grow: 1; //For Splitview
    flex-basis: 50%;
    flex-direction: column;
`;

const RightSide = styled.div`
    width: 50%;
    margin: 3em;
`;


class AttributeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            attributes: [],
            attributeData: [],
            textValue: "",
            isDateSnackbarOpen: false,
            isNumberSnackbarOpen: false,
            priority: "",
            department: "",
            comment: "",
            isServerError: false,
        }
        this.attrsToBackend = this.attrsToBackend.bind(this);
        this.saveTextFieldData = this.saveTextFieldData.bind(this);
        this.saveDateFieldData = this.saveDateFieldData.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
        this.renderTextFields = this.renderTextFields.bind(this);
        this.renderDateFields = this.renderDateFields.bind(this);
        this.getMetaData = this.getMetaData.bind(this);
        this.handleDateSnackbarClose = this.handleDateSnackbarClose.bind(this);
        this.handleNumberSnackbarClose = this.handleNumberSnackbarClose.bind(this);
        this.handleServerErrorBarClose = this.handleServerErrorBarClose.bind(this);
    }

    componentDidMount() {
        this.props.setTitle("Attribute Picker");

        UploadService.listAttributes(this.props.selectedDocumentTypeId).then((data) => {
            this.setState({
                attributes: [...data.attributeTypes]
            });
        }).catch((e) => {
            this.setState({
                isServerError: true,
            });
            console.error(e.message)
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.crop !== this.props.crop) { //When new crop gets added
            (async () => {
                const {data: {text}} = await this.props.ocrWorker.recognize(this.props.crop); //Do OCR on crop
                console.log(text);
                this.setState({
                    textValue: text.trim() //remove trailing spaces/newlines
                });
            })();
        }
    }

    getMetaData(data) { //Get data from MetaData-component
        this.setState({
            priority: data[0],
            department: data[1],
            comment: data[2],
        });
    }

    saveTextFieldData(attrID) {
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.attributeId === attrID))
        if (idx === -1) { //If ID doesn't exist yet, add it
            this.setState({
                attributeData: [...this.state.attributeData, {
                    attributeId: attrID,
                    value: this.state.textValue,
                    type: 'text'
                }]
            });
        } else {
            copyArr.splice(idx, 1, {attributeId: attrID, value: this.state.textValue, type: 'text'}) //If ID exists already, overwrite it with new value
            this.setState({
                attributeData: copyArr
            });
        }
    }

    saveDateFieldData(attrID) {
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.attributeId === attrID))
        let data = this.state.textValue
        if (!isNaN(Date.parse(data))) { //IF OCR String is date, convert to datatype 'Date'
            let convDate = data.split("/");
            let dateObject = new Date(+convDate[2], convDate[1] - 1, +convDate[0]); //Convert to dd/MM/YYYY
            if (idx === -1) { //If ID doesn't exist yet, add it
                this.setState({
                    attributeData: [...this.state.attributeData, {
                        attributeId: attrID,
                        value: dateObject,
                        type: 'date'
                    }]
                });
            } else {
                copyArr.splice(idx, 1, {attributeId: attrID, value: dateObject, type: 'date'}) //If ID exists already, overwrite it with new value
                this.setState({
                    attributeData: copyArr
                });
            }

        } else {
            this.setState({
                isDateSnackbarOpen: true
            });
        }
    }

    saveNumberFieldData(attrID) {
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.attributeId === attrID))
        if (!isNaN(Number(this.state.textValue))) {
            if (idx === -1) { //If ID doesn't exist yet, add it
                this.setState({
                    attributeData: [...this.state.attributeData, {
                        attributeId: attrID,
                        value: this.state.textValue,
                        type: 'number'
                    }]
                });
            } else {
                copyArr.splice(idx, 1, {attributeId: attrID, value: this.state.textValue, type: 'number'}) //If ID exists already, overwrite it with new value
                this.setState({
                    attributeData: copyArr
                });
            }
        } else {
            this.setState({
                isNumberSnackbarOpen: true
            });
        }
    }

    getFieldValue(attrID) {
        let idx = (this.state.attributeData.findIndex(element => element.attributeId === attrID)) //find index of ID
        if (idx !== -1) {
            return Object.values(this.state.attributeData)[idx].value; // Get value at index
        } else {
            return "";
        }
    }

    handleTextFieldOnChange(event, attrID, type) { //Updates attributeData based on user input
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.attributeId === attrID))

        if (idx === -1) { //If ID doesn't exist yet, add it
            this.setState({
                attributeData: [...this.state.attributeData, {
                    attributeId: attrID,
                    value: event.target.value,
                    type: type
                }]
            });
        } else {
            copyArr.splice(idx, 1, {attributeId: attrID, value: event.target.value, type: type}) //Overwrite with new value
            this.setState({
                attributeData: copyArr
            });
        }
    }

    handleOnDateChange(date, value, attrID) { //Updates attributeData based on user input
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.attributeId === attrID))

        if (idx === -1) { //If ID doesn't exist yet, add it
            this.setState({
                attributeData: [...this.state.attributeData, {
                    attributeId: attrID,
                    value: date,
                    type: 'date'
                }]
            });
        } else {
            copyArr.splice(idx, 1, {attributeId: attrID, value: date, type: 'date'}) //Overwrite with new value
            this.setState({
                attributeData: copyArr
            });
        }
    }


    renderTextFields(attrName, attrID) {
        return <Grid item xs style={{padding: 10, maxWidth: "295px"}}>
            <TextField
                label={attrName}
                variant="outlined"
                multiline
                rowsMax={3}
                value={this.getFieldValue(attrID)}
                onChange={(evt) => this.handleTextFieldOnChange(evt, attrID, 'text')}
                InputProps={{
                    endAdornment: <InputAdornment>
                        <IconButton onClick={() => this.saveTextFieldData(attrID)}>
                            <RiCropLine/>
                        </IconButton>
                    </InputAdornment>
                }}/>
        </Grid>
    }

    renderNumberFields(attrName, attrID) {
        return <Grid item xs style={{padding: 10}}>
            <TextField
                label={attrName}
                type="number"
                variant="outlined"
                value={Number(this.getFieldValue(attrID)) || ""}
                onChange={(evt) => this.handleTextFieldOnChange(evt, attrID, 'number')}
                InputProps={{
                    endAdornment: <InputAdornment>
                        <IconButton onClick={() => this.saveNumberFieldData(attrID)}>
                            <RiCropLine/>
                        </IconButton>
                    </InputAdornment>
                }}/>
        </Grid>
    }

    renderDateFields(attrName, attrID) {
        return <Grid item xs style={{padding: 10}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    style={{maxWidth: 275}} //Same as TextFields
                    autoOk={true}
                    disableToolbar
                    inputVariant="outlined"
                    variant="inline"
                    format="dd/MM/yyyy"
                    invalidDateMessage=""
                    invalidLabel=""
                    label={attrName}
                    value={this.getFieldValue(attrID)}
                    onChange={(date, value) => this.handleOnDateChange(date, value, attrID) || ''}
                    InputAdornmentProps={{position: 'start'}}
                    InputProps={{
                        endAdornment: <InputAdornment>
                            <IconButton onClick={() => this.saveDateFieldData(attrID)}>
                                <RiCropLine/>
                            </IconButton>
                        </InputAdornment>
                    }}/>
            </MuiPickersUtilsProvider>
        </Grid>
    }

    handleDateSnackbarClose() {
        //Snackbar-Close
        this.setState({
            isDateSnackbarOpen: false
        });
    }

    handleNumberSnackbarClose() {
        //Snackbar-Close
        this.setState({
            isNumberSnackbarOpen: false
        });
    }

    handleServerErrorBarClose() {
        this.setState({
            isServerError: false,
        })
    }

    attrsToBackend() { //Send current state to backend
        let requestData = {
            attributeData: this.state.attributeData,
            priority: this.state.priority,
            department: this.state.department,
            comment: this.state.comment,
            createdBy: this.state.createdBy,
            parentFolderId: this.props.assignedFolder,
            recordId: this.props.assignedRecord,
            name: this.props.documentName,
            documentTypeId: this.props.selectedDocumentTypeId,
            base64Image: this.props.base64Image,
            fileType: fileTypes.IMAGE // EiDiA currently only supports uploading scanned images
        }
        UploadService.addAttributes(requestData).then((response) => {
            console.log(response)
        }).catch((e) => {
            this.setState({
                isServerError: true,
            });
            console.error(e);
        });
    }

    render() {
        let self = this
        let dateAlert = (
            <Alert severity="error" onClose={this.handleDateSnackbarClose}>
                No date was recognized, please try again!
            </Alert>
        );
        let numberAlert = (
            <Alert severity="error" onClose={this.handleNumberSnackbarClose}>
                No number was recognized, please try again!
            </Alert>
        );
        let dateSnackBar = (
            <Snackbar
                open={this.state.isDateSnackbarOpen}
                autoHideDuration={5000}
                onClose={this.handleDateSnackbarClose}>
                {dateAlert}
            </Snackbar>
        );
        let numberSnackBar = (
            <Snackbar
                open={this.state.isNumberSnackbarOpen}
                autoHideDuration={5000}
                onClose={this.handleNumberSnackbarClose}>
                {numberAlert}
            </Snackbar>
        );
        return ( // Render TextFields dynamically from state
            <RightSide>
                <Container>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="flex-start">
                        {this.state.attributes.map(function (item) {
                            if (item.dataType === 'text') {
                                return (
                                    <div key={item.id}>
                                        {self.renderTextFields(item.name, item.id)}
                                    </div>
                                );
                            } else if (item.dataType === 'number') {
                                return (
                                    <div key={item.id}>
                                        {self.renderNumberFields(item.name, item.id)}
                                    </div>
                                );
                            } else if (item.dataType === 'date') {
                                return (
                                    <div key={item.id}>
                                        {self.renderDateFields(item.name, item.id)}
                                    </div>
                                );
                            }
                        })}

                        <Grid item xs={12} align="center">
                            <Box mt={10}/>
                        </Grid>

                        <MetaData callbackAttributeContainer={this.getMetaData}/>

                        <Grid item xs={6} align="center" style={{marginTop: 100}}>
                            <Button variant="contained"
                                    color="primary">
                                Update Document Type
                            </Button>
                        </Grid>

                        <Grid item xs={6} align="center" style={{marginTop: 100}}>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={this.attrsToBackend}
                                    component={Link} to={'/record/' + this.props.assignedRecord}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    {dateSnackBar}
                    {numberSnackBar}
                    <ServerSideErrorSnackBar isError={this.state.isServerError}
                                             onClose={this.handleServerErrorBarClose}/>
                </Container>
            </RightSide>
        )
    }
}

export default AttributeContainer;
