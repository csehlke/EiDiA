"use strict";

import React from 'react';
import styled from "styled-components";
import {Button, TextField} from "@material-ui/core";
import SmartDropDownBox from "../SmartDropDownBox";
import DatePicker from "./DatePicker";
import PropTypes from "prop-types";

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

class BasicSearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recordId: '',
            documentTypeId: '',
            dateFrom: null,
            dateTo: null,
            fullText: '',
            username: '',
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
        const id = (value === null) ? '' : value.id;
        this.setState({
            recordId: id,
        });
    }

    handleDocumentTypeChange(event, value) {
        const id = (value === null) ? '' : value.id;
        this.setState({
            documentTypeId: id,
        });
    }

    handleDateFromChange(event) {
        this.setState({
            dateFrom: event,
        });
    }

    handleDateToChange(event) {
        this.setState({
            dateTo: event,
        });
    }

    handleFullTextChange(event) {
        this.setState({
            fullText: event.target.value,
        });
    }

    handleUserChange(event, value) {
        const username = (value === null) ? '' : value.username;
        this.setState({
            username: username,
        });
    }

    handleReset() {
        this.setState({
            recordId: '',
            documentTypeId: '',
            dateFrom: null,
            dateTo: null,
            fullText: '',
            username: '',
        });
        this.recordRef.current.reset();
        this.documentTypeRef.current.reset();
        this.userRef.current.reset();
    }

    handleSearch() {
        this.props.onSearch({
            type: 'basic',
            values: {
                recordId: this.state.recordId !== '' ? this.state.recordId : null,
                documentTypeId: this.state.documentTypeId !== '' ? this.state.documentTypeId : null,
                dateFrom: this.state.dateFrom,
                dateTo: this.state.dateTo,
                fullText: this.state.fullText !== '' ? this.state.fullText : null,
                username: this.state.username !== '' ? this.state.username : null,
            }
        });
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
                                options={this.props.records}
                                label='Record'/>
                        </Row>
                        <Row>
                            <SmartDropDownBox
                                ref={this.documentTypeRef}
                                onChange={this.handleDocumentTypeChange}
                                options={this.props.documentTypes}
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
                                size={"small"}
                                value={this.state.fullText}
                                onChange={this.handleFullTextChange}
                                variant="outlined"/>
                        </Row>
                        <Row>
                            <SmartDropDownBox
                                ref={this.userRef}
                                onChange={this.handleUserChange}
                                options={this.props.users}
                                label='User'/>
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
                </Row>
            </Box>
        );
    }
}

export default BasicSearchForm;

BasicSearchForm.propTypes = {
    records: PropTypes.array.isRequired,
    documentTypes: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
}
