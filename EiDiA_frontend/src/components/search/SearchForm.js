"use strict";

import React from 'react';
import {Tab, Tabs} from "@material-ui/core";
import BasicSearchForm from "./BasicSearchForm";
import AdvancedSearchForm from "./AdvancedSearch/AdvancedSearchForm";
import styled from "styled-components";

function Form(props) {
    const isBasic = props.isBasic;
    if (isBasic) {
        return <BasicSearchForm/>
    }
    return <AdvancedSearchForm/>
}

const Background = styled.div`
    background-color: #EDEDED;
    height: 100%;
`;

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 1, // todo revert to 0
        }

        this.handleChange = this.handleChange.bind(this);
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
                <Form isBasic={this.state.value === 0}/>
            </Background>
        );
    }
}

export default SearchForm;
