import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton'
import {MdAdd, MdRemove} from "react-icons/all";

export default class DocListItem extends React.Component {
    constructor(props) {
        super(props);
        this.addToList = this.addToList.bind(this);
    }

    addToList() {
        this.props.onSelect({name: this.props.name, id: this.props.id});
    }

    render() {
        return (
            <ListItem>
                <ListItemText
                    primary={this.props.name}
                />
                <ListItemSecondaryAction>
                    {this.props.removable ?
                        <IconButton edge="end" onClick={this.addToList}>
                            <MdRemove/>
                        </IconButton> :
                        <IconButton edge="end" onClick={this.addToList}>
                            <MdAdd/>
                        </IconButton>}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}
