"use strict";

import React from 'react';
import styled from "styled-components";
import SmartDropDownBox from "../../../SmartDropDownBox";
import DatePicker from "../../DatePicker";
import CompareTypes from "../../../../assets/CompareTypes";


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
            date1: null,
            date2: null,

            constraintTypes: [],
        }

        this.constraintTypeRef = React.createRef();

        this.handleConstraintTypeChange = this.handleConstraintTypeChange.bind(this);
        this.handleDate1Change = this.handleDate1Change.bind(this);
        this.handleDate2Change = this.handleDate2Change.bind(this);
    }

    componentDidMount() {
        const options = CompareTypes.filter((type) => type.type === 'date');
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
            date1: null,
            date2: null,
        });
    }

    getConstraint() {
        return {
            compareTypeId: this.state.constraintTypeId,
            value1: this.state.date1,
            value2: this.state.date2,
        }
    }

    handleConstraintTypeChange(event, value) {
        this.setState({
            constraintType: value,
            constraintTypeId: value.id,
            numberOfFields: value.fields,
        });
    }

    handleDate1Change(event, value) {
        this.setState({
            date1: value
        });
    }

    handleDate2Change(event, value) {
        this.setState({
            date2: value
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
                    <DatePicker
                        disabled={this.props.disabled || this.state.constraintTypeId === ''}
                        onChange={this.handleDate1Change}
                        minDate={this.state.date2}
                        value={this.state.date1}
                        label={this.state.numberOfFields === 1 ? "Value" : "From"}/>
                    {this.state.numberOfFields === 2 ?
                        <DatePicker
                            disabled={this.props.disabled || this.state.constraintTypeId === ''}
                            onChange={this.handleDate2Change}
                            minDate={this.state.date1}
                            value={this.state.date2}
                            label={"To"}/> : ""}
                </Row>
            </Column>
        );
    }
}
