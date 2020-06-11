"use strict";

import React from 'react';
import CompareTypes from "../../../../assets/CompareTypes";
import SmartDropDownBox from "../../../SmartDropDownBox";
import {TextField} from "@material-ui/core";
import styled from "styled-components";

const Row = styled.div`
    display: flex;
    width: 100%;
`;

const Column = styled.div`
    flex: 33%;
`;

export default class ConstraintPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            constraintType: null,
            numberOfFields: 1,
            constraintTypeId: '',
            value1: '',
            value2: '',

            constraintTypes: [],
        }

        this.constraintTypeRef = React.createRef();

        this.handleConstraintTypeChange = this.handleConstraintTypeChange.bind(this);
        this.handleValue1Change = this.handleValue1Change.bind(this);
        this.handleValue2Change = this.handleValue2Change.bind(this);
    }

    componentDidMount() {
        const options = CompareTypes.filter((type) => type.type === 'number');
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
            value1: '',
            value2: '',
        });
    }

    getConstraint() {
        return {
            compareTypeId: this.state.constraintTypeId,
            value1: this.state.value1,
            value2: this.state.value2,
        }
    }

    handleConstraintTypeChange(event, value) {
        this.setState({
            constraintType: value,
            constraintTypeId: value.id,
            numberOfFields: value.fields,
        });
    }

    handleValue1Change(event) {
        const value = event.target.value.replace(new RegExp("\\D"), "");
        this.setState({
            value1: event.target.value
        });
    }

    handleValue2Change(event) {
        const value = event.target.value.replace(new RegExp("\\D"), "");
        this.setState({
            value2: value
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
                        value={this.state.value1}
                        onChange={this.handleValue1Change}
                        variant="outlined"/>
                    {this.state.numberOfFields === 2 ?
                        <TextField
                            disabled={this.props.disabled || this.state.constraintTypeId === ''}
                            id="full-text"
                            label={"To"}
                            style={{margin: '0.5em'}}
                            fullWidth
                            size={"small"}
                            value={this.state.value2}
                            onChange={this.handleValue2Change}
                            variant="outlined"/> : ""}
                </Row>
            </Column>
        );
    }
}
