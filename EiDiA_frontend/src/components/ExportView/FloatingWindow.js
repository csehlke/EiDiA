import React from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';


export default class FloatingWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Dialog id="temp" aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                ALOHA
          </Dialog>       
        );
    }
}