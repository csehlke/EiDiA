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
            userId: '',
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
        this.isFormEmpty = this.isFormEmpty.bind(this);
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
        const userId = (value === null) ? '' : value.id;
        this.setState({
            userId: userId,
        });
    }

    handleReset() {
        this.setState({
            recordId: '',
            documentTypeId: '',
            dateFrom: null,
            dateTo: null,
            fullText: '',
            userId: '',
        });
        this.recordRef.current.reset();
        this.documentTypeRef.current.reset();
        this.userRef.current.reset();
    }

    handleSearch() {
        const searchConstraints = {};
        if (this.state.recordId !== '') {
            searchConstraints['recordId'] = this.state.recordId;
        }
        if (this.state.documentTypeId !== '') {
            searchConstraints['documentTypeId'] = this.state.documentTypeId;
        }
        if (this.state.dateFrom !== null) {
            searchConstraints['dateFrom'] = this.state.dateFrom;
        }
        if (this.state.dateTo !== null) {
            searchConstraints['dateTo'] = this.state.dateTo;
        }
        if (this.state.fullText !== '') {
            searchConstraints['fullText'] = this.state.fullText;
        }
        if (this.state.userId !== '') {
            searchConstraints['userId'] = this.state.userId;
        }
        this.props.onSearch({
            type: 'basic',
            searchConstraints: searchConstraints,
        });
    }

    isFormEmpty() {
        return this.state.recordId === '' &&
            this.state.documentTypeId === '' &&
            this.state.dateFrom === null &&
            this.state.dateTo === null &&
            this.state.fullText === '' &&
            this.state.userId === ''
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
                                disabled={this.isFormEmpty()}
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
