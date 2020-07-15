import React from 'react';
import {Column, Row} from '../../../support files/constants';
import SmartDropDownBox from "../../SmartDropDownBox";
import IconButton from "@material-ui/core/IconButton";
import {FiCopy} from 'react-icons/fi';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

export default class DocTypeSelectLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            docAttributes: [],
            variable: "$/document" + this.props.number + "/"
        }
        this.docTypeSelected = this.docTypeSelected.bind(this);
        this.createVariableString = this.createVariableString.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    docTypeSelected(e, value) {
        const attributes = [
            {name: "lalalalal", type: "lalala type"},
            {name: "lololo", type: "lololo type"},
        ]
        this.setState({docAttributes: attributes})
    }

    createVariableString(e, value) {
        if (typeof value !== 'undefined') {
            let newState = this.state;
            newState.variable = "$/document" + this.props.number + "/" + value.name;
            this.setState(newState);
        }
    }

    copyToClipboard() {
        console.log("copied!")
    }

    render() {
        const docTypes = this.props.docTypes;
        return (
            <Row>
                <Column>
                    Document{this.props.number}
                </Column>
                <Column>
                    <SmartDropDownBox label={"Type"} onChange={this.docTypeSelected} options={docTypes}/>
                </Column>
                <Column>
                    <SmartDropDownBox label={"Attribute"} onChange={this.createVariableString}
                                      options={this.state.docAttributes}/>
                </Column>
                <Column>
                    <CopyToClipboard text={this.state.variable}
                                     onCopy={this.copyToClipboard}
                    >
                        <IconButton onClick={this.copyToClipboard}>
                            <FiCopy/>
                        </IconButton>
                    </CopyToClipboard>
                </Column>
            </Row>
        )
    }
}