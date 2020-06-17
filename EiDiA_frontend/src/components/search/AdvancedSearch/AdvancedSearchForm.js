"use strict";

import React from 'react';
import styled from "styled-components";
import SearchSummary from "./SearchSummary";
import SmartDropDownBox from "../../SmartDropDownBox";
import {Button} from "@material-ui/core";
import TextConstraintPicker from "./ConstraintPicker/TextConstraintPicker";
import NumberConstraintPicker from "./ConstraintPicker/NumberConstraintPicker";
import DateConstraintPicker from "./ConstraintPicker/DateConstraintPicker";
import CompareTypes from "../../../assets/CompareTypes";

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
            documentTypeConstraints: [
                {name: "constr1", documentTypeId: 0, attributeTypeConstraints: [
                        {name: "11", attributeTypeId: 0, constraint:{compareTypeId: 0}},
                        {name: "12", attributeTypeId: 0, constraint:{compareTypeId: 2}},
                        {name: "13", attributeTypeId: 0, constraint:{compareTypeId: 3}},
                    ]},
            ],
            filled: false,
        }

        this.documentTypeRef = React.createRef();
        this.attributeTypeRef = React.createRef();
        this.constraintPickerRef = React.createRef();

        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.handleAttributeTypeChange = this.handleAttributeTypeChange.bind(this);
        this.handleFilled = this.handleFilled.bind(this);
        this.handleAddConstraint = this.handleAddConstraint.bind(this);
        this.handleDeleteConstraint = this.handleDeleteConstraint.bind(this);
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
            attribute: null,
            attributeTypes: attributeTypes,
            filled: false,
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
            filled: false,
        });
        this.constraintPickerRef.current.reset();
    }

    handleFilled(value) {
        this.setState({
            filled: value,
        });
    }

    handleAddConstraint() {
        const constraint = this.constraintPickerRef.current.getConstraint();
        const compareType = CompareTypes.filter(value => value.id === constraint.compareTypeId)[0];
        const values = compareType.fields === 1 ? constraint.value1 : constraint.value1 + " and " + constraint.value2;
        const newAttributeConstraint = {
            name: this.state.attribute.name + " " + compareType.name + " " + values,
            documentTypeId: this.state.documentTypeId,
            attributeTypeId: this.state.attributeTypeId,
            constraint: constraint,
        };

        let needsNewDocumentTypeConstraint = true;
        let documentTypeConstraints = this.state.documentTypeConstraints.map(documentTypeConstraint => {
            if (documentTypeConstraint.documentTypeId === newAttributeConstraint.documentTypeId) {
                let needsNewAttributeConstraint = true;
                let attributeTypeConstraints = value.attributeTypeConstraints.map(attributeTypeConstraint => {
                    if (attributeTypeConstraint.attributeTypeId === newAttributeConstraint.attributeTypeId &&
                        attributeTypeConstraint.constraint.compareTypeId === newAttributeConstraint.constraint.compareTypeId) {
                        // TODO show error
                        // There exists already a constraint with the same DocumentType, AttributeType and CompareType
                        needsNewAttributeConstraint = false;
                    }
                    return attributeTypeConstraint;
                });
                if (needsNewAttributeConstraint) {
                    // new AttributeConstraint is added to list in DocumentConstraint
                    attributeTypeConstraints = [...attributeTypeConstraints, newAttributeConstraint];
                }
                needsNewDocumentTypeConstraint = false;
                return {
                    name: documentTypeConstraint.name,
                    documentTypeId: documentTypeConstraint.documentTypeId,
                    attributeTypeConstraints: attributeTypeConstraints,
                };
            } else {
                return documentTypeConstraint;
            }
        });

        if (needsNewDocumentTypeConstraint) {
            // needs to add DocumentType Row as well
            const documentType = this.state.documentTypes.filter(documentType0 =>
                documentType0.id === newAttributeConstraint.documentTypeId)[0];
            const newDocumentTypeConstraint = {
                name: documentType.name,
                id: documentType.id,
                attributeTypeConstraints: [
                    newAttributeConstraint,
                ],
            };
            documentTypeConstraints = [...documentTypeConstraints, newDocumentTypeConstraint];
        }

        this.setState({
            documentTypeConstraints: documentTypeConstraints,
        });
    }

    handleDeleteConstraint(element) {
        const documentTypeId = element.documentTypeId;
        const attributeTypeId = element.attributeTypeId;
        const compareTypeId = element.constraint.compareTypeId;

        let documentTypeConstraints = this.state.documentTypeConstraints.map(value => {
            if (value.documentTypeId === documentTypeId) {
                value.attributeTypeConstraints = value.attributeTypeConstraints.map(value1 => {
                    if (value1.attributeTypeId === attributeTypeId && value1.constraint.compareTypeId === compareTypeId) {
                        return;
                    } else {
                        return value1;
                    }
                })
                if (value.attributeTypeConstraints.length === 0) {
                    return;
                } else {
                    return value;
                }
            } else {
                return value;
            }
        });
        this.setState({
            documentTypeConstraints: documentTypeConstraints,
        });
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
                                    isFilled={this.handleFilled}
                                    disabled={true}/> :
                                this.state.attribute.type === 'text' ?
                                    <TextConstraintPicker
                                        ref={this.constraintPickerRef}
                                        isFilled={this.handleFilled}/> :
                                    this.state.attribute.type === 'number' ?
                                        <NumberConstraintPicker
                                            ref={this.constraintPickerRef}
                                            isFilled={this.handleFilled}/> :
                                        this.state.attribute.type === 'date' ?
                                            <DateConstraintPicker
                                                ref={this.constraintPickerRef}
                                                isFilled={this.handleFilled}/> :
                                            <TextConstraintPicker
                                                ref={this.constraintPickerRef}
                                                isFilled={this.handleFilled}
                                                disabled={true}/>
                            }
                        </Row>
                        <Row>
                            <Button
                                variant="contained"
                                color="default"
                                size={"medium"}
                                fullWidth
                                disabled={!this.state.filled}
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
                        <SearchSummary documentTypeConstraints={this.state.documentTypeConstraints} handleDelete={this.handleDeleteConstraint}/>
                    </Column>
                </Row>
            </Box>
        );
    }
}
