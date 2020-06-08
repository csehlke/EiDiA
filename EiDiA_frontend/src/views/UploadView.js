"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";

const SplitView = styled.div` 
    display: flex;
    flex-direction:row;
`;

export class UploadView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page title={"Upload Document"}>
                <SplitView>
                </SplitView>
            </Page>
        );
    }
}