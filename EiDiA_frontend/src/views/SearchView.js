"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import SearchResults from "../components/search/SearchResults";
import SearchForm from "../components/search/SearchForm";

const Result = styled.div`
    width: 100%;
`;

const Search = styled.div`
    height: 20em;
    width: 100%;
`;

export class SearchView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setTitle("Intelligent Search");
    }

    render() {
        return (
            <Page title={this.props.title}>
                <Search>
                    <SearchForm/>
                </Search>
                <Result>
                    <SearchResults/>
                </Result>
            </Page>
        );
    }
}
