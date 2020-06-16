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
        this.onAction3_1 = this.onAction3_1.bind(this);
        this.onAction3_2 = this.onAction3_2.bind(this);
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


    onAction3_1(){
        console.log("cliked Button 1")
    }

    onAction3_2(){
        console.log("cliked Button 2")
    }

    render() {
        const editorState=this.state.editorState;
        return (
            <Page title={"Select Template"}>
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
                            comp1={"editorTools"}
                            comp2={"docSearch"}
                            comp3={"exportSection"}
                            onAction1_1={this.toggleInlineStyle}
                            onAction1_2={this.toggleBlockType}
                            onAction3_1={this.onAction3_1}
                            onAction3_2={this.onAction3_2}
                        />
                    </Column>
                </Row>
            </Page>
        );
    }
}
