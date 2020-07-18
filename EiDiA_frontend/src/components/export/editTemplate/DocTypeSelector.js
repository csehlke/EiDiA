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
            documentTypes: []
        }
        this.addDocType = this.addDocType.bind(this);
        this.setDocType = this.setDocType.bind(this);
        this.handleSnackBarOpen = this.handleSnackBarOpen.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    }

    componentDidMount() {
        CommonService.getAllDocumentTypes().then((data) => {
            this.setState({
                documentTypes: [...data.documentTypes],
            });
        })
    }


    addDocType() {
        this.setState({linkedDocTypes: this.state.linkedDocTypes.concat(null)})
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


    render() {
        // TODO: Use get request for fetching docTypes name,id list
        return (
            <div style={{overflow: 'auto', maxHeight: '250px', minHeight: '250px'}}>
                {this.state.linkedDocTypes.map((e, index) =>
                    <DocTypeSelectLine
                        key={index}
                        variables={this.props.variables}
                        handleSnackBarOpen={this.handleSnackBarOpen}
                        onSelectDocType={this.setDocType}
                        docTypes={this.state.documentTypes}
                        number={index + 1}
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