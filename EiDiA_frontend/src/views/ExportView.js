"use strict";

import React from 'react';
import Page from "../components/Page";
import DocEditor from "../components/DocEditor";
import {RightSidepanel} from "../components/RightSidepanel";
import styled from 'styled-components';


const Row = styled.div`
    display: flex;
`;

const Column = styled.div`
    flex: 50%;
`;

export class ExportView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page title={"Export"}>
                <Row>
                    <Column>
                        Sidebar
                    </Column>
                    <Column>
                        <DocEditor/>
                    </Column>
                    <Column>
                        <RightSidepanel/>
                    </Column>
                </Row>
            </Page>
        );
    }
}
