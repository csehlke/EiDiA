"use strict";

import React from 'react';
import Page from "../components/Page";
import styled from "styled-components";
import DocPreview from "../components/upload/DocPreview";
import AttributeContainer from "../components/upload/AttributeContainer";


const SplitView = styled.div` 
    display: flex;
    flex-direction:row;
`;

export class AttributeView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page title={"Attribute Picker"}>
                <SplitView>
                    <DocPreview />
                    <AttributeContainer />
                </SplitView>
            </Page>
        );
    }
}