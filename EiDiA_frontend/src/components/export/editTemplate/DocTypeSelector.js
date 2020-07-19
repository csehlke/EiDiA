import React from 'react';
import DocTypeSelectLine from "./DocTypeSelectLine";
import {Row} from "../../StyleElements";
import {MdAdd} from "react-icons/all";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CommonService from "../../../services/CommonService";
import {v4 as uuidv4} from 'uuid';

export default class DocTypeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSnackBarOpen: false,
            // e.g. [{key: "123214", docTypeID: null}, {key: "145214", docTypeID: "12er213"}]
            // keys generated with uuid for dynamic removing/rendering of DocTypeSelectorLine
            docTypesWithUUID: [],
        }

        this.handleSnackBarOpen = this.handleSnackBarOpen.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
        this.setSelectedDocType = this.setSelectedDocType.bind(this);
        this.generateUniqueKey = this.generateUniqueKey.bind(this);
        this.removeDocTypeWithUUID = this.removeDocTypeWithUUID.bind(this);
    }

    componentDidMount() {
        this.generateUniqueKey();
        CommonService.getAllDocumentTypes().then((data) => {
            this.setState({
                documentTypes: [...data.documentTypes],
            })
        }).catch((err) => console.log(err));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedDocTypes !== this.props.selectedDocTypes) {
            this.generateUniqueKey();
        }
    }

    handleSnackBarOpen() {
        this.setState({isSnackBarOpen: true});
    }

    handleSnackBarClose() {
        this.setState({isSnackBarOpen: false});
    }

    setSelectedDocType(index, newDocTypeID) {
        // update DocTypesWithUUID
        let newDocTypesWithUUID = this.state.docTypesWithUUID;
        newDocTypesWithUUID[index].docTypeID = newDocTypeID;
        this.setState({docTypesWithUUID: newDocTypesWithUUID});

        this.props.onAction2_1(false, newDocTypeID, index);
    }

    // multiple children components (DocTypeSelectorLine) require unique keys for efficient and convenient re-rendering
    // when removing a DocTypeSelectorLine
    generateUniqueKey() {
        let docTypesWithUUID = this.state.docTypesWithUUID;
        let selectedDocTypes = this.props.selectedDocTypes;
        selectedDocTypes = selectedDocTypes.slice(docTypesWithUUID.length, selectedDocTypes.length);       // docTypesWithUUID.length <= selectedDocTypes

        let newDocTypesWithUUID = [];
        selectedDocTypes.forEach((docTypeID) => newDocTypesWithUUID.push({docTypeID: docTypeID, key: uuidv4()}))
        newDocTypesWithUUID = docTypesWithUUID.concat(newDocTypesWithUUID);
        this.setState({docTypesWithUUID: newDocTypesWithUUID})
    }


    removeDocTypeWithUUID(index) {
        let docTypesWithUUID = this.state.docTypesWithUUID;
        docTypesWithUUID.splice(index, 1);
        this.setState({docTypesWithUUID: docTypesWithUUID});
        this.props.onAction2_2(index);
    }

    render() {
        let docTypesWithUUID = this.state.docTypesWithUUID;
        return (
            <div style={{overflow: 'auto', maxHeight: '35vh', minHeight: '35vh'}}>
                {docTypesWithUUID.map((element, index) =>
                    <DocTypeSelectLine
                        showButton={index < this.props.selectedDocTypes.length - 1}
                        key={element.key}
                        variables={this.props.variables}
                        handleSnackBarOpen={this.handleSnackBarOpen}
                        docTypes={this.state.documentTypes}
                        number={index + 1}
                        remove={this.removeDocTypeWithUUID}
                        onSetDocType={this.setSelectedDocType}
                    />)}
                <Row>
                    <Button startIcon={<MdAdd/>} color="primary" onClick={() => this.props.onAction2_1(true)}>
                        Add document type
                    </Button>
                </Row>
                <Snackbar
                    open={this.state.isSnackBarOpen}
                    autoHideDuration={5000}
                    onClose={this.handleSnackBarClose}>
                    <Alert severity="info" onClose={this.handleSnackBarClose}>
                        Variable copied to clipboard!
                    </Alert>
                </Snackbar>
            </div>
        )
    }

}