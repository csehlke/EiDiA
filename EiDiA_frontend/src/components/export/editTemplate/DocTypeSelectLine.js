import React from 'react';
import {Row} from '../../StyleElements';
import SmartDropDownBox from "../../SmartDropDownBox";
import IconButton from "@material-ui/core/IconButton";
import {FiCopy} from 'react-icons/fi';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import UploadService from "../../../services/UploadService";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default class DocTypeSelectLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            docAttributes: [],
            variable: "$/document" + this.props.number + "/",
            selectedDocType: "",
            disableDropDown: false,
            disableCopy: true,
            disableAttributes: true,
            attributeFieldValue: null
        }
        this.docTypeSelected = this.docTypeSelected.bind(this);
        this.createVariableString = this.createVariableString.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.variables) !== JSON.stringify(prevProps.variables)) {
            let variables = this.props.variables
            this.setState({disableDropDown: this.state.variable in variables})
            this.props.onSelectDocType(this.state.selectedDocType);
        }
    }

    docTypeSelected(event, value) {
        this.setState({attributeFieldValue: null});
        if (value) {
            UploadService.listAttributes(value.id).then((data) => {
                    this.setState({docAttributes: data.attributeTypes, selectedDocType: value, disableAttributes: false});
                }
            )
        } else {
            this.setState({disableAttributes: true});
        }
    }

    createVariableString(event, value) {
        if (value) {
            let variable = this.state.variable + value.name.split(' ').join(''); // remove whitespaces from attribute name
            this.setState({variable: variable, disableCopy: false});
        } else {
            this.setState({disableCopy: true});
        }
    }

    render() {
        return (
            <div style={{color: this.props.disabled ? "gray" : "black"}}>
                <Typography style={{margin: "10px"}} variant="subtitle2">
                    Document{this.props.number}
                </Typography>
                <Row>
                    <SmartDropDownBox disabled={this.state.disableDropDown}
                                      label={"Type"}
                                      onChange={this.docTypeSelected}
                                      options={this.props.docTypes}
                    />
                    <SmartDropDownBox label={"Attribute"}
                                      onChange={this.createVariableString}
                                      options={this.state.docAttributes}
                                      disabled={this.state.disableAttributes}
                                      preselectedValue={this.state.attributeFieldValue}
                    />
                    <CopyToClipboard text={this.state.variable}
                                     onCopy={this.props.handleSnackBarOpen}
                    >
                        <IconButton disabled={this.state.disableCopy}>
                            <FiCopy/>
                        </IconButton>
                    </CopyToClipboard>
                </Row>
                <Divider variant="middle" light/>
            </div>
        )
    }
}