"use strict";

import React from 'react';
import Page from "../components/Page";
import DocEditor from "../components/ExportView/DocEditor";
import RightSidepanel from "../components/ExportView/RightSidepanel";
import styled from 'styled-components';
import {Editor, EditorState, ContentState} from 'draft-js';
import {llorem} from '../support files/constants';

const Row = styled.div`
    display: flex;
`;

const Column = styled.div`
    flex: 50%;
`;

export class ExportView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(llorem)),
            fontSize: 12
        };
    }

    render() {
        const editorState=this.state;
        return (
            <Page title={"Export"}>
                <Row>
                    <Column>
                        Sidebar
                    </Column>
                    <Column>
                        <DocEditor editorState={editorState}/>
                    </Column>
                    <Column>
                        <RightSidepanel/>
                    </Column>
                </Row>
            </Page>
        );
    }
}
