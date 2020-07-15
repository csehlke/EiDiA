import React from 'react';
import DocTypeSelectLine from "./DocTypeSelectLine";
import {Row} from "../../../support files/constants";
import {MdAdd} from "react-icons/all";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";


export default class DocTypeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSnackBarOpen: false,
            linkedDocTypes: [null]
        }
        this.addDocType = this.addDocType.bind(this);
        this.setDocType = this.setDocType.bind(this);
        this.handleSnackBarOpen = this.handleSnackBarOpen.bind(this);
        this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
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
        const docTypes = [
            {name: "lalalalal", id: "lalala type"},
            {name: "lololo", id: "lololo type"},
        ]
        return (
            <div style={{margin: '15px', overflow: 'auto', maxHeight: '300px', minHeight: '300px'}}>
                {this.state.linkedDocTypes.map((e, index) =>
                    <DocTypeSelectLine
                        variables={this.props.variables}
                        disabled={index < this.state.linkedDocTypes.length - 1}
                        handleSnackBarOpen={this.handleSnackBarOpen}
                        onSelectDocType={this.setDocType}
                        docTypes={docTypes}
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