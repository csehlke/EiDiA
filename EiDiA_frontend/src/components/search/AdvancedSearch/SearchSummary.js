"use strict";

import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {IoIosArrowBack, IoIosArrowDown, RiDeleteBinLine} from "react-icons/all";

const ListItemTextSmall = styled(ListItemText)`
    font-size: 0.75em;
    line-height: 2em;
`;

const ListItemSmall = styled(ListItem)`
    padding-top: 1px;
    padding-bottom: 1px;
`;

const ListItemIndent = styled(ListItemSmall)`
    padding-left: 2.5em;
`;

const Background = styled(Paper)`
    max-height: 14em;
    min-height: 14em;
    overflow: auto;
    border-color: rgba(0, 0, 0, 0.26);
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    margin: 0.5em;
`;

const ListHeader = styled(ListSubheader)`
    font-size: 0.75em;
    background-color: #EDEDED;
    line-height: 3em;
`;

export default class SearchSummary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notOpen: [],
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleOpen(element) {
        let open = this.state.notOpen;
        const index = open.indexOf(element);
        if (index > -1) {
            open.splice(index, 1);
        } else {
            open.push(element);
        }
        this.setState({
            notOpen: open,
        });
    }

    handleDelete(element) {

    }

    renderListItem(TypeConstraint, index, indent) {
        if (TypeConstraint.attributeTypeConstraints) {
            return (
                <div key={index + '-'}>
                    <ListItemSmall button
                                   key={index}
                                   onClick={() => this.handleOpen(index)}>
                        <ListItemTextSmall primary={TypeConstraint.name} />
                        {!this.state.notOpen.includes(index) ? <IoIosArrowDown/> : <IoIosArrowBack/>}
                    </ListItemSmall>
                    <Collapse in={!this.state.notOpen.includes(index)}>
                        <List component="div" disablePadding>
                            {TypeConstraint.attributeTypeConstraints.map((attributeTypeConstraint, childIndex) =>
                                this.renderListItem(attributeTypeConstraint, index + '-' + childIndex, true))}
                        </List>
                    </Collapse>
                </div>
            );
        } else if (indent) {
            return (
                <ListItemIndent button key={index}>
                    <ListItemTextSmall primary={TypeConstraint.name} />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => this.props.handleDelete(TypeConstraint)}>
                            <RiDeleteBinLine/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItemIndent>
            );
        } else {
            return (
                <ListItemSmall button key={index}>
                    <ListItemTextSmall primary={TypeConstraint.name} />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => this.props.handleDelete(TypeConstraint)}>
                            <RiDeleteBinLine/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItemSmall>
            );
        }
    }

    render() {
        return (
            <Background elevation={0}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListHeader component="div" id="nested-list-subheader">
                            Search Constraints Summary
                        </ListHeader>
                    }>
                    {this.props.documentTypeConstraints.map((documentTypeConstraint, index) =>
                        this.renderListItem(documentTypeConstraint, index, false))}
                </List>
            </Background>
        );
    }
}
