import React from 'react';
import DocEditor from "./subcomponents/DocEditor";
import RightSidepanel from "./RightSidepanel";
import {ContentState, convertToRaw, EditorState, RichUtils} from 'draft-js';
import FloatingWindows from './FloatingWindow';
import {Column, endpoints, pageNames, Row} from '../../support files/constants';
import EditorTools from './subcomponents/EditorTools';
import DocSearch from './subcomponents/DocSearch';
import ExportSection from './subcomponents/ExportSection';
import TemplateList from './subcomponents/TemplateList';
import SaveTemplateSection from './subcomponents/SaveTemplateSection';
import VariableList from './subcomponents/VariableList';
import SetValueSection from './subcomponents/SetValueSection';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import HttpService from "../../services/HttpService";


pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Dialog(props) {
    return (
        <React.Fragment>
            {props.currentPage === pageNames.selectTemplate ? "" : <FloatingWindows
                showDialog={props.showDialog}
                onClose={props.onClose}
                save={props.save}
                currentPage={props.currentPage}
                selectedDocs={props.selectedDocs}
                download={props.download}
                editorState={props.editorState}
            />}
        </React.Fragment>
    )
}

// Checks if string/variable is URI, e.g. Document1/VARIABLE1
const isPath = (string) => {
    return /^(?:\/|[a-z]+:\/\/)/.test(string);
}

// pass to RightSidePanel, so the right components are rendered according to currentPage
const subComponents = {
    [pageNames.selectTemplate]: {
        comp1: TemplateList,
        comp2: DocSearch,
        comp3: ExportSection
    },
    [pageNames.editTemplate]: {
        comp1: EditorTools,
        comp2: VariableList,
        comp3: SaveTemplateSection
    },
    [pageNames.edit]: {
        comp2: DocSearch,
        comp3: SetValueSection
    }
}

