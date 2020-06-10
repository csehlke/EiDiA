"use strict";

import React from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";

import SmartDropDownBox from "../SmartDropDownBox";

const Container = styled.div
    // Outer Container
    `
    flex-grow: 1; //For Splitview
    flex-basis: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;



const Row = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
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
    }

    handleDocumentTypeChange(event, value) {
        this.setState({
            documentTypeId: value.id
        });
    }

    createNewDocumentType(){
        console.log("Create New Document Type Here")
        //TODO Add Document Types
    }

    nextView(){
        console.log("Open next View here")
        //TODO Add Document Types
    }

    render() {
        return (
            <Container>
                <Row>
                    <SmartDropDownBox
                        ref={this.documentTypeRef}
                        onChange={this.handleDocumentTypeChange}
                        options={this.state.documentTypes}
                        label='Document Type'/>
                </Row>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.createNewDocumentType}
                    style={{
                        display: "flex",
                        width: "20%",
                        margin: "0.5em",
                        justifyContent: "center",
                    }}
                >
                    Create new Document Type
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.nextView}
                    style={{
                        display: "flex",
                        width: "20%",
                        margin: "0.5em",
                        justifyContent: "center",
                    }}
                >
                    Next
                </Button>

            </Container>
        )
    }

}

export default TypePicker
