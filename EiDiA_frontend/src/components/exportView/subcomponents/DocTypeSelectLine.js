import React from 'react';
import {Column, Row} from '../../../support files/constants';
import SmartDropDownBox from "../../SmartDropDownBox";
import IconButton from "@material-ui/core/IconButton";
import {FiCopy} from 'react-icons/fi';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import 'react-toastify/dist/ReactToastify.css';

export default class DocTypeSelectLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            docAttributes: [],
            variable: "$/document" + this.props.number + "/",
            selectedDocType: "",
            disableDropDown: false,
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

    docTypeSelected(e, value) {
        // TODO: fetch attributes of given docType
        const attributes = [
            {name: "lalalalal", type: "lalala type"},
            {name: "lololo", type: "lololo type"},
        ]
        this.setState({docAttributes: attributes, selectedDocType: value});
    }

    createVariableString(e, value) {
        if (typeof value !== 'undefined') {
            let variable = this.state.variable + value.name;
            this.setState({variable: variable});
        }
    }

    render() {
        const docTypes = this.props.docTypes;
        return (
            <Row style={{color: this.props.disabled ? "gray" : "black"}}>
                <Column>
                    Document{this.props.number}
                </Column>
                <Column>
                    <SmartDropDownBox disabled={this.state.disableDropDown || this.props.disabled}
                                      label={"Type"}
                                      onChange={this.docTypeSelected}
                                      options={docTypes}
                    />
                </Column>
                <Column>
                    <SmartDropDownBox disabled={this.props.disabled}
                                      label={"Attribute"}
                                      onChange={this.createVariableString}
                                      options={this.state.docAttributes}
                    />
                </Column>
                <Column>
                    <CopyToClipboard text={this.state.variable}
                                     onCopy={this.props.handleSnackBarOpen}
                    >
                        <IconButton disabled={this.props.disabled}>
                            <FiCopy/>
                        </IconButton>
                    </CopyToClipboard>
                </Column>
            </Row>
        )
    }
}