import React from 'react';
import {Row} from '../../StyleElements';
import SmartDropDownBox from "../../SmartDropDownBox";
import IconButton from "@material-ui/core/IconButton";
import {FiCopy} from 'react-icons/fi';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import UploadService from "../../../services/UploadService";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

export default class DocTypeSelectLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            docAttributes: [],
            variable: "$/document" + this.props.number + "/",
            disableDocType: false,
            disableCopy: true,
            disableAttributes: true,
            attributeFieldValue: null,
        }
        this.docTypeSelected = this.docTypeSelected.bind(this);
        this.createVariableString = this.createVariableString.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.variables) !== JSON.stringify(prevProps.variables)) {
            let variables = this.props.variables;
            this.setState({disableDocType: this.state.variable in variables});
            if (this.props.isLastItem) {
                this.props.addDocType(this.state.selectedDocType);
            }
        }
    }

    docTypeSelected(event, value) {
        this.setState({attributeFieldValue: null});
        if (value) {
            UploadService.listAttributes(value.id).then((data) => {
                this.setState({
                    docAttributes: data.attributeTypes,
                    selectedDocType: value.id,
                    disableAttributes: false
                });
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

    remove() {
        this.props.remove(this.props.number - 1);
    }

    render() {
        return (
            <div style={{color: this.props.disabled ? "gray" : "black"}}>
                <Row>
                    <Typography style={{margin: "10px"}} variant="subtitle2">
                        Document{this.props.number}
                    </Typography>
                    {this.props.showButton &&
                    <Button size="small" color="secondary" onClick={this.remove}>Remove</Button>}
                </Row>
                <Row>
                    <SmartDropDownBox disabled={this.state.disableDocType}
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