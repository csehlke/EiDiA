import React from 'react';
import DocEditor from "./DocEditor";
import RightSidepanel from "./RightSidepanel";
import {ContentState, convertToRaw, EditorState, RichUtils} from 'draft-js';
import FloatingWindows from './dialog/FloatingWindow';
import {ExportViewColumn, Row} from '../StyleElements';
import EditorTools from './editTemplate/EditorTools';
import DocSearch from './selectTemplate/DocSearch';
import ExportSection from './selectTemplate/ButtonArea';
import TemplateList from './selectTemplate/TemplateList';
import SaveTemplateSection from './editTemplate/SaveTemplateSection';
import SetValueSection from './edit/SetValueSection';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import ExportService from "../../services/ExportService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {pageNames} from "../../views/ExportView";
import DocTypeSelector from "./editTemplate/DocTypeSelector";
import {parseISO} from 'date-fns';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CustomDialog(props) {
    return (
        props.currentPage === pageNames.selectTemplate ? "" :
            <FloatingWindows showDialog={props.showDialog}
                             onClose={props.onClose}
                             save={props.save}
                             currentPage={props.currentPage}
                             selectedDocs={props.selectedDocs}
                             download={props.download}
                             editorState={props.editorState}/>
    );
}

// Checks if string/variable is URI, e.g. Document1/VARIABLE1
const isPath = (string) => {
    return /^(?:\/|[a-z]+:\/\/)/.test(string);
}


