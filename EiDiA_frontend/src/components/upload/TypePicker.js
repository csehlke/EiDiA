"use strict";

import React from 'react';
import styled from "styled-components";


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
            </Container>
        )
    }

}

export default TypePicker
