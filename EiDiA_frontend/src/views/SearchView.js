"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import SearchResults from "../components/search/SearchResults";
import SearchForm from "../components/search/SearchForm";

const HalfScreen = styled.div`
    height: 40vh; // TODO set to 50% but fix height
    width: 100%;
`;

export class SearchView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page title={"Intelligent Search"}>
                <HalfScreen>
                    <SearchForm/>
                </HalfScreen>
                <HalfScreen>
                    <SearchResults/>
                </HalfScreen>
            </Page>
        );
    }
}
