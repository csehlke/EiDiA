"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import SearchResults from "../components/search/SearchResults";
import SearchForm from "../components/search/SearchForm";
import SearchService from "../services/SearchService";
import {ServerSideErrorSnackBar} from "../components/ServerSideErrorSnackBar";

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

        this.state = {
            table: [],
            isServerError: false,
        }

        this.onSearch = this.onSearch.bind(this);
        this.handleServerErrorBarClose = this.handleServerErrorBarClose.bind(this);
    }

    componentDidMount() {
        this.props.setTitle("Intelligent Search");
    }

    onSearch(search) {
        switch (search.type) {
            case 'basic':
                SearchService.getBasicSearchResult(search.searchConstraints).then((data) => {
                    this.setState({
                        table: [...data.table],
                    });
                }).catch((e) => {
                    this.setState({
                        isServerError: true,
                    });
                    console.error(e);
                });
                break;
            case 'advanced':
                SearchService.getAdvancedSearchResult(search.searchConstraints).then((data) => {
                    this.setState({
                        table: [...data.table],
                    });
                }).catch((e) => {
                    this.setState({
                        isServerError: true,
                    });
                    console.error(e);
                });
                break;
            default:
        }
    }

    handleServerErrorBarClose() {
        this.setState({
            isServerError: false,
        })
    }

    render() {
        return (
            <Page>
                <Search>
                    <SearchForm onSearch={this.onSearch}/>
                </Search>
                <Result>
                    <SearchResults table={this.state.table}/>
                </Result>
                <ServerSideErrorSnackBar isError={this.state.isServerError} onClose={this.handleServerErrorBarClose}/>
            </Page>
        );
    }
}
