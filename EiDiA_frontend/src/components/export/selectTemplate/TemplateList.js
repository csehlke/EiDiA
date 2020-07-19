import React from 'react';
import {List, Typography} from '@material-ui/core';
import ExportService from '../../../services/ExportService';
import TemplateListItem from './TemplateListItem';
import {v4 as uuidv4} from 'uuid';

export default class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateList: [],
            selectedIndex: 0 // index of marked/selected template
        }
        this.handleListItemClick = this.handleListItemClick.bind(this);
    }

    componentDidMount() {
        let newState = this.state;
        ExportService.getAllTemplates().then((data) => {
            newState.templateList = data.exportTemplates;
            this.setState(newState);
        }).catch(error => console.log(error));
    }


    handleListItemClick(value, index) {
        let newState = this.state;
        let template_id = this.state.templateList[index]._id;
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
                            key={elem.id + uuidv4()}
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