export const alertConstants = {
    alertType: {
        error: "error",
        warning: "warning"
    },
    messages: {
        template: "An error occurred with the selected template.",
        docSearch: "An error occurred with your document search.",
        document: "An error occurred with one or more of your selected documents",
        variables: "Some variable could not be mapped with selected documents",
        templateList: "An error occurred while fetching templates.",
        docTypes: "An error occurred while fetching document types."
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
            linkedDocTypes: [],
            showAlert: false,
            selectedDocTypes: [null], // array for docTypes chosen in "Edit Template" view
            isWarningMessageOpen: false,
            isErrorMessageOpen: false,
            errorMessage: ""
        };

        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.setSelectedVariable = this.setSelectedVariable.bind(this);
        this.selectTemplate = this.selectTemplate.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.extractVariables = this.extractVariables.bind(this);
        this.updateVariablePositions = this.updateVariablePositions.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.addSelectedDocumentToList = this.addSelectedDocumentToList.bind(this);
        this.mapDocumentsWithVariables = this.mapDocumentsWithVariables.bind(this);
        this.getTextFromEditorState = this.getTextFromEditorState.bind(this);
        this.downloadDocument = this.downloadDocument.bind(this);
        this.setValueToVariable = this.setValueToVariable.bind(this);
        this.setInitialView = this.setInitialView.bind(this);
        this.removeSelectedDocumentFromList = this.removeSelectedDocumentFromList.bind(this);
        this.createNewTemplate = this.createNewTemplate.bind(this);
        this.handleSnackBarOpen = this.handleSnackBarOpen.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
        this.addDocType = this.addDocType.bind(this);
        this.removeDocType = this.removeDocType.bind(this);
        this.replaceVariables = this.replaceVariables.bind(this);

        // reference to document editor, allows access to focus() method (focus editor)
        // necessary for setting inline styles
        this.docEditor = React.createRef();

        // Methods specific for each subcomponent in RightSidePanel
        this.actionSet = {
            [pageNames.selectTemplate]: {
                onAction1_1: this.selectTemplate,
                onAction1_2: this.toggleBlockType,
                onAction2_1: this.addSelectedDocumentToList,
                onAction2_2: this.removeSelectedDocumentFromList,
                onAction3_1: this.props.changeView,
                onAction3_2: this.setSelectedVariable,
                onAction3_3: this.createNewTemplate,
            },
            [pageNames.editTemplate]: {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction2_1: this.addDocType,
                onAction2_2: this.removeDocType,
                onAction3_1: this.toggleDialog,
                onAction3_2: this.setSelectedVariable,
                onAction3_3: null
            },
            [pageNames.edit]: {
                onAction1_1: this.toggleInlineStyle,
                onAction1_2: this.toggleBlockType,
                onAction2_1: this.addSelectedDocumentToList,
                onAction2_2: this.removeSelectedDocumentFromList,
                onAction3_1: this.toggleDialog,
                onAction3_2: this.setSelectedVariable,
                onAction3_3: this.setValueToVariable
            }
        }
    }

    // passed to RightSidePanel, so the right components are rendered according to currentPage
    subComponentSet = {
        [pageNames.selectTemplate]: {
            comp1: TemplateList,
            comp2: DocSearch,
            comp3: ExportSection
        },
        [pageNames.editTemplate]: {
            comp1: EditorTools,
            comp2: DocTypeSelector,
            comp3: SaveTemplateSection
        },
        [pageNames.edit]: {
            comp2: DocSearch,
            comp3: SetValueSection
        }
    }

    componentDidMount() {
        this.setInitialView()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentPage !== prevProps.currentPage) {
            if (this.props.currentPage === pageNames.edit) {
                this.mapDocumentsWithVariables(this.state.selectedDocs);
            } else if (this.props.currentPage === pageNames.selectTemplate && this.state.selectedTemplate === null) {
                this.setInitialView();
            } else if (prevProps.currentPage === pageNames.edit && this.state.selectedTemplate !== null) {
                this.selectTemplate(this.state.selectedTemplate.name, this.state.selectedTemplate._id);
            }
        }
    }

    // initial view: fetch templates and select first template, if any and display its content in editor
    // e.g. user returns from "Edit Template" View and return back to "Select Template" view
    setInitialView() {
        ExportService.getAllTemplates().then((data) => {
            if (data.exportTemplates.length !== 0) {
                let initTemplate = data.exportTemplates[0];
                this.selectTemplate(initTemplate.name, initTemplate._id);
            }
        }).catch(() => this.handleSnackBarOpen(alertConstants.alertType.error, alertConstants.messages.templateList));
    }

    createNewTemplate() {
        this.setState({editorState: EditorState.createEmpty(), selectedTemplate: null});
        this.props.changeView(pageNames.editTemplate);
    }

    // Set Value to variable manually (not from document)
    setValueToVariable(value) {
        let newState = this.state;
        let variableState = newState.variables;
        let index = variableState[newState.selectedVariable].index;
        variableState[newState.selectedVariable].source = 'user';
        variableState[newState.selectedVariable].value = value;
        newState.variables = variableState;

        let editorText = this.setValuesToText(index, value, newState.editorState);
        newState.editorState = EditorState.createWithContent(ContentState.createFromText(editorText));

        this.setState(newState);
    }

    // Replace positions of given variable with new value
    setValuesToText(indices, newValue, editorState) {
        let editorText = this.getTextFromEditorState(editorState);
        const tmp_arr = editorText.split(/\s+/);
        console.log(indices)
        console.log(this.state.variable);
        for (let i of indices) {
            const toReplace = tmp_arr[i];
            editorText = editorText.split(toReplace).join(newValue);
        }
        return editorText;
    }

    // matches given data from document with variables in document text
    mapDocumentsWithVariables(selectedDocs) {
        let selectedDocsIds = selectedDocs.map((docElem) => docElem.id);
        if (selectedDocs.length !== 0) {
            ExportService.getDocumentAttributes(selectedDocsIds).then((data) => {
                const documents = data.documentAttributes;
                if (Object.keys(documents).length !== 0) {
                    let newState = this.state;
                    let templateVariables = this.state.variables;

                    // gather data of selected documents
                    let documentData = selectedDocsIds.reduce((dataArr, docID) => {
                        if (docID in documents) {
                            dataArr = dataArr.concat(documents[docID]);
                        }
                        return dataArr;
                    }, []);

                    let editorState = newState.editorState;
                    let attributesNotFound = false;
                    let editorText;
                    let replacedVariables;
                    if (documentData.length !== 0) {
                        // Iterate through document data and map attributes with variables
                        let key = Object.keys(templateVariables)
                        let toReplace = [];
                        let replaceIndices = [];
                        for (let k of key) {
                            if (isPath(k.slice(1))) { // find variables that depend on documents
                                let variableTokens = k.split("/");
                                let docVariable = variableTokens[variableTokens.length - 1];                // Get to be mapped variables from editorText
                                let indexString = variableTokens[variableTokens.length - 2];
                                let documentIndex = parseInt(indexString[indexString.length - 1]) - 1;      // Get index for correct document, e.g. $/Document1/Variable1 --> index = 1 -1 = 0

                                let indices = templateVariables[k].index;

                                if (typeof documentData[documentIndex] !== 'undefined') {
                                    if (docVariable in documentData[documentIndex]) {
                                        let docValue = documentData[documentIndex][docVariable];

                                        try {
                                            let date = parseISO(docValue);
                                            if (date != "Invalid Date") {
                                                docValue = String(date);
                                            }
                                        } catch (e) {
                                            console.log(e);
                                        }

                                        //update current value and value source of that variable for state
                                        templateVariables[k].value = docValue;
                                        templateVariables[k].source = "\/" + selectedDocs[documentIndex].name + "\/" + docVariable;

                                        replaceIndices = [...replaceIndices, ...indices];

                                        toReplace.push(docValue);
                                    } else {
                                        attributesNotFound = true;
                                    }
                                }
                            }
                        }

                        let out = this.replaceVariables(toReplace, replaceIndices, editorState);
                        editorText = out[0];
                        replacedVariables = out[1];
                        this.updateVariablePositions(replacedVariables, editorText);

                    } else {
                        attributesNotFound = true;
                    }

                    let newEditorState = EditorState.createWithContent(ContentState.createFromText(editorText));


                    this.setState({editorState: newEditorState});

                    //let newVariables = this.scanForNewVariables(newState.variables, editorState);
                    //this.setState({variables: newVariables});
                    if (attributesNotFound) this.handleSnackBarOpen(alertConstants.alertType.warning, alertConstants.messages.variables);
                }
            }).catch(() => this.handleSnackBarOpen(alertConstants.alertType.error, alertConstants.messages.document));
        }
    }

    replaceVariables(toReplace, indices, editorState) {
        let editorText = this.getTextFromEditorState(editorState);
        const tmp_arr = editorText.split(/\s+/);
        let replacedVariables = [];
        for (let i = 0; i < indices.length; i++) {
            const variable = tmp_arr[indices[i]];
            editorText = editorText.split(variable).join(toReplace[i]);
            replacedVariables.push(variable);
        }
        return [editorText, replacedVariables];
    }

    toggleDialog() {
        this.setState({showDialog: !this.state.showDialog})
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
            this.mapDocumentsWithVariables([docItem]);
        }
    }

    removeSelectedDocumentFromList(docItem) {
        let filteredArray = this.state.selectedDocs.filter((doc) => doc.id !== docItem.id)
        this.setState({selectedDocs: filteredArray});
    }

    // replaces document text with text from template
    // collects all variables of the template
    selectTemplate(name, id) {
        ExportService.getTemplate(id).then((data) => {
            let template = data.template;
            let editorText = template.documentContent;
            if (typeof editorText === 'undefined' || typeof editorText === 'undefined') {
                this.handleSnackBarOpen(alertConstants.alertType.error, alertConstants.messages.template)
            } else {
                let newState = this.state;

                newState.editorState = EditorState.createWithContent(ContentState.createFromText(editorText));
                newState.selectedTemplate = {name: name, _id: id};
                newState.variables = this.extractVariables(newState.editorState);
                this.setState(newState);
            }
        }).catch(() => this.handleSnackBarOpen(alertConstants.alertType.error, alertConstants.messages.template));
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

    // update variables and remove path variables
    updateVariablePositions(replacedVariables, editorText) {
        let untouchedVariables = [];
        let currVariables = this.state.variables;

        for (let cv in currVariables) {
            if (!replacedVariables.includes(cv)) {
                untouchedVariables.push(cv);
            }
        }

        const tmp_arr = editorText.split(/\s+/);
        let indices = {};
        for (let uv of untouchedVariables) {
            let i = -1;
            for (i = 0; i < tmp_arr.length; i++)
                if (tmp_arr[i] === uv) {
                    if (!indices.hasOwnProperty(uv)) {
                        indices[uv] = [];
                    }

                    indices[uv].push(i);
                }

        }
        /*let newVariableState = {}
        for (let k of Object.keys(indices)) {
            newVariableState[k] = {
                value: "",
                source: "",
                index: indices[k]
            };
        }*/
        let oldVariables = this.state.variables;
        for (let k of Object.keys(indices)) {
            oldVariables[k] = {
                value: "", source: "",
                index: indices[k]
            }
        }
        this.setState({variables: oldVariables});
    }

    // Scans editorText for new Variables and returns object of updated variable state
    scanForNewVariables(currVariables, editorState) {
        let newVariables = this.extractVariables(editorState);
        let newVariableState = {};
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
        const mappedBlocks = blocks.map(
            block => (!block.text.trim() && "\n") || block.text
        );

        let newText = "";
        for (let i = 0; i < mappedBlocks.length; i++) {
            const block = mappedBlocks[i];

            // handle last block
            if (i === mappedBlocks.length - 1) {
                newText += block;
            } else {
                // otherwise we join with \n, except if the block is already a \n
                if (block === "\n") newText += block;
                else newText += block + "\n";
            }
        }
        return newText
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
        this.setState({selectedVariable: event.target.value});
    }

    saveTemplate(templateName) {
        // will overwrite template name; if no template found in database -> create new entry
        const template = {
            _id: this.state.selectedTemplate ? this.state.selectedTemplate._id : null,
            documentContent: this.getTextFromEditorState(this.state.editorState),
            documentTypes: this.state.linkedDocTypes,
            name: templateName
        }
        ExportService.saveTemplate(template).then(() => {
            let newState = this.state;
            newState.showDialog = false;
            this.setState(newState);
            this.props.changeView(pageNames.selectTemplate);
        }).catch(() => this.handleSnackBarOpen(alertConstants.alertType.error, alertConstants.messages.template));
    }

    downloadDocument(docIDs) {
        const editorText = this.getTextFromEditorState(this.state.editorState);
        ExportService.downloadDocuments(docIDs).then((data) => {
            let pdfData = data.pdfText;
            pdfData.forEach(pdfContent => {
                const pdf = pdfMake.createPdf({content: pdfContent.completeOcrText});
                pdf.download();
            })
            const docDefinition = {content: editorText};
            const pdf = pdfMake.createPdf(docDefinition);
            pdf.download();

            let newState = this.state;
            newState.showDialog = false;
            this.setState(newState);
        }).catch(() => this.handleSnackBarOpen(alertConstants.alertType.error, alertConstants.messages.document));
    }

    handleSnackBarOpen(alertType, message) {
        if (alertType === alertConstants.alertType.warning) {
            this.setState({isWarningMessageOpen: true});
        } else if (alertType === alertConstants.alertType.error) {
            this.setState({isErrorMessageOpen: true, errorMessage: message});
        }
    }

    handleSnackBarClose(alertType) {
        if (alertType === alertConstants.alertType.warning) {
            this.setState({isWarningMessageOpen: false});
        } else if (alertType === alertConstants.alertType.error) {
            this.setState({isErrorMessageOpen: false});
        }
    }

    addDocType(addDocTypeSelectLine, newDocType, index) {
        let docTypes = this.state.selectedDocTypes;
        if (addDocTypeSelectLine) {
            this.setState({selectedDocTypes: docTypes.concat(null)});       // concat null as placeholder for new docType variable
        } else {
            docTypes[index] = newDocType;
            this.setState({selectedDoctypes: docTypes});
        }
    }

    removeDocType(index) {
        let selectedDocTypes = this.state.selectedDocTypes;
        selectedDocTypes.splice(index, 1);
        this.setState({selectedDocTypes: selectedDocTypes});
    }

    render() {
        const currentPage = this.props.currentPage
        const editorState = this.state.editorState;
        const actionSet = this.actionSet[currentPage];
        const componentSet = this.subComponentSet[currentPage];
        return (
            <div>
                <Row>
                    <div style={{width: "30%"}}>
                        {/*Insert left column next to editor, so editor is in the center*/}
                    </div>
                    <ExportViewColumn>
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
                    </ExportViewColumn>
                    <ExportViewColumn>
                        <RightSidepanel
                            errorHandler={this.handleSnackBarOpen}
                            selectedDocTypes={this.state.selectedDocTypes}
                            componentSet={componentSet}
                            actionSet={actionSet}
                            editorState={this.state.editorState}
                            variables={this.state.variables}
                            selectedDocs={this.state.selectedDocs}
                            selectedVariable={this.state.selectedVariable}
                            editorDidChange={this.props.editorDidChange}
                        />
                    </ExportViewColumn>
                </Row>
                <CustomDialog
                    showDialog={this.state.showDialog}
                    onClose={this.toggleDialog}
                    save={this.saveTemplate}
                    currentPage={this.props.currentPage}
                    selectedDocs={this.state.selectedDocs}
                    download={this.downloadDocument}
                    editorState={this.state.editorState}
                />
                <Snackbar
                    open={this.state.isWarningMessageOpen}
                    autoHideDuration={5000}>
                    <Alert severity={alertConstants.alertType.warning}
                           onClose={() => this.handleSnackBarClose(alertConstants.alertType.warning)}>
                        Some Attributes in selected Documents not found. Affected variables remain unchanged.
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={this.state.isErrorMessageOpen}
                    autoHideDuration={5000}>
                    <Alert severity={alertConstants.alertType.error}
                           onClose={() => this.handleSnackBarClose(alertConstants.alertType.error)}>
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}
