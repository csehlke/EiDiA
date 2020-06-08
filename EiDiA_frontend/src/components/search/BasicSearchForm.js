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

const Box = styled.div`
    margin-top: 1em;
    margin-bottom: 1em;
`;

// TODO fetch options for drop downs
// TODO send search request

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
            recordId: '',
            documentTypeId: '',
            dateFrom: null,
            dateTo: null,
            fullText: '',
            username: ''
        }

        this.recordRef = React.createRef();
        this.documentTypeRef = React.createRef();
        this.userRef = React.createRef();

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
            recordId: value.id
        });
    }

    handleDocumentTypeChange(event, value) {
        this.setState({
            documentTypeId: value.id
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

    handleFullTextChange(event) {
        this.setState({
            fullText: event.target.value
        });
    }

    handleUserChange(event, value) {
        this.setState({
            username: value.username
        });
    }

    handleReset() {
        this.setState({
            recordId: '',
            documentTypeId: '',
            dateFrom: null,
            dateTo: null,
            fullText: '',
            username: ''
        });
        this.recordRef.current.reset();
        this.documentTypeRef.current.reset();
        this.userRef.current.reset();
    }

    handleSearch() {
        console.log("here the basic search is triggered");
    }

    render() {
        return (
            <Box>
                <Row>
                    <Column>
                        <Row>
                            <SmartDropDownBox
                                ref={this.recordRef}
                                onChange={this.handleRecordChange}
                                options={this.state.records}
                                label='Record'/>
                        </Row>
                        <Row>
                            <SmartDropDownBox
                                ref={this.documentTypeRef}
                                onChange={this.handleDocumentTypeChange}
                                options={this.state.documentTypes}
                                label='Document Type'/>
                        </Row>
                        <Row>
                            <DatePicker
                                onChange={this.handleDateFromChange}
                                maxDate={this.state.dateTo}
                                value={this.state.dateFrom}
                                label="After"/>
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
                                ref={this.userRef}
                                onChange={this.handleUserChange}
                                options={this.state.users}
                                label='User'/>
                        </Row>
                        <Row>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleReset}
                                style={{width: '50%', margin: '1em 0.5em'}}>
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size={"large"}
                                onClick={this.handleSearch}
                                style={{width: '50%', margin: '1em 0.5em'}}>
                                Search
                            </Button>
                        </Row>
                    </Column>
                </Row>
            </Box>
        );
    }
}

export default BasicSearchForm;
