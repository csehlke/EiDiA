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
        }

        this.documentTypeRef = React.createRef();

        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.createNewDocumentType = this.createNewDocumentType.bind(this);
        this.nextView = this.nextView.bind(this);
    }

    handleDocumentTypeChange(event, value) {
        this.setState({
            documentTypeId: value.id
        });
    }

    createNewDocumentType() {
        console.log("Create New Document Type Here")
        //TODO Add Document Types
    }

    nextView() {
        console.log(this.state.documentTypeId)
        //TODO Add Document Types
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
                                ref={this.documentTypeRef}
                                onChange={this.handleDocumentTypeChange}
                                options={this.state.documentTypes}
                                label='Document Type'/>
                        </DropDownContainer>
                    </Grid>

                    <Grid item xs={12} align="center">
                        <Box mt={16}/>
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
                            onClick={this.nextView}

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
