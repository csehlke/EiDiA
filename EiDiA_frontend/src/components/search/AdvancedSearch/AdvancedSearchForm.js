"use strict";

import React from 'react';
import styled from "styled-components";
import SearchSummary from "./SearchSummary";
import SmartDropDownBox from "../../SmartDropDownBox";
import {Button} from "@material-ui/core";
import TextConstraintPicker from "./ConstraintPicker/TextConstraintPicker";
import NumberConstraintPicker from "./ConstraintPicker/NumberConstraintPicker";
import DateConstraintPicker from "./ConstraintPicker/DateConstraintPicker";

const Row = styled.div`
    display: flex;
`;

const Column = styled.div`
    flex: 33%;
`;

const Box = styled.div`
    margin-top: 1em;
    margin-bottom: 1em;
`;

export default class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            documentTypes: [
                {name: 'AA', id: '1'},
                {name: 'BB', id: '2'}],
            attributeTypesTmp: [
                {name: 'attributeText1', type: 'text', id: '1'},
                {name: 'attributeDate2', type: 'date', id: '2'},
                {name: 'attributeNumber3', type: 'number', id: '3'},
                {name: 'attributeText4', type: 'text', id: '4'},
            ],
            attributeTypes: [],
            documentTypeId: '',
            attribute: null,
            attributeTypeId: '',
            constraints: [],
        }

        this.documentTypeRef = React.createRef();
        this.attributeTypeRef = React.createRef();
        this.constraintPickerRef = React.createRef();

        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.handleAttributeTypeChange = this.handleAttributeTypeChange.bind(this);
        this.handleAddConstraint = this.handleAddConstraint.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleDocumentTypeChange(event, value) {
        const id = (value === null) ? '' : value.id;
        const name = (value === null) ? '' : value.name;

        // TODO set Attributes depending on documentTypeId
        let attributeTypes = this.state.attributeTypesTmp.map((attribute) => this.createAttributes(attribute, name));

        this.setState({
            documentTypeId: id,
            attributeTypes: attributeTypes,
        });
        this.attributeTypeRef.current.reset();
        this.constraintPickerRef.current.reset();
    }

    // Hilfmethode wird ersetzt mit Zuordnung: AttributeTypes to selected DocumentType
    createAttributes(attribute, name) {
        return {
            name: name + ' ' + attribute.name,
            id: attribute.id,
            type: attribute.type,
        }
    }

    handleAttributeTypeChange(event, value) {
        const id = (value === null) ? '' : value.id;
        this.setState({
            attribute: value,
            attributeTypeId: id,
        });
        this.constraintPickerRef.current.reset();
    }

    handleAddConstraint() {
        const newConstraint = {
            documentTypeId: this.state.documentTypeId,
            attributeTypeId: this.state.attributeTypeId,
            constraint: this.constraintPickerRef.current.getConstraint(),
        };
        const constraints = [...this.state.constraints, newConstraint];
        this.setState({
            constraints: constraints,
        })
    }

    handleReset() {
        this.documentTypeRef.current.reset();
        this.attributeTypeRef.current.reset();
        this.constraintPickerRef.current.reset();
        this.setState({
            documentTypeId: '',
            attribute: null,
            attributeTypeId: '',
        });
    }

    handleSearch() {
        console.log("here the advanced search is triggered");
    }

    render() {
        return (
            <Box>
                <Row>
                    <Column>
                        <Row>
                            <SmartDropDownBox
                                ref={this.documentTypeRef}
                                onChange={this.handleDocumentTypeChange}
                                options={this.state.documentTypes}
                                label='Document Type'/>
                        </Row>
                        <Row>
                            <SmartDropDownBox
                                ref={this.attributeTypeRef}
                                disabled={this.state.documentTypeId === ''}
                                onChange={this.handleAttributeTypeChange}
                                options={this.state.attributeTypes}
                                label='Attribute'/>
                        </Row>
                    </Column>
                    <Column>
                        <Row>
                            {this.state.attribute === null ?
                                <TextConstraintPicker
                                    ref={this.constraintPickerRef}
                                    disabled={true}/> :
                                this.state.attribute.type === 'text' ?
                                    <TextConstraintPicker
                                        ref={this.constraintPickerRef}/> :
                                    this.state.attribute.type === 'number' ?
                                        <NumberConstraintPicker
                                            ref={this.constraintPickerRef}/> :
                                        this.state.attribute.type === 'date' ?
                                            <DateConstraintPicker
                                                ref={this.constraintPickerRef}/> :
                                            <TextConstraintPicker
                                                ref={this.constraintPickerRef}
                                                disabled={true}/>
                            }
                        </Row>
                        <Row>
                            <Button
                                variant="contained"
                                color="default"
                                size={"medium"}
                                fullWidth
                                onClick={this.handleAddConstraint}
                                style={{margin: '0.5em'}}>
                                Add Constraint
                            </Button>
                        </Row>
                        <Row>
                            <Button
                                variant="contained"
                                color="primary"
                                size={"medium"}
                                onClick={this.handleReset}
                                style={{width: '50%', margin: '0.5em'}}>
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size={"medium"}
                                onClick={this.handleSearch}
                                style={{width: '50%', margin: '0.5em'}}>
                                Search
                            </Button>
                        </Row>
                    </Column>
                    <Column>
                        <SearchSummary/>
                    </Column>
                </Row>
            </Box>
        );
    }
}
