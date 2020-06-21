"use strict";

import React from 'react';
import {Tab, Tabs} from "@material-ui/core";
import BasicSearchForm from "./BasicSearchForm";
import AdvancedSearchForm from "./advancedSearch/AdvancedSearchForm";
import styled from "styled-components";

const Background = styled.div`
    background-color: #EDEDED;
    height: 100%;
`;

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            documentTypes: [
                {name: 'AA', id: '1'},
                {name: 'BB', id: '2'}],
            attributeTypes: [
                {name: 'attributeText1', type: 'text', id: '1'},
                {name: 'attributeDate2', type: 'date', id: '2'},
                {name: 'attributeNumber3', type: 'number', id: '3'},
                {name: 'attributeText4', type: 'text', id: '4'},
            ],
            records: [
                {name: 'BMW', id: '1'},
                {name: 'TUM', id: '2'}],
            users: [
                {name: 'user1', username: 'username1'},
                {name: 'user2', username: 'username2'},
            ],
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // TODO get Data from Backend
    }

    handleChange(event, newValue) {
        this.setState({
            value: newValue
        });
    };

    render() {
        return (
            <Background>
                <Tabs
                    value={this.state.value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}>
                    <Tab label="Basic Search"/>
                    <Tab label="Advanced Search"/>
                </Tabs>
                {this.state.value === 0 ?
                    <BasicSearchForm
                        records={this.state.records}
                        documentTypes={this.state.documentTypes}
                        users={this.state.users}/> :
                    <AdvancedSearchForm
                        documentTypes={this.state.documentTypes}
                        attributeTypes={this.state.attributeTypes}/>
                }
            </Background>
        );
    }
}

export default SearchForm;
