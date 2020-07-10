"use strict";

import React from 'react';

import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import NewFileIcon from "../assets/NewFileIcon";
import {Link} from "./Link";
import {AiOutlineSearch, FaCloudUploadAlt, FaHome, FiHardDrive} from "react-icons/all";
import styled from "styled-components";

const StyledListIcon = styled(ListItemIcon)`
    font-size: 1.75em;
`;

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List>
                <Link to={'/'} replace>
                    <ListItem button key={"Home"}>
                        <StyledListIcon><FaHome/></StyledListIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                </Link>
                <Link to={'/browse'} replace>
                    <ListItem button key={"Browse"}>
                        <StyledListIcon><FiHardDrive/></StyledListIcon>
                        <ListItemText primary={"Browse"}/>
                    </ListItem>
                </Link>
                <Link to={'/search'} replace>
                    <ListItem button key={"Search"}>
                        <StyledListIcon><AiOutlineSearch/></StyledListIcon>
                        <ListItemText primary={"Search"}/>
                    </ListItem>
                </Link>
                <Link to={'/upload'} replace>
                    <ListItem button key={"UploadDocument"}>
                        <StyledListIcon><FaCloudUploadAlt/></StyledListIcon>
                        <ListItemText primary={"Upload Document"}/>
                    </ListItem>
                </Link>
                <Link to={'/export'} replace>
                    <ListItem button key={"CreateDocument"}>
                        <StyledListIcon><NewFileIcon/></StyledListIcon>
                        <ListItemText primary={"Create Document"}/>
                    </ListItem>
                </Link>
            </List>
        );
    }
}
