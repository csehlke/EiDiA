"use strict";

import React from 'react';
import Page from "../components/Page";
import DocEditor from "../components/ExportView/DocEditor";
import RightSidepanel from "../components/ExportView/RightSidepanel";
import {RichUtils, EditorState, ContentState} from 'draft-js';
import {llorem} from '../support files/constants';
import FloatingWindows from '../components/ExportView/FloatingWindow';
import {Row, Column} from '../support files/constants';
import {convertToRaw} from 'draft-js';

export class ExportView extends React.Component {

    constructor(props) {
        super(props);
        this.editorText = llorem["Template0"];
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(this.editorText)),
            textAlignment: "left",
            currentPage: "Select Template",
            selectedTemplate: null,
            seen: true,
            open: false,
            variables: []
        };

        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.changeToEditTemplateView = this.changeToEditTemplateView.bind(this);
        this.onAction3_2 = this.onAction3_2.bind(this);
        this.selectTemplate = this.selectTemplate.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.extractVariables = this.extractVariables.bind(this);

        this.docEditor = React.createRef();

        this.actionSet = {
            "Select Template": {
                onAction1_1: this.selectTemplate,
                onAction1_2: this.toggleBlockType,
                onAction3_1: this.changeToEditTemplateView,
                onAction3_2: this.onAction3_2
            },
            "Edit Template": {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction3_1: this.toggleDialog,
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
                comp2: "variableList",
                comp3: "saveTemplateSection"
            }
        }
    }

    toggleDialog() {
        var newState = this.state;
        newState.open = !newState.open;
        this.setState(newState);
    }

    selectTemplate(value){
        this.editorText = llorem[value] || this.editorText;
        var newState = this.state;
        newState.editorState = EditorState.createWithContent(ContentState.createFromText(this.editorText));
        newState.selectedTemplate = value;
        this.setState(newState);
    }

    toggleInlineStyle(style) {
        const inlineStyle = style.toUpperCase();
        var newState = this.state;
        newState.editorState = RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        this.setState(newState);
        this.docEditor.focusEditor();
    }

    toggleBlockType(align) {
        var newState = this.state;
        newState.editorState = RichUtils.toggleBlockType(this.state.editorState, align);
        newState.textAlignment = align;
        this.setState(newState);
    }
    
    onChange(editorState) {
        var newState = this.state;
        newState.editorState = editorState;
        newState.variables = this.extractVariables(editorState);
        this.setState(newState);
    }

    extractVariables(editorState) {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        const arr = value.split(" ");
        var arr2 = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][0] == "$") {
                arr2.push(arr[i]);
            }
        }
        return arr2;
    }


    changeToEditTemplateView() {
        var newState = this.state;
        newState.currentPage = "Edit Template";
        this.setState(newState);
    }

    onAction3_2(){
        console.log("clicked Button 2")
    }

    render() {
        const currentPage=this.state.currentPage;
        const editorState=this.state.editorState;
        const actionSet = this.actionSet[currentPage];
        const componentSet = this.componentSet[currentPage];
        return (
            <div>
            <Page title={this.state.currentPage}>
                <Row>
                    <Column>
                        Sidebar
                    </Column>
                    <Column>
                        <DocEditor 
                            textAlignment={this.state.textAlignment}
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
                            editorState={this.state.editorState}
                            variables={this.state.variables}
                        />
                    </Column>
                </Row>
            </Page>
            <FloatingWindows open={this.state.open} onClose={this.toggleDialog}/>
            </div>
        );
    }
}
