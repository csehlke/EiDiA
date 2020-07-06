"use strict";

import React from 'react';
import {AppBar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({  //Elemente stylen
    root: {
        position: "relative",
    },
    toolBar: {
        background: "#DADADA",
        align: "top",
        minHeight: "10px"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        color: "black",
        background: "#b0b0b0",
        //boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.75)"
    },
    titleUnselect: {
        flexGrow: 1,
        color: "gray",
    },
    
    }
));

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
                <Toolbar disableGutters={true} className={classes.toolBar}>
                    <Typography variant="subtitle1" align="center" className={props.title == "Select Template" ? classes.title : classes.titleUnselect}>
                        <div onClick={() => props.changeView("Select Template")}>Select Template</div>
                    </Typography>
                    <Typography variant="subtitle1" align="center" className={props.title == "Edit Template" ? classes.title : classes.titleUnselect}>
                        <div onClick={() => props.changeView("Edit Template")}>Edit Template</div>
                    </Typography>
                    <Typography variant="subtitle1" align="center" className={props.title == "Edit" ? classes.title : classes.titleUnselect}>
                        <div onClick={() => props.changeView("Edit")}>Edit</div>
                    </Typography> 
                </Toolbar>
        </div>
    );
}
export default MenuAppBar
