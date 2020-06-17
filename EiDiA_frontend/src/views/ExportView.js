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
        this.editorText = llorem["Template 0"];
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(this.editorText)),
            currentPage: "Select Template"
        };

        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.changeToEditTemplateView = this.changeToEditTemplateView.bind(this);
        this.onAction3_2 = this.onAction3_2.bind(this);
        this.docEditor = React.createRef();


        this.actionSet = {
            "Select Template": {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction3_1: this.changeToEditTemplateView,
                onAction3_2: this.onAction3_2
            },
            "Edit Template": {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction3_1: this.changeToEditTemplateView,
                onAction3_2: this.onAction3_2
            }
        }

        this.componentSet = {
            "Select Template": {
                comp1: "templateList",
                comp2: "docSearch",
                comp3: "exportSection"
            },
            "Edit Template": {
                comp1: "editorTools",
                comp2: "docSearch",
                comp3: "exportSection"
            }
        }
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

    changeToEditTemplateView(){
        var newState = this.state;
        newState.currentPage = "Edit Template";
        this.setState(newState);
    }

    onAction3_2(){
        console.log("cliked Button 2")
    }

    

    render() {
        const currentPage=this.state.currentPage;
        const editorState=this.state.editorState;
        const actionSet = this.actionSet[currentPage];
        const componentSet = this.componentSet[currentPage];
        return (
            <Page title={this.state.currentPage}>
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
                            comp1={componentSet.comp1}
                            comp2={componentSet.comp2}
                            comp3={componentSet.comp3}
                            onAction1_1={actionSet.onAction1_1}
                            onAction1_2={actionSet.onAction1_2}
                            onAction3_1={actionSet.onAction3_1}
                            onAction3_2={actionSet.onAction3_2}
                        />
                    </Column>
                </Row>
            </Page>
        );
    }
}
