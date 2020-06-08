"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import FileDrop from "../components/upload/FileDrop";
import TypePicker from "../components/upload/TypePicker";

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
                    <FileDrop />
                    <TypePicker />
                </SplitView>
            </Page>
        );
    }
}