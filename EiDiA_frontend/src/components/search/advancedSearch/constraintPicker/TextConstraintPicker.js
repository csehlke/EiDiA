"use strict";

import React from 'react';
import SmartDropDownBox from "../../../SmartDropDownBox";
import {TextField} from "@material-ui/core";
import styled from "styled-components";
import CompareTypes from "../../../../assets/CompareTypes";
import PropTypes from "prop-types";

const Row = styled.div`
    display: flex;
    width: 100%;
`;

const Column = styled.div`
    flex: 33%;
`;

export default class TextConstraintPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            constraintType: null,
            numberOfFields: 1,
            constraintTypeId: '',
            field1: '',
            field2: '',

            constraintTypes: [],
            filled: false,
        }

        this.constraintTypeRef = React.createRef();

        this.reset = this.reset.bind(this);
        this.handleConstraintTypeChange = this.handleConstraintTypeChange.bind(this);
        this.handleField1Change = this.handleField1Change.bind(this);
        this.handleField2Change = this.handleField2Change.bind(this);
        this.checkIfFilled = this.checkIfFilled.bind(this);
    }

    componentDidMount() {
        const options = CompareTypes.filter((type) => type.type === 'text');
        this.setState({
            constraintTypes: options,
        });
    }

    reset() {
        this.constraintTypeRef.current.reset();
        this.setState({
            constraintType: null,
            numberOfFields: 1,
            constraintTypeId: '',
            field1: '',
            field2: '',
        });
    }

    getConstraint() {
        return {
            compareTypeId: this.state.constraintTypeId,
            value1: this.state.field1,
            value2: this.state.field2,
        };
    }

    handleConstraintTypeChange(event, value) {
        this.setState({
            constraintType: value,
            constraintTypeId: value.id,
            numberOfFields: value.fields,
        });
    }

    handleField1Change(event) {
        this.setState({
            field1: event.target.value,
        });
        this.checkIfFilled(event.target.value, this.state.field2);
    }

    handleField2Change(event) {
        this.setState({
            field2: event.target.value,
        });
        this.checkIfFilled(this.state.field1, event.target.value);
    }

    checkIfFilled(value1, value2) {
        let filled;
        if (this.state.numberOfFields === 1) {
            filled = value1 !== '';
        } else {
            filled = value1 !== '' && value2 !== '';
        }
        this.props.isFilled(filled);
        this.setState({
            filled: filled,
        });
    }

    render() {
        return (
            <Column>
                <Row>
                    <SmartDropDownBox
                        disabled={this.props.disabled ? this.props.disabled : false}
                        ref={this.constraintTypeRef}
                        onChange={this.handleConstraintTypeChange}
                        options={this.state.constraintTypes}
                        label='Restriction'/>
                </Row>
                <Row>
                    <TextField
                        disabled={this.props.disabled || this.state.constraintTypeId === ''}
                        id="full-text"
                        label={this.state.numberOfFields === 1 ? "Value" : "From"}
                        style={{margin: '0.5em'}}
                        fullWidth
                        size={"small"}
                        value={this.state.field1}
                        onChange={this.handleField1Change}
                        variant="outlined"/>
                    {this.state.numberOfFields === 2 ?
                        <TextField
                            disabled={this.props.disabled || this.state.constraintTypeId === ''}
                            id="full-text"
                            label={"To"}
                            style={{margin: '0.5em'}}
                            fullWidth
                            size={"small"}
                            value={this.state.field2}
                            onChange={this.handleField2Change}
                            variant="outlined"/> : ""}
                </Row>
            </Column>
        );
    }
}

TextConstraintPicker.propTypes = {
    disabled: PropTypes.bool,
    isFilled: PropTypes.func.isRequired,
}
