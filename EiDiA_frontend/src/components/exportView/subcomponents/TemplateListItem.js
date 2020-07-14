import React from 'react';
import {ListItem, ListItemText} from '@material-ui/core';


export default class TemplateListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onAction(this.props.text, this.props.index);
    }

    render() {
        return (
            <ListItem
                style={{height: 20}}
                button
                selected={this.props.isSelected}
                onClick={this.handleClick}
            >
                <ListItemText primary={this.props.text}/>
            </ListItem>
        )
    }
}
