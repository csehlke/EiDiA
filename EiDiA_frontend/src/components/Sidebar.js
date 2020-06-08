"use strict";

import React from 'react';

import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import StorageIcon from '@material-ui/icons/Storage';
import NewFile from "../assets/NewFile";
import {Link} from "./Link";


export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List>
                <Link to={'/'}>
                    <ListItem button key={"Home"}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                </Link>
                <Link to={'/browse'}>
                    <ListItem button key={"Browse"}>
                        <ListItemIcon><StorageIcon/></ListItemIcon>
                        <ListItemText primary={"Browse"}/>
                    </ListItem>
                </Link>
                <Link to={'/search'}>
                    <ListItem button key={"Search"}>
                        <ListItemIcon><SearchIcon/></ListItemIcon>
                        <ListItemText primary={"Search"}/>
                    </ListItem>
                </Link>
                <Link to={'/upload'}>
                    <ListItem button key={"UploadDocument"}>
                        <ListItemIcon><CloudUploadIcon/></ListItemIcon>
                        <ListItemText primary={"Upload Document"}/>
                    </ListItem>
                </Link>
                <Link to={'/create'}>
                    <ListItem button key={"CreateDocument"}>
                        <ListItemIcon><NewFile/></ListItemIcon>
                        <ListItemText primary={"Create Document"}/>
                    </ListItem>
                </Link>
            </List>
        );
    }
}
