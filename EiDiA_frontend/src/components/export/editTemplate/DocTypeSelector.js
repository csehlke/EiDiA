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
        }

        this.handleSnackBarOpen = this.handleSnackBarOpen.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
        this.setSelectedDocType = this.setSelectedDocType.bind(this);
    }

    componentDidMount() {
        CommonService.getAllDocumentTypes().then((data) => {
            this.setState({
                documentTypes: [...data.documentTypes],
            })
        }).catch((err) => console.log(err));
    }

    handleSnackBarOpen() {
        this.setState({isSnackBarOpen: true});
    }

    handleSnackBarClose() {
        this.setState({isSnackBarOpen: false});
    }

    setSelectedDocType(docType) {
        this.setState({selectedDocType: docType});
        this.props.onAction2_1(false, docType);
    }

    render() {
        return (
            <div style={{overflow: 'auto', maxHeight: '35vh', minHeight: '35vh'}}>
                {this.props.selectedDocTypes.map((element, index) =>
                    <DocTypeSelectLine
                        showButton={index < this.props.selectedDocTypes.length - 1}
                        key={index}
                        isLastItem={index === this.props.selectedDocTypes.length - 1}
                        variables={this.props.variables}
                        handleSnackBarOpen={this.handleSnackBarOpen}
                        docTypes={this.state.documentTypes}
                        number={index + 1}
                        remove={this.props.onAction2_2}
                        addDocType={this.setSelectedDocType}
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