"use strict";

import React from 'react';
import {AppBar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {Link} from "react-router-dom";

import logo from "../assets/logo.png"

// SIEHE: https://material-ui.com/components/app-bar/

const useStyles = makeStyles(theme => ({  //Elemente stylen
    root: {
        flexGrow: 1,
    },
    appBar: {
        background: "#DADADA",
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        color: "black"
    },
    titleUnselect: {
flexGrow: 1,
        color: "gray"
    },
    logo: {
        margin: "1em",
        height: "2em"
    }
}));

const MenuAppBar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar disableGutters={true}>
                    <Link to={'/'}>
                        <img
                            className={classes.logo}
                            src={logo}
                            alt="EiDiA Logo"
                        />
                    </Link>
                    <Typography variant="h4" align="center" className={props.title == "Select Template" ? classes.title : classes.titleUnselect}>
                        <div onClick={() => props.changeView("Select Template")}>Select Template</div>
                    </Typography>
                    <Typography variant="h4" align="center" className={props.title == "Edit Template" ? classes.title : classes.titleUnselect}>
                        <div onClick={() => props.changeView("Edit Template")}>Edit Template</div>
                    </Typography>
                    <Typography variant="h4" align="center" className={props.title == "Edit" ? classes.title : classes.titleUnselect}>
                    <div onClick={() => props.changeView("Edit")}>Edit</div>
                    </Typography>
                    <div>
                        <IconButton
                            onClick={handleMenu}
                            color="default"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>User Account</MenuItem>
                            <MenuItem onClick={handleClose}>Help</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default MenuAppBar
