"use strict";

import React from 'react';

import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import NewFileIcon from "../assets/NewFileIcon";
import {Link} from "./Link";
import {AiOutlineSearch, FaCloudUploadAlt, FaHome, FiHardDrive} from "react-icons/all";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const StyledListIcon = styled(ListItemIcon)`
    font-size: 1.75em;
`;

const styles = theme => ({
    selected: {
        color: theme.palette.primary.main, // see index.js
    },
    unselected: {
        color: theme.palette.sidebarIconUnselected.main,
    },
});

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    sidebarEntries = {
        HOME: 'Home',
        BROWSE: 'Browse',
        SEARCH: 'Search',
        UPLOAD_DOCUMENT: 'UploadDocument',
        CREATE_DOCUMENT: 'CreateDocument',
    }

    render() {
        const {classes} = this.props;

        let activePath = '';
        const path = this.props.location.pathname;
        if (path === '/') {
            activePath = this.sidebarEntries.HOME;
        } else if (path.startsWith('/browse') || path.startsWith('/record')) {
            activePath = this.sidebarEntries.BROWSE;
        } else if (path.startsWith('/search')) {
            activePath = this.sidebarEntries.SEARCH;
        } else if (path.startsWith('/upload')) {
            activePath = this.sidebarEntries.UPLOAD_DOCUMENT;
        } else if (path.startsWith('/export')) {
            activePath = this.sidebarEntries.CREATE_DOCUMENT;
        }

        return (
            <List>
                <Link to={'/'}>
                    <ListItem button key={this.sidebarEntries.HOME}
                              selected={activePath === this.sidebarEntries.HOME}>
                        <StyledListIcon
                            className={activePath === this.sidebarEntries.HOME ? classes.selected : classes.unselected}>
                            <FaHome/>
                        </StyledListIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                </Link>
                <Link to={'/browse'}>
                    <ListItem button key={this.sidebarEntries.BROWSE}
                              selected={activePath === this.sidebarEntries.BROWSE}>
                        <StyledListIcon
                            className={activePath === this.sidebarEntries.BROWSE ? classes.selected : classes.unselected}>
                            <FiHardDrive/>
                        </StyledListIcon>
                        <ListItemText primary={"Browse"}/>
                    </ListItem>
                </Link>
                <Link to={'/search'}>
                    <ListItem button key={this.sidebarEntries.SEARCH}
                              selected={activePath === this.sidebarEntries.SEARCH}>
                        <StyledListIcon
                            className={activePath === this.sidebarEntries.SEARCH ? classes.selected : classes.unselected}>
                            <AiOutlineSearch/>
                        </StyledListIcon>
                        <ListItemText primary={"Search"}/>
                    </ListItem>
                </Link>
                <Link to={'/upload'}>
                    <ListItem button key={this.sidebarEntries.UPLOAD_DOCUMENT}
                              selected={activePath === this.sidebarEntries.UPLOAD_DOCUMENT}>
                        <StyledListIcon
                            className={activePath === this.sidebarEntries.UPLOAD_DOCUMENT ? classes.selected : classes.unselected}>
                            <FaCloudUploadAlt/>
                        </StyledListIcon>
                        <ListItemText primary={"Upload Document"}/>
                    </ListItem>
                </Link>
                <Link to={'/export'}>
                    <ListItem button key={this.sidebarEntries.CREATE_DOCUMENT}
                              selected={activePath === this.sidebarEntries.CREATE_DOCUMENT}>
                        <StyledListIcon
                            className={activePath === this.sidebarEntries.CREATE_DOCUMENT ? classes.selected : classes.unselected}>
                            <NewFileIcon/>
                        </StyledListIcon>
                        <ListItemText primary={"Create Document"}/>
                    </ListItem>
                </Link>
            </List>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Sidebar));
