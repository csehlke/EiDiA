"use strict";

import React from 'react';
import styled from "styled-components";
import {Button, TextField} from "@material-ui/core";
import SmartDropDownBox from "../SmartDropDownBox";
import DatePicker from "./DatePicker";

const Row = styled.div`
    display: flex;
`;

const Column = styled.div`
    flex: 50%;
`;

class BasicSearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            records: [
                {name: 'BMW', id: '1'},
                {name: 'TUM', id: '2'}],
            documentTypes: [
                {name: 'type1', id: '1'},
                {name: 'type2', id: '2'}],
            users: [
                {name: 'user1', username: 'username1'},
                {name: 'user2', username: 'username2'}
            ],
            record: '',
            documentType: '',
            dateFrom: null,
            dateTo: null,
            fullText: '',
            user: ''
        }

        this.handleRecordChange = this.handleRecordChange.bind(this);
        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.handleDateFromChange = this.handleDateFromChange.bind(this);
        this.handleDateToChange = this.handleDateToChange.bind(this);
        this.handleFullTextChange = this.handleFullTextChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleRecordChange(event, value) {
        this.setState({
            record: value
        });
    }

    handleDocumentTypeChange(event, value) {
        this.setState({
            documentType: value
        });
    }

    handleDateFromChange(event, value) {
        this.setState({
            dateFrom: value
        })
    }

    handleDateToChange(event, value) {
        this.setState({
            dateTo: value
        })
    }

    handleFullTextChange(event, value) {
        this.setState({
            fullText: value
        });
    }

    handleUserChange(event, value) {
        this.setState({
            user: value
        });
    }

    handleReset() {
        this.setState({
            record: '',
            documentType: '',
            dateFrom: null,
            dateTo: null,
            fullText: '',
            user: ''
        });
    }

    handleSearch() {
        console.log("here the basic search is triggered");
    }

    render() {
        return (
            <Row>
                <Column>
                    <Row>
                        <SmartDropDownBox
                            onChange={this.handleRecordChange}
                            options={this.state.records}
                            value={this.state.record}
                            label='Record'/>
                    </Row>
                    <Row>
                        <SmartDropDownBox
                            onChange={this.handleDocumentTypeChange}
                            options={this.state.documentTypes}
                            value={this.state.documentType}
                            label='Document Type'/>
                    </Row>
                    <Row>
                        <DatePicker
                            onChange={this.handleDateFromChange}
                            maxDate={this.state.dateTo}
                            value={this.state.dateFrom}
                            label="After"/>
                        &nbsp;-&nbsp;
                        <DatePicker
                            onChange={this.handleDateToChange}
                            minDate={this.state.dateFrom}
                            value={this.state.dateTo}
                            label="Before"/>
                    </Row>
                </Column>
                <Column>
                    <Row>
                        <TextField
                            id="full-text"
                            label="Full Text"
                            style={{margin: '0.5em'}}
                            fullWidth
                            value={this.state.fullText}
                            onChange={this.handleFullTextChange}
                            variant="outlined"/>
                    </Row>
                    <Row>
                        <SmartDropDownBox
                            onChange={this.handleUserChange}
                            options={this.state.users}
                            value={this.state.user}
                            label='User'/>
                    </Row>
                    <Row>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleReset}
                            style={{width: '50%', margin: '0.5em'}}>
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSearch}
                            style={{width: '50%', margin: '0.5em'}}>
                            Search
                        </Button>
                    </Row>
                </Column>
            </Row>
        );
    }
}

export default BasicSearchForm;
