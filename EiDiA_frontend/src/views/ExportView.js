"use strict";

import React from 'react';
import Page from "../components/Page";
import DocEditor from "../components/ExportView/Subcomponents/DocEditor";
import RightSidepanel from "../components/ExportView/RightSidepanel";
import {RichUtils, EditorState, ContentState} from 'draft-js';
import FloatingWindows from '../components/ExportView/FloatingWindow';
import {Row, Column, documentMockData, llorem} from '../support files/constants';
import {convertToRaw} from 'draft-js';
import { FormatListNumbered } from '@material-ui/icons';

function Dialog(props) {
    if (props.currentPage == "Select Template") {
        return <div />
    }
    return (
        <FloatingWindows 
            open={props.open}
            onClose={props.onClose}
            save={props.saveTemplate}
            currentPage={props.currentPage}
            selectedDocs={props.selectedDocs}
            download={props.download}
        />);
}


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
            variables: [],
            selectedDocs: [],
            selectedVariable: "",
        };

        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.changeView = this.changeView.bind(this);
        this.setSelectedVariable = this.setSelectedVariable.bind(this);
        this.selectTemplate = this.selectTemplate.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.extractVariables = this.extractVariables.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.addToList = this.addToList.bind(this);
        this.mapValues = this.mapValues.bind(this);
        this.extractTextFromEditorState = this.extractTextFromEditorState.bind(this);
        this.downloadDocument = this.downloadDocument.bind(this);
        this.setValueToVariable = this.setValueToVariable.bind(this);

        this.docEditor = React.createRef();

        this.actionSet = {
            "Select Template": {
                onAction1_1: this.selectTemplate,
                onAction1_2: this.toggleBlockType,
                onAction2_2: this.addToList,
                onAction3_1: this.changeView,
                onAction3_2: this.setSelectedVariable
            },
            "Edit Template": {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction3_1: this.toggleDialog,
                onAction3_2: this.setSelectedVariable
            },
            "Edit": {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction2_2: this.addToList,
                onAction3_1: this.toggleDialog,
                onAction3_2: this.setSelectedVariable,
                onAction3_3: this.setValueToVariable
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
            },
            "Edit": {
                comp1: "editorTools",
                comp2: "docSearch",
                comp3: "setValueSection"
            }
        }
    }

    fetchDocumentData() {
        const selectedDocs = this.props.selectedDocs;
        const documentData = documentMockData;
        return documentData;
    }

    setValueToVariable(value) {
        var newState = this.state;
        var editorText = this.extractTextFromEditorState(newState.editorState);
        editorText = editorText.replace(this.state.selectedVariable, value);
        this.editorText = editorText;
        newState.editorState = EditorState.createWithContent(ContentState.createFromText(this.editorText));
        this.setState(newState);
    }

    mapValues() {
        const variables = this.state.variables;
        const documentData = documentMockData;
        var newState = this.state;
        var editorText = this.extractTextFromEditorState(newState.editorState);
        for (var i = 0; i < variables.length; i++) {
            const variable = variables[i];
            if (this.isURI(variable)) {
                editorText = editorText.replace(variable, documentData[variable]);
            }
        }
        this.editorText = editorText;
        newState.editorState = EditorState.createWithContent(ContentState.createFromText(this.editorText));
        this.setState(newState);
    }

    isURI(variable) {
        // TODO: Check if variable is a URI
        if (variable == "$VARIABLE1") {
            return true;
        }
        return false;
    }

    toggleDialog() {
        var newState = this.state;
        newState.open = !newState.open;
        this.setState(newState);
    }

    addToList(element) {
        var newState = this.state;
        if (!newState.selectedDocs.includes(element)) {
            newState.selectedDocs.push(element);
            this.setState(newState);
        }
    }

    selectTemplate(value){
        this.editorText = llorem[value] || this.editorText;
        var newState = this.state;
        newState.editorState = EditorState.createWithContent(ContentState.createFromText(this.editorText));
        newState.selectedTemplate = value;
        newState.variables = this.extractVariables(newState.editorState);
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
        var tmp_set = new Set(newState.variables);
        var new_set = new Set(this.extractVariables(editorState));
        var final_set = new Set([...tmp_set, ...new_set]);
        newState.variables = Array.from(final_set);
        console.log(final_set);
        this.setState(newState);
    }

    extractTextFromEditorState(editorState) {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        return value;
    }

    extractVariables(editorState) {
        const value = this.extractTextFromEditorState(editorState);
        const arr = value.split(" ");
        var arr2 = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][0] == "$") {
                arr2.push(arr[i]);
            }
        }
        return arr2;
    }

    changeView(page) {
        var newState = this.state;
        newState.currentPage = page;
        this.setState(newState);
        if (page == "Edit") {
            this.mapValues();
        }
    }

    setSelectedVariable(event){
        var newState = this.state;
        newState.selectedVariable = event.target.value;
        this.setState(newState);
    }

    saveTemplate() {
        var newState = this.state;
        newState.open = false;
        newState.currentPage = "Select Template";
        this.setState(newState);
    }


    downloadDocument() {
        let editorText = this.extractTextFromEditorState(this.state.editorState);
        let pdfMakeObject = {
            content: editorText.split("\n")
        };
        console.log(pdfMakeObject);
    }


    render() {
        const currentPage=this.state.currentPage;
        const editorState=this.state.editorState;
        const actionSet = this.actionSet[currentPage];
        const componentSet = this.componentSet[currentPage];
        return (
            <div>
            <Page title={this.state.currentPage} changeView={this.changeView}>
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
                            onAction1_1={actionSet.onAction1_1 || null}
                            onAction1_2={actionSet.onAction1_2 || null}
                            onAction2_2={actionSet.onAction2_2 || null}
                            onAction3_1={actionSet.onAction3_1 || null}
                            onAction3_2={actionSet.onAction3_2 || null}
                            onAction3_3={actionSet.onAction3_3 || null}
                            editorState={this.state.editorState}
                            variables={this.state.variables}
                            selectedDocs={this.state.selectedDocs}
                            selectedVariable={this.state.selectedVariable}
                        />
                    </Column>
                </Row>
            </Page>
            <Dialog 
                open={this.state.open} 
                onClose={this.toggleDialog} 
                save={this.saveTemplate} 
                currentPage={this.state.currentPage}
                selectedDocs={this.state.selectedDocs}
                download={this.downloadDocument}    
            />
            </div>
        );
    }
}
