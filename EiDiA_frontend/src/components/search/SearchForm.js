"use strict";

import React from 'react';
import {Tab, Tabs} from "@material-ui/core";
import BasicSearchForm from "./BasicSearchForm";
import AdvancedSearchForm from "./advancedSearch/AdvancedSearchForm";
import styled from "styled-components";
import CommonService from "../../services/CommonService";
import UserService from "../../services/UserService";
import RecordService from "../../services/RecordService";
import PropTypes from "prop-types";

const Background = styled.div`
    background-color: #EDEDED;
    height: 100%;
`;

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabValue: 0,
            documentTypes: [],
            attributeTypes: [],
            records: [],
            users: [],
        }

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        CommonService.getAllDocumentTypes().then((data) => {
            this.setState({
                documentTypes: [...data.documentTypes],
            });
        }).catch((e) => {
            console.error(e);
        });

        CommonService.getAllAttributeTypes().then((data) => {
            this.setState({
                attributeTypes: [...data.attributeTypes],
            });
        }).catch((e) => {
            console.error(e);
        });

        UserService.getAllUsernames().then((data) => {
            this.setState({
                users: [...data.users],
            });
        }).catch((e) => {
            console.error(e);
        });

        RecordService.getAllRecords().then((data) => {
            this.setState({
                records: [...data.records],
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    handleTabChange(event, newTabValue) {
        this.setState({
            tabValue: newTabValue
        });
    };

    render() {
        return (
            <Background>
                <Tabs
                    value={this.state.tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}>
                    <Tab label="Basic Search"/>
                    <Tab label="Advanced Search"/>
                </Tabs>
                {this.state.tabValue === 0 ?
                    <BasicSearchForm
                        records={this.state.records}
                        documentTypes={this.state.documentTypes}
                        users={this.state.users}
                        onSearch={this.props.onSearch}/> :
                    <AdvancedSearchForm
                        documentTypes={this.state.documentTypes}
                        attributeTypes={this.state.attributeTypes}
                        onSearch={this.props.onSearch}/>
                }
            </Background>
        );
    }
}

export default SearchForm;

SearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
}
