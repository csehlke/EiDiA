import React from 'react';
import {makeStyles, Toolbar, Typography} from "@material-ui/core";
import {pageNames} from "../../views/ExportView";

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
            color: "white",
            background: "#005e7c",
        },
        titleUnselect: {
            flexGrow: 1,
            color: "white",
            background: "#0094c6",
        },

    }
));

const ExportMenuBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Toolbar disableGutters={true} className={classes.toolBar}>
                <Typography variant="subtitle1" align="center"
                            className={props.title === pageNames.selectTemplate ? classes.title : classes.titleUnselect}
                            onClick={() => props.changeView(pageNames.selectTemplate)}
                >
                    {pageNames.selectTemplate}
                </Typography>
                <Typography variant="subtitle1" align="center"
                            className={props.title === pageNames.editTemplate ? classes.title : classes.titleUnselect}
                            onClick={() => props.changeView(pageNames.editTemplate)}
                >
                    {pageNames.editTemplate}
                </Typography>
                <Typography variant="subtitle1" align="center"
                            className={props.title === pageNames.edit ? classes.title : classes.titleUnselect}
                            onClick={() => props.changeView(pageNames.edit)}
                >
                    {pageNames.edit}
                </Typography>
            </Toolbar>
        </div>
    );
}

export default ExportMenuBar;
