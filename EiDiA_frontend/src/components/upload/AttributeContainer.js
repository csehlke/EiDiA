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


const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-grow: 1; //For Splitview
    flex-basis: 50%;
    flex-direction: column;
`;


class AttributeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            attributes: [
                {name: 'Attr1', type: 'text', id: '1'},
                {name: 'Attr2', type: 'date', id: '2'},
                {name: 'Attr3', type: 'number', id: '3'},
                {name: 'Attr4', type: 'date', id: '4'},
                {name: 'Attr5', type: 'text', id: '5'},
                {name: 'Attr6', type: 'number', id: '6'},
                {name: 'Attr7', type: 'text', id: '7'},
                {name: 'Attr8', type: 'text', id: '8'},
                {name: 'Attr9', type: 'date', id: '9'},
                {name: 'Attr10', type: 'number', id: '10'}
            ],
            attributeData: [
                {}
            ],
            metaData: [{}],
            textValue: "",
            isDateSnackbarOpen: false,
            isNumberSnackbarOpen: false
        }

        this.saveTextFieldData = this.saveTextFieldData.bind(this);
        this.saveDateFieldData = this.saveDateFieldData.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
        this.renderTextFields = this.renderTextFields.bind(this);
        this.renderDateFields = this.renderDateFields.bind(this);
        this.getMetaData = this.getMetaData.bind(this);
        this.handleDateSnackbarClose = this.handleDateSnackbarClose.bind(this);
        this.handleNumberSnackbarClose = this.handleNumberSnackbarClose.bind(this);
    }

    componentDidMount() {
        this.props.setTitle("Attribute Picker");

        UploadService.listAttributes(this.props.selectedDocumentTypeId).then((data) => {
            console.log(data)
        }).catch((e) => {
            console.error(e);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.crop !== this.props.crop) { //When new crop gets added
            (async () => {
                const {data: {text}} = await this.props.ocrWorker.recognize(this.props.crop); //Do OCR on crop
                console.log(text);
                this.setState({
                    textValue: text
                });
            })();
        }
    }

    getMetaData(data) { //Get data from MetaData-component
        let copyArr = this.state.metaData
        copyArr.splice(0, 1, {priority: data[0], department: data[1], comment: data[2]})
        this.setState({
            metaData: copyArr
        });
    }

    saveTextFieldData(attrID) {
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID))
        if (idx === -1) { //If ID doesn't exist yet, add it
            this.setState({
                attributeData: [...this.state.attributeData, {id: attrID, text: this.state.textValue}]
            });
        } else {
            copyArr.splice(idx, 1, {id: attrID, text: this.state.textValue}) //If ID exists already, overwrite it with new value
            this.setState({
                attributeData: copyArr
            });
        }
    }

    saveDateFieldData(attrID) {
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID))
        let data = this.state.textValue
        if (!isNaN(Date.parse(data))) { //IF OCR String is date, convert to datatype 'Date'
            let convDate = data.split("/");
            let dateObject = new Date(+convDate[2], convDate[1] - 1, +convDate[0]); //Convert to dd/MM/YYYY

            if (idx === -1) { //If ID doesn't exist yet, add it
                this.setState({
                    attributeData: [...this.state.attributeData, {id: attrID, text: dateObject}]
                });
            } else {
                copyArr.splice(idx, 1, {id: attrID, text: dateObject}) //If ID exists already, overwrite it with new value
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
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID))
        if (!isNaN(Number(this.state.textValue))) {
            if (idx === -1) { //If ID doesn't exist yet, add it
                this.setState({
                    attributeData: [...this.state.attributeData, {id: attrID, text: this.state.textValue}]
                });
            } else {
                copyArr.splice(idx, 1, {id: attrID, text: this.state.textValue}) //If ID exists already, overwrite it with new value
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
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID)) //find index of ID
        if (idx !== -1) {
            return Object.values(this.state.attributeData)[idx].text; // Get text at index
        } else {
            return "";
        }
    }

    handleTextFieldOnChange(event, attrID) { //Updates attributeData based on user input
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID))

        if (idx === -1) { //If ID doesn't exist yet, add it
            this.setState({
                attributeData: [...this.state.attributeData, {id: attrID, text: event.target.value}]
            });
        } else {
            copyArr.splice(idx, 1, {id: attrID, text: event.target.value}) //Overwrite with new value
            this.setState({
                attributeData: copyArr
            });
        }
    }

    handleOnDateChange(date, value, attrID) { //Updates attributeData based on user input
        let copyArr = this.state.attributeData
        let idx = (this.state.attributeData.findIndex(element => element.id === attrID))

        if (idx === -1) { //If ID doesn't exist yet, add it
            this.setState({
                attributeData: [...this.state.attributeData, {id: attrID, text: date}]
            });
        } else {
            copyArr.splice(idx, 1, {id: attrID, text: date}) //Overwrite with new value
            this.setState({
                attributeData: copyArr
            });
        }
    }

    sendFulltextToBackend() { //TODO Send to Backend (OCR IS VERY SLOW) --> Do it on backend?
        const worker = createWorker({
            logger: m => console.log(m)
        });

        (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const {data: {text}} = await worker.recognize(this.props.picture[0]);
            console.log(text);
            await worker.terminate();
        })();
    }

    renderTextFields(attrName, attrID) {
        return <Grid item xs style={{padding: 10}}>
            <TextField
                label={attrName}
                variant="outlined"
                value={this.getFieldValue(attrID)}
                onChange={(evt) => this.handleTextFieldOnChange(evt, attrID)}
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
                onChange={(evt) => this.handleTextFieldOnChange(evt, attrID)}
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
            <Container>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-end">
                    {this.state.attributes.map(function (item) {
                        if (item.type === 'text') {
                            return (
                                <div key={item.id}>
                                    {self.renderTextFields(item.name, item.id)}
                                </div>
                            );
                        } else if (item.type === 'number') {
                            return (
                                <div key={item.id}>
                                    {self.renderNumberFields(item.name, item.id)}
                                </div>
                            );
                        } else if (item.type === 'date') {
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
                                color="primary">
                            Save
                        </Button>
                    </Grid>
                </Grid>
                {dateSnackBar}
                {numberSnackBar}
            </Container>
        )
    }
}

export default AttributeContainer;
