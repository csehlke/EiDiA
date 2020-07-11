import React from 'react';
import {List, Typography} from '@material-ui/core';
import TemplateListItem from './TemplateListItem';

export default class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateList: [],
            selectedIndex: 0
        }
        this.handleListItemclick = this.handleListItemclick.bind(this);
        this.fetchTemplates = this.fetchTemplates.bind(this);
    }

    componentDidMount() {
        this.fetchTemplates()
    }

    fetchTemplates() {
        let newState = this.state;
        newState.templateList = ["Template 0", "Template 1", "Template 2"];
        this.setState(newState);
    }

    handleListItemclick(value, index) {
        let newState = this.state;
        newState.selectedIndex = index;
        this.setState(newState);
        this.props.onAction1(value);
    }

    render() {
        const items = this.state.templateList;
        return (
            <div>
                <Typography variant="subtitle2">
                    Templates
                </Typography>
                <List dense={true}>
                    {items.map((item, index) =>
                        <TemplateListItem
                            key={item}
                            text={item}
                            id={index}
                            index={index}
                            isSelected={this.state.selectedIndex === index}
                            onAction={this.handleListItemclick}
                        />
                    )}

                </List>
            </div>
        );
    }
}
