import React from 'react';
import DocTypeSelectLine from "./DocTypeSelectLine";
import {Row} from "../../StyleElements";
import {MdAdd} from "react-icons/all";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CommonService from "../../../services/CommonService";

export default class DocTypeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSnackBarOpen: false,
            linkedDocTypes: [null],
            documentTypes: [] // e.g. [{id: "1234", name: "doc type"}]
        }
        this.addDocType = this.addDocType.bind(this);
        this.setDocType = this.setDocType.bind(this);
        this.handleSnackBarOpen = this.handleSnackBarOpen.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
        this.removeLinkedDocType = this.removeLinkedDocType.bind(this);
    }

    componentDidMount() {
        CommonService.getAllDocumentTypes().then((data) => {
            this.setState({
                documentTypes: [...data.documentTypes],
            }).catch((err) => console.log(err));
        })
    }


    addDocType() {
        this.setState({linkedDocTypes: this.state.linkedDocTypes.concat(null)})
        console.log(this.state.linkedDocTypes);
    }

    setDocType(docType) {
        let linkedDocTypes = this.state.linkedDocTypes;
        if (!linkedDocTypes.includes(docType)) {
            linkedDocTypes[linkedDocTypes.length - 1] = docType;
            this.setState({linkedDocTypes: linkedDocTypes})
            this.props.onAction2_2(docType);
        }
    }

    handleSnackBarOpen() {
        this.setState({isSnackBarOpen: true});
    }

    handleSnackBarClose() {
        this.setState({isSnackBarOpen: false});
    }

    // NOT FINISHED YET
    removeLinkedDocType(index) {
        let linkedDocTypes = this.state.linkedDocTypes;
        linkedDocTypes.splice(index, 1);
        this.setState({linkedDocTypes: linkedDocTypes});
    }

    render() {
        // TODO: Use get request for fetching docTypes name,id list
        return (
            <div style={{overflow: 'auto', maxHeight: '35vh', minHeight: '35vh'}}>
                {this.state.linkedDocTypes.map((e, index) =>
                    <DocTypeSelectLine
                        showButton={index < this.state.linkedDocTypes.length - 1}
                        key={index}
                        index={index}
                        variables={this.props.variables}
                        handleSnackBarOpen={this.handleSnackBarOpen}
                        onSelectDocType={this.setDocType}
                        docTypes={this.state.documentTypes}
                        number={index + 1}
                        remove={this.removeLinkedDocType}
                    />)}
                <Row>
                    <Button startIcon={<MdAdd/>} color="primary" onClick={this.addDocType}>
                        Add another document type
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