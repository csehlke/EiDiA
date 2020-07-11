import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton'
import {MdAdd} from "react-icons/all";

export default class DocListItem extends React.Component {
    constructor(props) {
        super(props);
        this.addToList = this.addToList.bind(this);
    }

    addToList() {
        const content = this.props.id;
        this.props.onSelect(content)
    }

    render() {
        return (
            <ListItem>
                <ListItemText
                    primary={this.props.id}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={this.addToList}>
                        <MdAdd/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}
