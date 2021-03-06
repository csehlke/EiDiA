"use strict";

import React from 'react';
import {Button} from "@material-ui/core";

import SmartDropDownBox from "../SmartDropDownBox";
import TextField from "@material-ui/core/TextField";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import styled from "styled-components";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import {IoMdRemoveCircleOutline} from "react-icons/all";
import IconButton from '@material-ui/core/IconButton';
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
    error: {
        color: theme.palette.error.main // see index.js
    }
});

const Row = styled.div`
    display: flex;
    width: 100%;
`;

const Column2 = styled.div`
    flex: 50%;
`;

const DialogContentFixedSize = styled(DialogContent)`
    min-width: 60vw;
    min-height: 40vh;
    max-height: 40vh;
`;

const Column3 = styled.div`
    flex: 33%;
`;

const DialogActionsFixedSize = styled(DialogActions)`
    padding: 8px 2em;
`;

class NewDocumentTypeDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedAttrType: '',
            newDocumentTypeName: '',
            newAttributeName: '',
            newAttributes: [],
            attributeTypeOptions: [
                {id: 'date', name: 'Date'},
                {id: 'number', name: 'Number'},
                {id: 'text', name: 'Text'},
            ],
        }

        this.attributeTypeRef = React.createRef();

        this.newDocTypeToBackend = this.newDocTypeToBackend.bind(this);
        this.handleAttrTypeChange = this.handleAttrTypeChange.bind(this);
        this.handleNewDocumentTypeName = this.handleNewDocumentTypeName.bind(this);
        this.handleNewAttributeName = this.handleNewAttributeName.bind(this);
        this.addNewAttribute = this.addNewAttribute.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.removeAttribute = this.removeAttribute.bind(this);
    }

    handleAttrTypeChange(event, value) {
        this.setState({
            selectedAttrType: value,
        });
    }

    newDocTypeToBackend() {
        const attributes = this.state.newAttributes.map(attribute => {
            return {
                name: attribute.name,
                dataType: attribute.dataType.id,
            };
        });
        let requestData = {
            newDocumentTypeName: this.state.newDocumentTypeName,
            newAttributes: attributes
        }
        this.props.createNewDocumentType(requestData);
        this.closeDialog();
    }

    handleNewDocumentTypeName(event) {
        this.setState({
            newDocumentTypeName: event.target.value
        });
    }

    handleNewAttributeName(event) {
        this.setState({
            newAttributeName: event.target.value
        });
    }

    addNewAttribute() {
        const newAttributeType = {
            name: this.state.newAttributeName,
            dataType: this.state.selectedAttrType
        }
        this.setState({
            newAttributes: [...this.state.newAttributes, newAttributeType],
            newAttributeName: '',
        });
    }

    removeAttribute(index) {
        let copyArr = this.state.newAttributes
        copyArr.splice(index, 1);
        this.setState({
            newAttributes: copyArr
        });
    }

    closeDialog() {
        this.attributeTypeRef.current.reset();
        this.setState({
            selectedAttrType: '',
            newDocumentTypeName: '',
            newAttributeName: '',
            newAttributes: [],
        })
        this.props.onClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <Dialog open={this.props.open} onClose={this.closeDialog} maxWidth={false}>
                <DialogTitle>
                    Create New Document Type
                </DialogTitle>
                <DialogContentFixedSize dividers>
                    <TextField
                        label="New Document Type Name"
                        variant="outlined"
                        value={this.state.newDocumentTypeName}
                        onChange={this.handleNewDocumentTypeName}
                        fullWidth
                        style={{margin: '0.5em 0'}}
                        size={"small"}/>

                    {this.state.newAttributes.map((item, i) => {
                        return (
                            <Row key={i}>
                                <Column2>
                                    <TextField
                                        disabled
                                        label={"Name"}
                                        value={item.name}
                                        variant="outlined"
                                        InputProps={{
                                            style: {
                                                color: "black" //Textcolor for "disabled"-property
                                            }
                                        }}
                                        fullWidth
                                        style={{margin: '0.5em 0', padding: '0 5px 0 0'}}
                                        size={"small"}/>
                                </Column2>
                                <Column2>
                                    <TextField
                                        disabled
                                        label={"Data Type"}
                                        value={item.dataType.name}
                                        variant="outlined"
                                        InputProps={{
                                            style: {
                                                color: "black", //Textcolor for "disabled"-property
                                            }
                                        }}
                                        fullWidth
                                        style={{margin: '0.5em 0', padding: '0 0 0 5px'}}
                                        size={"small"}/>
                                </Column2>
                                <IconButton onClick={() => {
                                    this.removeAttribute(i)
                                }}>
                                    <IoMdRemoveCircleOutline/>
                                </IconButton>
                            </Row>
                        );
                    })}
                </DialogContentFixedSize>
                <DialogContentText style={{margin: '10px'}}>
                    Create Attributes for this Document Type
                </DialogContentText>
                <DialogActionsFixedSize>
                    <Row>
                        <Column3>
                            <TextField
                                label="Name"
                                variant="outlined"
                                value={this.state.newAttributeName}
                                onChange={this.handleNewAttributeName}
                                fullWidth
                                style={{margin: '0.5em 0', padding: '0 5px 0 0'}}
                                size={"small"}/>
                        </Column3>
                        <Column3>
                            <SmartDropDownBox
                                ref={this.attributeTypeRef}
                                onChange={this.handleAttrTypeChange}
                                options={this.state.attributeTypeOptions}
                                label='Type'
                                style={{margin: '0.5em 0', padding: '0 10px 0 5px'}}/>
                        </Column3>
                        <Column3>
                            <Button autoFocus
                                    disabled={this.state.selectedAttrType === '' || this.state.newAttributeName === ''}
                                    color="primary"
                                    onClick={this.addNewAttribute}
                                    size={"medium"}
                                    variant="contained"
                                    fullWidth
                                    style={{margin: '0.5em 0'}}>
                                Add Attribute
                            </Button>
                        </Column3>
                    </Row>
                </DialogActionsFixedSize>
                <DialogActions>
                    <Button className={classes.error}
                            onClick={this.closeDialog}>
                        Cancel
                    </Button>
                    <Button autoFocus
                            disabled={this.state.newDocumentTypeName === '' || !(this.state.newAttributes.length > 0)}
                            color="primary"
                            onClick={this.newDocTypeToBackend}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles, {withTheme: true})(NewDocumentTypeDialog);

NewDocumentTypeDialog.propTypes = {
    createNewDocumentType: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
}
