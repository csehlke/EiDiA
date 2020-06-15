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
        this.onChange = this.onChange.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.docEditor = React.createRef();
    }

    toggleInlineStyle(style) {
        const inlineStyle = style.toUpperCase();
        this.setState({
          ["editorState"]: RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        })
        this.docEditor.focusEditor();
    }

    toggleBlockType(align) {
        this.setState({
            ["editorState"]: RichUtils.toggleBlockType(this.state.editorState, align)
        });
        this.docEditor.focusEditor();
    }

    onChange(editorState) {
        this.setState({["editorState"]: editorState})
    }

    render() {
        const editorState=this.state.editorState;
        return (
            <Page title={"Export"}>
                <Row>
                    <Column>
                        Sidebar
                    </Column>
                    <Column>
                        <DocEditor 
                            ref={(docEditor) => {this.docEditor = docEditor}}
                            editorState={editorState}
                            onChange={this.onChange}
                        />
                    </Column>
                    <Column>
                        <RightSidepanel 
                            onToggleInlineStyle={this.toggleInlineStyle}
                            onToggleBlockType={this.toggleBlockType}
                        />
                    </Column>
                </Row>
            </Page>
        );
    }
}
