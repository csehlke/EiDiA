import React from 'react';
import {List, Typography} from '@material-ui/core';
import {endpoints} from '../../../support files/constants';
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
        fetch("http://localhost:3000/" + endpoints.getTemplateList)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    newState.templateList = result;
                    this.setState(newState);
                },
                (error) => {
                    console.log(error);
                }
            )
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
                    {items.map((elem, index) =>
                        <TemplateListItem
                            key={elem["id"]}
                            text={elem["name"]}
                            id={elem["id"]}
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
