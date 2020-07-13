import React from 'react';
import {List, Typography} from '@material-ui/core';
import {BASE_URL, endpoints} from '../../../support files/constants';
import TemplateListItem from './TemplateListItem';

export default class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateList: [],
            selectedIndex: 0
        }
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.fetchTemplates = this.fetchTemplates.bind(this);
    }

    componentDidMount() {
        this.fetchTemplates()
    }

    fetchTemplates() {
        let newState = this.state;
        fetch(BASE_URL + endpoints.getTemplateList)
            .then(res => res.json())
            .then(
                (result) => {
                    newState.templateList = result.response;
                    this.setState(newState);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    handleListItemClick(value, index) {
        let newState = this.state;
        let template_id = this.state.templateList[index]["id"]
        newState.selectedIndex = index;
        this.setState(newState);
        this.props.onAction1(value, template_id);
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
                            onAction={this.handleListItemClick}
                        />
                    )}

                </List>
            </div>
        );
    }
}
