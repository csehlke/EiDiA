import React from 'react';
import {List, Typography} from '@material-ui/core';
import {endpoints} from '../../../support files/constants';
import HttpService from "../../../services/HttpService";
import TemplateListItem from './TemplateListItem';

export default class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateList: [],
            selectedIndex: 0 // index of marked/selected template
        }
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.fetchTemplates = this.fetchTemplates.bind(this);
    }

    componentDidMount() {
        this.fetchTemplates()
    }

    fetchTemplates() {
        let newState = this.state;
        HttpService.get(endpoints.getTemplateList, (resp) => {
                newState.templateList = resp.response;
                this.setState(newState);
            },
            (err) => {
                console.log(error);
            })
    }

    handleListItemClick(value, index) {
        let newState = this.state;
        let template_id = this.state.templateList[index].id;
        newState.selectedIndex = index;
        this.setState(newState);
        this.props.onAction1(value, template_id);
    }

    render() {
        const items = this.state.templateList;
        return (
            <div style={{margin: 10}}>
                <Typography variant="subtitle2">
                    Templates
                </Typography>
                <List dense={true}>
                    {items.map((elem, index) =>
                        <TemplateListItem
                            key={elem.id}
                            text={elem.name}
                            id={elem.id}
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
