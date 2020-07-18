"use strict";

import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


export default class AddElementDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
        }
    }

    changeTitle = (value) => {
        this.setState({title: value});
    }

    render() {

        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}
                    maxWidth={false}>
                <DialogTitle key={"title"}>
                    Add {this.props.elementType}
                </DialogTitle>
                <DialogContent key={"content"} style={{overflow: "hidden"}}>
                    <TextField size={"small"}
                               fullWidth={true}
                               id="Title"
                               label="Title"
                               value={this.state.title}
                               variant={"outlined"}
                               onChange={(event) => this.changeTitle(event.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary"
                            onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button autoFocus
                            disabled={this.state.title === ''}
                            color="primary"
                            onClick={() => this.props.onSave(this.state.title)}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