export default class ExportMainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            textAlignment: "left",
            selectedTemplate: null, // e.g. "Template 1"
            showDialog: false,
            // e.g. { "$Document1/VARIABLE1": { index: [1], value: "Euro", source: "Document A/VARIABLE1
            //key: Variable name, index: position of variable in template, value: set value, source: source of value
            variables: {},
            selectedDocs: [], // e.g. ["Document A", "Document B"] --> array of documents selected for mapping values to variables
            selectedVariable: "", // e.g. $Variable1 --> necessary for manually assigning value to selected variable
        };

        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.setSelectedVariable = this.setSelectedVariable.bind(this);
        this.selectTemplate = this.selectTemplate.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.extractVariables = this.extractVariables.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.addSelectedDocumentToList = this.addSelectedDocumentToList.bind(this);
        this.mapDocumentsWithVariables = this.mapDocumentsWithVariables.bind(this);
        this.getTextFromEditorState = this.getTextFromEditorState.bind(this);
        this.downloadDocument = this.downloadDocument.bind(this);
        this.setValueToVariable = this.setValueToVariable.bind(this);

        // reference to document editor, allows access to focus() method (focus editor)
        // necessary for setting inline styles
        this.docEditor = React.createRef();

        // Methods specific for each subcomponent in RightSidePanel
        this.actionSet = {
            [pageNames.selectTemplate]: {
                onAction1_1: this.selectTemplate,
                onAction1_2: this.toggleBlockType,
                onAction2_1: this.addSelectedDocumentToList,
                onAction3_1: this.props.changeView,
                onAction3_2: this.setSelectedVariable,
                onAction3_3: null
            },
            [pageNames.editTemplate]: {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction2_1: null,
                onAction3_1: this.toggleDialog,
                onAction3_2: this.setSelectedVariable,
                onAction3_3: null
            },
            [pageNames.edit]: {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction2_1: this.addSelectedDocumentToList,
                onAction3_1: this.toggleDialog,
                onAction3_2: this.setSelectedVariable,
                onAction3_3: this.setValueToVariable
            }
        }
    }

    componentDidMount() {
        HttpService.get(endpoints.getTemplateList, (resp) => {
            let initTemplate = resp.response[0]
            this.selectTemplate(initTemplate.name, initTemplate.id);
        }, (err) => {
            console.log(err);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentPage !== prevProps.currentPage && this.props.currentPage === pageNames.edit) {
            this.mapDocumentsWithVariables();
        }
    }

    // Set Value to variable manually (not from document)
    setValueToVariable(value) {
        let newState = this.state;
        let variableState = newState.variables;
        let index = variableState[newState.selectedVariable].index;
        variableState[newState.selectedVariable].value = value;
        variableState[newState.selectedVariable].source = 'user';
        newState.variables = variableState;

        let editorText = this.setValuesToText(index, value, newState.editorState);
        newState.editorState = EditorState.createWithContent(ContentState.createFromText(editorText));

        this.setState(newState);
    }

    // Replace positions of given variable with new value
    setValuesToText(indices, newValue, editorState) {
        let editorText = this.getTextFromEditorState(editorState);
        const tmp_arr = editorText.split(/\s+/);
        for (let i of indices) {
            const toReplace = tmp_arr[i];
            editorText = editorText.replace(toReplace, newValue);
        }
        return editorText;
    }


    // matches given data from document with variables in document text
    mapDocumentsWithVariables() {
        let selectedDocs = this.state.selectedDocs;
        let selectedDocsIds = selectedDocs.map((docElem) => docElem.id)
        if (selectedDocs.length !== 0) {
            const param = JSON.stringify(selectedDocsIds);
            HttpService.get(endpoints.getDocs + param, (resp) => {
                const documents = resp.response;
                if (Object.keys(documents).length !== 0) {
                    let newState = this.state;
                    let templateVariables = this.state.variables;

                    // gather data of selected documents
                    let documentData = selectedDocsIds.map((docName) => {
                        if (docName in documents) return documents[docName];
                    });
                    let editorText = this.getTextFromEditorState(newState.editorState);

                    for (let k of Object.keys(templateVariables)) {
                        if (isPath(k.slice(1))) { // find variables that depend on documents
                            // Get index for correct document, e.g. $/Document1/Variable1 --> index = 1 -1 = 0
                            let variableTokens = k.split("/");
                            let docVariable = variableTokens[variableTokens.length - 1];
                            let indexString = variableTokens[variableTokens.length - 2];
                            let documentIndex = parseInt(indexString[indexString.length - 1]) - 1;

                            let indices = templateVariables[k].index;
                            let docValue = documentData[documentIndex][docVariable];

                            // update current value and value source of that variable for state
                            templateVariables[k].value = docValue;
                            templateVariables[k].source = "\/" + selectedDocs[documentIndex].name + "\/" + docVariable;
                            editorText = this.setValuesToText(indices, docValue, newState.editorState)
                        }
                    }
                    newState.editorState = EditorState.createWithContent(ContentState.createFromText(editorText));
                    newState.variables = templateVariables;

                    this.setState(newState);
                }
            }, (err) => {
                console.log(err);
            })
        }
    }


    toggleDialog() {
        let newState = this.state;
        newState.showDialog = !newState.showDialog;
        this.setState(newState);
    }

    addSelectedDocumentToList(docItem) {
        let newState = this.state;
        let isInArray = false;
        newState.selectedDocs.forEach((e) => {
            if (e.id === docItem.id) isInArray = true
        });
        if (!isInArray) {
            newState.selectedDocs.push(docItem);
            this.setState(newState);
        }

        if (this.props.currentPage === pageNames.edit) {
            this.mapDocumentsWithVariables();
        }
    }

    // replaces document text with text from template
    // collects all variables of the template
    selectTemplate(name, id) {
        HttpService.get(endpoints.getTemplate + id, (resp) => {
            let editorText = resp.response;
            let newState = this.state;

            newState.editorState = EditorState.createWithContent(ContentState.createFromText(editorText));
            newState.selectedTemplate = name;
            newState.variables = this.extractVariables(newState.editorState);
            this.setState(newState);
        }, (err) => {
            console.log(err);
        })
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


    // update function for editor when user give input to the editor
    // scans for new variables entered by user when in "Edit Template" page
    onChange(editorState) {
        let newState = this.state;
        newState.editorState = editorState;
        if (this.props.currentPage === pageNames.editTemplate) {
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
                let indices = new Set(currVariables[k].index.concat(newVariables[k].index)); // remove duplicate indices
                indices = Array.from(indices);

                newVariableState[k] = {
                    index: indices,
                    value: currVariables[k].value,
                    source: currVariables[k].source
                };
            } else {
                newVariableState[k] = newVariables[k];
            }
        }
        return newVariableState;
    }


    getTextFromEditorState(editorState) {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        return blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    }

    // Collects variables from document text as it is
    // return objects with index and set value and variable as key
    extractVariables(editorState) {
        const editorText = this.getTextFromEditorState(editorState);
        const tokenizedText = editorText.split(/\s+/);
        let varObject = {}
        for (let i = 0; i < tokenizedText.length; i++) {
            if (tokenizedText[i][0] === "$" || (tokenizedText[i][0] === "\n" && tokenizedText[i][1] === "$")) {
                if (tokenizedText[i] in varObject) {
                    varObject[tokenizedText[i]].index.push(i);
                } else {
                    varObject[tokenizedText[i]] = {
                        index: [i],
                        value: "",
                        source: ""
                    }
                }
            }
        }
        return varObject;
    }


    //Edit View:  User chose variable to manually assign value
    setSelectedVariable(event) {
        let newState = this.state;
        newState.selectedVariable = event.target.value;
        this.setState(newState);
    }

    saveTemplate() {
        // TODO: Let User save template
        const editorText = this.getTextFromEditorState(this.state.editorState);
        HttpService.post(endpoints.saveTemplate, editorText, (response) => {
            let res = response;
            console.log(res);
            let newState = this.state;
            newState.showDialog = false;
            this.setState(newState);
        }, (err) => {
            console.log(err);
        })
    }

    downloadDocument(docNames) {
        // TODO: Let User download created and linked documents
        const editorText = this.getTextFromEditorState(this.state.editorState);
        const linkedDocs = docNames;
        console.log(linkedDocs);
        const params = {text: editorText, docs: linkedDocs}
        HttpService.get(endpoints.exportDocs + encodeURIComponent(JSON.stringify(params)), (resp) => {
            const docDefinition = {content: editorText};
            const pdf = pdfMake.createPdf(docDefinition);
            pdf.download();

            let res = resp.response;
            let newState = this.state;
            newState.showDialog = false;
            this.setState(newState);
        })
    }

    render() {
        const currentPage = this.props.currentPage
        const editorState = this.state.editorState;
        const actionSet = this.actionSet[currentPage];
        const componentSet = subComponents[currentPage];
        return (
            <div>
                <Row>
                    <Column>
                        {/*Insert left column next to editor, so editor is in the center*/}
                    </Column>
                    <Column>
                        <div style={{overflow: "auto", maxHeight: '83vh'}}><DocEditor
                            readOnly={this.props.readOnly}
                            textAlignment={this.state.textAlignment}
                            ref={(docEditor) => {
                                this.docEditor = docEditor
                            }}
                            editorState={editorState}
                            onChange={this.onChange}
                        />
                        </div>
                    </Column>
                    <Column>
                        <RightSidepanel
                            componentSet={componentSet}
                            onAction1_1={actionSet.onAction1_1}
                            onAction1_2={actionSet.onAction1_2}
                            onAction2_1={actionSet.onAction2_1}
                            onAction3_1={actionSet.onAction3_1}
                            onAction3_2={actionSet.onAction3_2}
                            onAction3_3={actionSet.onAction3_3}
                            editorState={this.state.editorState}
                            variables={this.state.variables}
                            selectedDocs={this.state.selectedDocs}
                            selectedVariable={this.state.selectedVariable}
                        />
                    </Column>
                </Row>
                <Dialog
                    showDialog={this.state.showDialog}
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
