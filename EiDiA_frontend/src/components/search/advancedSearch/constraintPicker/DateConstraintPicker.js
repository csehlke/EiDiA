"use strict";

import React from 'react';
import styled from "styled-components";
import SmartDropDownBox from "../../../SmartDropDownBox";
import DatePicker from "../../DatePicker";
import CompareTypes from "../../../../assets/CompareTypes";
import {format} from 'date-fns'
import PropTypes from "prop-types";


const Row = styled.div`
    display: flex;
    width: 100%;
`;

const Column = styled.div`
    flex: 33%;
`;

export default class DateConstraintPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            constraintType: null,
            numberOfFields: 1,
            constraintTypeId: '',
            date1: null,
            date2: null,

            constraintTypes: [],
            filled: false,
        }

        this.constraintTypeRef = React.createRef();

        this.handleConstraintTypeChange = this.handleConstraintTypeChange.bind(this);
        this.handleDate1Change = this.handleDate1Change.bind(this);
        this.handleDate2Change = this.handleDate2Change.bind(this);
        this.checkIfFilled = this.checkIfFilled.bind(this);
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
            value1: format(this.state.date1, 'dd/MM/yyyy'),
            value2: this.state.date2 ? format(this.state.date2, 'dd/MM/yyyy') : '',
        }
    }

    handleConstraintTypeChange(event, value) {
        this.setState({
            constraintType: value,
            constraintTypeId: value.id,
            numberOfFields: value.fields,
        });
    }

    handleDate1Change(event) {
        this.setState({
            date1: event,
        });
        this.checkIfFilled(event, this.state.date2);
    }

    handleDate2Change(event) {
        this.setState({
            date2: event,
        });
        this.checkIfFilled(this.state.date1, event);
    }

    checkIfFilled(date1, date2) {
        let filled;
        if (this.state.numberOfFields === 1) {
            filled = date1 !== null;
        } else {
            filled = date1 !== null && date2 !== null;
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
                    <DatePicker
                        disabled={this.props.disabled || this.state.constraintTypeId === ''}
                        onChange={this.handleDate1Change}
                        maxDate={this.state.date2}
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

DateConstraintPicker.propTypes = {
    disabled: PropTypes.bool,
    isFilled: PropTypes.func.isRequired,
}
