"use strict";

import React from 'react';
import styled from "styled-components";
import SearchSummary from "./SearchSummary";
import SmartDropDownBox from "../../SmartDropDownBox";
import {Button} from "@material-ui/core";
import TextConstraintPicker from "./constraintPicker/TextConstraintPicker";
import NumberConstraintPicker from "./constraintPicker/NumberConstraintPicker";
import DateConstraintPicker from "./constraintPicker/DateConstraintPicker";
import CompareTypes from "../../../assets/CompareTypes";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

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
            attributeTypes: [],
            documentTypeId: '',
            attribute: null,
            attributeTypeId: '',
            documentTypeConstraints: [
                // { // Examples
                //     name: "AA",
                //     documentTypeId: "1",
                //     attributeTypeConstraints: [
                //         {
                //             name: "AA attributeText1 is equal to eee",
                //             documentTypeId: "1",
                //             attributeTypeId: "1",
                //             constraint: {compareTypeId: 101, value1: "eee", value2: ""},
                //         },
                //         {
                //             name: "AA attributeText1 ends with eee",
                //             documentTypeId: "1",
                //             attributeTypeId: "1",
                //             constraint: {compareTypeId:103, value1: "eee", value2: ""},
                //         },
                //     ],
                // },
            ],
            isFormFilled: false,
            isErrorBarOpen: false,
        };

        this.documentTypeRef = React.createRef();
        this.attributeTypeRef = React.createRef();
        this.constraintPickerRef = React.createRef();

        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.handleAttributeTypeChange = this.handleAttributeTypeChange.bind(this);
        this.handleIsFormFilled = this.handleIsFormFilled.bind(this);
        this.handleAddConstraint = this.handleAddConstraint.bind(this);
        this.handleDeleteConstraint = this.handleDeleteConstraint.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleErrorBarClose = this.handleErrorBarClose.bind(this);
    }

    handleDocumentTypeChange(event, value) {
        const id = (value === null) ? '' : value.id;

        // filter for the right AttributeTypes for this DocumentType
        let attributeTypes = this.props.attributeTypes.filter((attribute) =>
            attribute.documentTypeId === id);

        this.setState({
            documentTypeId: id,
            attribute: null,
            attributeTypes: attributeTypes,
            isFormFilled: false,
        });
        this.attributeTypeRef.current.reset();
        this.constraintPickerRef.current.reset();
    }

    handleAttributeTypeChange(event, value) {
        const id = (value === null) ? '' : value.id;
        this.setState({
            attribute: value,
            attributeTypeId: id,
            isFormFilled: false,
        });
        this.constraintPickerRef.current.reset();
    }

    handleIsFormFilled(value) {
        this.setState({
            isFormFilled: value,
        });
    }

    handleAddConstraint() {
        const constraint = this.constraintPickerRef.current.getConstraint();
        const compareType = CompareTypes.filter(value => value.id === constraint.compareTypeId)[0];
        const values = compareType.fields === 1 ? constraint.value1 : constraint.value1 + " and " + constraint.value2;
        // create new attributeConstraint to add to the list
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
                let attributeTypeConstraints = documentTypeConstraint.attributeTypeConstraints.map(attributeTypeConstraint => {
                    if (attributeTypeConstraint.attributeTypeId === newAttributeConstraint.attributeTypeId &&
                        attributeTypeConstraint.constraint.compareTypeId === newAttributeConstraint.constraint.compareTypeId) {
                        // There exists already a constraint with the same DocumentType, AttributeType and CompareType
                        this.setState({
                            isErrorBarOpen: true,
                        })
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
            const documentType = this.props.documentTypes.filter(documentType0 =>
                documentType0.id === newAttributeConstraint.documentTypeId)[0];
            const newDocumentTypeConstraint = {
                name: documentType.name,
                documentTypeId: documentType.id,
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

        let documentTypeConstraints = this.state.documentTypeConstraints.filter(documentTypeConstraint => {
            if (documentTypeConstraint.documentTypeId === documentTypeId) {
                documentTypeConstraint.attributeTypeConstraints = documentTypeConstraint.attributeTypeConstraints.filter(attributeTypeConstraint => {
                    if (attributeTypeConstraint.attributeTypeId === attributeTypeId &&
                        attributeTypeConstraint.constraint.compareTypeId === compareTypeId) {
                        // remove constraint identified by documentTypeId, attributeTypeId and compareTypeId
                        // <nop>
                    } else {
                        return attributeTypeConstraint;
                    }
                });
                if (documentTypeConstraint.attributeTypeConstraints.length === 0) {
                    // remove document type from list, if there are no constraints left
                    // <nop>
                } else {
                    return documentTypeConstraint;
                }
            } else {
                return documentTypeConstraint;
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
        this.props.onSearch({
            type: 'advanced',
            values: this.state.documentTypeConstraints,
        });
    }

    handleErrorBarClose() {
        this.setState({
            isErrorBarOpen: false,
        });
    }

    render() {
        return (
            <div>
                <Box>
                    <Row>
                        <Column>
                            <Row>
                                <SmartDropDownBox
                                    ref={this.documentTypeRef}
                                    onChange={this.handleDocumentTypeChange}
                                    options={this.props.documentTypes}
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
                                        isFilled={this.handleIsFormFilled}
                                        disabled={true}/> :
                                    this.state.attribute.dataType === 'text' ?
                                        <TextConstraintPicker
                                            ref={this.constraintPickerRef}
                                            isFilled={this.handleIsFormFilled}/> :
                                        this.state.attribute.dataType === 'number' ?
                                            <NumberConstraintPicker
                                                ref={this.constraintPickerRef}
                                                isFilled={this.handleIsFormFilled}/> :
                                            this.state.attribute.dataType === 'date' ?
                                                <DateConstraintPicker
                                                    ref={this.constraintPickerRef}
                                                    isFilled={this.handleIsFormFilled}/> :
                                                <TextConstraintPicker
                                                    ref={this.constraintPickerRef}
                                                    isFilled={this.handleIsFormFilled}
                                                    disabled={true}/>
                                }
                            </Row>
                            <Row>
                                <Button
                                    variant="contained"
                                    color="default"
                                    size={"medium"}
                                    fullWidth
                                    disabled={!this.state.isFormFilled}
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
                            <SearchSummary
                                documentTypeConstraints={this.state.documentTypeConstraints}
                                handleDelete={this.handleDeleteConstraint}/>
                        </Column>
                    </Row>
                </Box>

                <Snackbar
                    open={this.state.isErrorBarOpen}
                    autoHideDuration={5000}
                    onClose={this.handleErrorBarClose}>
                    <Alert severity="error" onClose={this.handleErrorBarClose}>
                        There is already a search constraint with contradicting attributes present.<br/>
                        Please remove this search constraint before adding the current one.
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

AdvancedSearchForm.propTypes = {
    documentTypes: PropTypes.array.isRequired,
    attributeTypes: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
}
