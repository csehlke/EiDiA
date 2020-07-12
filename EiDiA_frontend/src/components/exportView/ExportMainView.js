import React from 'react';
import DocEditor from "./subcomponents/DocEditor";
import RightSidepanel from "./RightSidepanel";
import {ContentState, convertToRaw, EditorState, RichUtils} from 'draft-js';
import FloatingWindows from './FloatingWindow';
import {Column, documentMockData, llorem, Row} from '../../support files/constants';

function Dialog(props) {
    if (props.currentPage === "Select Template") {
        return <div/>
    }
    return (
        <FloatingWindows
            open={props.open}
            onClose={props.onClose}
            save={props.saveTemplate}
            currentPage={props.currentPage}
            selectedDocs={props.selectedDocs}
            download={props.download}
            editorState={props.editorState}
        />);
}


function fetchDocumentData() {
    return documentMockData;
}

function isPath(string) {
    return /^(?:\/|[a-z]+:\/\/)/.test(string);
}

const components = {
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

export default class ExportMainView extends React.Component {
    constructor(props) {
        super(props);
        this.editorText = llorem["Template 0"];

        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(this.editorText)),
            textAlignment: "left",
            selectedTemplate: null,
            open: false,
            variables: {},
            selectedDocs: [],
            selectedVariable: "",
        };

        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.setSelectedVariable = this.setSelectedVariable.bind(this);
        this.selectTemplate = this.selectTemplate.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.extractVariables = this.extractVariables.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.addToList = this.addToList.bind(this);
        this.mapValues = this.mapValues.bind(this);
        this.getTextFromEditorstate = this.getTextFromEditorstate.bind(this);
        this.downloadDocument = this.downloadDocument.bind(this);
        this.setValueToVariable = this.setValueToVariable.bind(this);

        this.docEditor = React.createRef();

        this.actionSet = {
            "Select Template": {
                onAction1_1: this.selectTemplate,
                onAction1_2: this.toggleBlockType,
                onAction2_2: this.addToList,
                onAction3_1: this.props.changeView,
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
    }

    // Set Value to variable manually (not from document)
    setValueToVariable(value) {
        let newState = this.state;

        let variableState = newState.variables;
        let index = variableState[newState.selectedVariable]["index"];
        variableState[newState.selectedVariable]["value"] = value;
        variableState[newState.selectedVariable]["source"] = value;
        newState.variables = variableState;

        let editorText = this.setValuesToText(index, value, newState.editorState);
        newState.editorState = EditorState.createWithContent(ContentState.createFromText(editorText));

        this.setState(newState);
    }

    // Replace positions of given variable with new value
    setValuesToText(indices, newValue, editorState) {
        let editorText = this.getTextFromEditorstate(editorState);
        const tmp_arr = editorText.split(" ");
        for (let i of indices) {
            const toReplace = tmp_arr[i];
            editorText = editorText.replace(toReplace, newValue);
        }
        return editorText;
    }


    // matches given data from document with variables in document text
    mapValues() {
        var selectedDocs = this.state.selectedDocs;

        if (selectedDocs.length !== 0) {
            const documents = fetchDocumentData(this.state.selectedDocs);
            var newState = this.state;
            var variables = this.state.variables;
            var documentData = []
            selectedDocs.forEach((name) => {
                if (name in documents) documentData.push(documents[name])
            });
            var editorText = this.getTextFromEditorstate(newState.editorState);

            for (let k of Object.keys(variables)) {
                if (isPath(k.slice(1))) {
                    let tmp = k.split("/");
                    let variable = tmp[tmp.length - 1];
                    let tmp2 = tmp[tmp.length - 2];
                    let documentIndex = parseInt(tmp2[tmp2.length - 1]) - 1;
                    let indices = variables[k]["index"];
                    let value = documentData[documentIndex][variable];

                    // update current value and value source of that variable for state
                    variables[k]["value"] = value;
                    variables[k]["source"] = "\/" + selectedDocs[documentIndex] + "\/" + variable;
                    editorText = this.setValuesToText(indices, value, newState.editorState)
                }
            }
            newState.editorState = EditorState.createWithContent(ContentState.createFromText(editorText));
            newState.variables = variables;

            this.setState(newState);
        }
    }


    toggleDialog() {
        let newState = this.state;
        newState.open = !newState.open;
        this.setState(newState);
    }

    addToList(element) {
        let newState = this.state;
        if (!newState.selectedDocs.includes(element)) {
            newState.selectedDocs.push(element);
            this.setState(newState);
        }

        if (this.props.currentPage === "Edit") {
            this.mapValues();
        }
    }

    // replaces document text with text from template
    // collects all variables of the template
    selectTemplate(value) {
        this.editorText = llorem[value] || this.editorText;
        let newState = this.state;

        newState.editorState = EditorState.createWithContent(ContentState.createFromText(this.editorText));
        newState.selectedTemplate = value;
        newState.variables = this.extractVariables(newState.editorState);
        this.setState(newState);
    }

    toggleInlineStyle(style) {
        const inlineStyle = style.toUpperCase();
        let newState = this.state;

        newState.editorState = RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        this.setState(newState);
        this.docEditor.focusEditor();
    }

    toggleBlockType(align) {
        let newState = this.state;

        newState.editorState = RichUtils.toggleBlockType(this.state.editorState, align);
        newState.textAlignment = align;
        this.setState(newState);
    }


    // update function for editor when usere give input to the editor
    // scans for new variables entered by user when in "Edit Templatepage"
    onChange(editorState) {
        let newState = this.state;
        newState.editorState = editorState;
        if (this.props.currentPage === "Edit Template") {
            newState.variables = this.scanForNewVariables(newState.variables, editorState);
        }

        this.setState(newState);
    }

    // Scans editorText for new Variables and returns object of updated variable state
    scanForNewVariables(currVariables, editorState) {
        let newVariables = this.extractVariables(editorState);
        let newVariableState = {}
        for (let k of Object.keys(newVariables)) {
            if (k in currVariables) {
                let indices = new Set(currVariables[k]["index"].concat(newVariables[k]["index"])); // remove duplicate indices
                indices = Array.from(indices);

                newVariableState[k] = {
                    index: indices,
                    value: currVariables[k]["value"],
                    source: currVariables[k]["source"]
                };
            } else {
                newVariableState[k] = newVariables[k];
            }
        }
        return newVariableState;
    }


    getTextFromEditorstate(editorState) {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        return blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    }

    // Collects variables from document text as it is
    // return objects with index and set value and variable as key
    extractVariables(editorState) {
        const value = this.getTextFromEditorstate(editorState);
        const arr = value.split(" ");
        let varObject = {}
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] === "$") {
                if (arr[i] in varObject) {
                    varObject[arr[i]]["index"].push(i);
                } else {
                    varObject[arr[i]] = {
                        index: [i],
                        value: "",
                        source: ""
                    }
                }
            }
        }
        return varObject;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentPage !== prevProps.currentPage) {
            if (this.props.currentPage === "Edit") this.mapValues();
        }
    }

    //Edit View:  User chose variable to manually assign value
    setSelectedVariable(event) {
        let newState = this.state;
        newState.selectedVariable = event.target.value;
        this.setState(newState);
    }

    saveTemplate() {
        // TODO: Let User save template
        console.log("save Template");
        let newState = this.state;
        newState.open = false;
        this.setState(newState);
    }


    downloadDocument() {
        // TODO: Let User download created and linked documents
    }


    render() {
        const currentPage = this.props.currentPage
        const editorState = this.state.editorState;
        const actionSet = this.actionSet[currentPage];
        const componentSet = components[currentPage];
        return (
            <div>
                <Row>
                    <Column>
                    </Column>
                    <Column>
                        <DocEditor
                            readOnly={this.props.readOnly}
                            textAlignment={this.state.textAlignment}
                            ref={(docEditor) => {
                                this.docEditor = docEditor
                            }}
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
                <Dialog
                    open={this.state.open}
                    onClose={this.toggleDialog}
                    save={this.saveTemplate}
                    currentPage={this.props.currentPage}
                    selectedDocs={this.state.selectedDocs}
                    download={this.downloadDocument}
                    editorState={this.state.editorState}
                />
            </div>
        );
    }
}
