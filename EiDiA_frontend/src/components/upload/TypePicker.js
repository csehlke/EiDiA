"use strict";

import React from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import SmartDropDownBox from "../SmartDropDownBox";
import Box from "@material-ui/core/Box";

const Container = styled.div
    // Outer Container
    `
    display: flex;
    flex-direction: column;
    flex-grow: 1; //For Splitview
    flex-basis: 50%;
    justify-content: center;
`;


const DropDownContainer = styled.div
    //Set DropDown width
    `
    width: 30%
`;

class TypePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            documentTypes: [
                {name: 'type1', id: '1'},
                {name: 'type2', id: '2'}
            ],
            documentTypeId: '',
            buttonStatus: true, // true, if "next"-button is disabled
            autoCompleteStatus: false // true, if autoComplete has value
        }



        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.createNewDocumentType = this.createNewDocumentType.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.assignRecord = this.assignRecord.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.picUploaded !== this.props.picUploaded) {
            if (this.state.autoCompleteStatus && this.props.picUploaded) {
                this.setState({
                    buttonStatus: false
                });
            }
        }
    }


    handleDocumentTypeChange(event, value) {
        this.setState({
            documentTypeId: value.id,
        });


        if (this.props.picUploaded) { //Check if image has been uploaded yet
            this.setState({
                buttonStatus: false
            });
        } else {
            this.setState({
                autoCompleteStatus: true
            });
        }

    }

    createNewDocumentType() {
        console.log("Create New Document Type Here")
        //TODO Add Document Types
    }

    handleOnClick() {
        this.props.callbackUploadView(this.state.documentTypeId);
    }

    assignRecord() {
        console.log("Open FilePicker here (to assign to record)");
    }


    render() {
        return (
            <Container>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
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
                            onClick={this.createNewDocumentType}
                        >
                            Create new Document Type
                        </Button>
                    </Grid>
                    <Grid item xs={2} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.assignRecord}

                        >
                            Assign to Record
                        </Button>
                    </Grid>
                    <Grid item xs={2} align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={this.state.buttonStatus}
                            onClick={this.handleOnClick}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>

            </Container>
        )
    }

}

export default TypePicker
