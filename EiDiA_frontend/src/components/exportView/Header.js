"use strict";

import React from 'react';
import {makeStyles, Toolbar, Typography} from "@material-ui/core";
import {pageNames} from "../../support files/constants";

const useStyles = makeStyles(() => ({
        root: {
            position: "relative",
        },
        toolBar: {
            background: "#DADADA",
            align: "top",
            minHeight: "10px"
        },
        title: {
            flexGrow: 1,
            color: "black",
            background: "#b0b0b0",
        },
        titleUnselect: {
            flexGrow: 1,
            color: "gray",
        },

    }
));

const MenuAppBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Toolbar disableGutters={true} className={classes.toolBar}>
                <Typography variant="subtitle1" align="center"
                            className={props.title === pageNames.selectTemplate ? classes.title : classes.titleUnselect}
                            onClick={() => props.changeView(pageNames.selectTemplate)}
                >
                    Select Template
                </Typography>
                <Typography variant="subtitle1" align="center"
                            className={props.title === pageNames.editTemplate ? classes.title : classes.titleUnselect}
                            onClick={() => props.changeView(pageNames.editTemplate)}
                >
                    Edit Template
                </Typography>
                <Typography variant="subtitle1" align="center"
                            className={props.title === pageNames.edit ? classes.title : classes.titleUnselect}
                            onClick={() => props.changeView(pageNames.edit)}
                >
                    Edit
                </Typography>
            </Toolbar>
        </div>
    );
}

export default MenuAppBar;
