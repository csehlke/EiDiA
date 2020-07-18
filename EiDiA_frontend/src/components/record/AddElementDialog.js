"use strict";

import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";


export default class AddElementDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
        }

        this.onClose = this.onClose.bind(this);
    }

    changeTitle = (value) => {
        this.setState({title: value});
    }

    onClose() {
        this.setState({
            title: '',
        });
        this.props.onClose();
    }

    render() {

        return (
            <Dialog open={this.props.open} onClose={this.onClose}
                    maxWidth={false}>
                <DialogTitle key={"title"}>
                    Add new {this.props.elementType}
                </DialogTitle>
                <DialogContent key={"content"} style={{overflow: "hidden"}}>
                    <TextField size={"small"}
                               fullWidth={true}
                               id="Title"
                               label="Title"
                               value={this.state.title}
                               variant={"outlined"}
                               autoFocus
                               onChange={(event) => this.changeTitle(event.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={this.onClose}>
                        Cancel
                    </Button>
                    <Button autoFocus
                            disabled={this.state.title === ''}
                            color="primary"
                            onClick={() => {
                                this.onClose();
                                this.props.onSave(this.state.title);
                            }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddElementDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    elementType: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
}