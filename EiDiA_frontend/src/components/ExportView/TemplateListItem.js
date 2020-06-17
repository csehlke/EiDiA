import React from 'react';
import {ListItem, ListItemText} from '@material-ui/core';


export default class TemplateListItem extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.index = this.props.index;
        this.text = this.props.text;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onAction(this.id, this.index);
    }


    render() {
        return(
            <ListItem
                style={{height: 20}}
                button
                selected={this.props.isSelected}
                onClick={this.handleClick}
            >
                <ListItemText primary={this.text}/>
            </ListItem>
        )
    }
}