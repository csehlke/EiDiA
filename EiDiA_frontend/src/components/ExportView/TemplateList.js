import React from 'react';
import { List, Typography } from '@material-ui/core';
import TemplateListItem from './TemplateListItem';

export default class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [0, 1, 2],
            selectedIndex: 0
        }
        this.handleListItemclick = this.handleListItemclick.bind(this);
    }

    handleListItemclick(value, index) {
        var newState = this.state;
        newState.selectedIndex = index;
        this.setState(newState);
        this.props.onAction1(value);

    }

    render() {
        const items = this.state.data
        return(
            <div>
                <Typography variant="subtitle2">
                    Templates
                </Typography>
                <List dense={true}>
                    {items.map((i) => 
                        <TemplateListItem 
                            key={i}
                            text={"Template " + i}
                            id={"Template" + i}
                            index={i}
                            isSelected={this.state.selectedIndex === i}
                            onAction={this.handleListItemclick}
                    />
                    )}
                    
                </List>
            </div>
        );
    }

}