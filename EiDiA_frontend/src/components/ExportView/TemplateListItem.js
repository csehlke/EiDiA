import React from 'react';
import {ListItem, ListItemText} from '@material-ui/core';


export default class TemplateListItem extends React.Component {
    constructor(props) {
        super(props);
        this.text = this.props.text;
    }

    render() {
        return(
            <ListItem
                style={{height: 20}}
                button
                selected={this.props.isSelected}
                onClick={this.props.onAction}
            >
                <ListItemText primary={this.text}/>
            </ListItem>
        )
    }
}