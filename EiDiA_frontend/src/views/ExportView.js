"use strict";

import React from 'react';
import Page from "../components/Page";
import DocEditor from "../components/ExportView/DocEditor";
import RightSidepanel from "../components/ExportView/RightSidepanel";
import styled from 'styled-components';
import {RichUtils, EditorState, ContentState} from 'draft-js';
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
        };
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    }

    toggleInlineStyle(style) {
        console.log(style)
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
                        <RightSidepanel onToggleInlineStyle={style => this.toggleInlineStyle(style)}/>
                    </Column>
                </Row>
            </Page>
        );
    }
}
