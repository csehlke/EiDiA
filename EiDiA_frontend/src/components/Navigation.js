import React from 'react';
import clsx from 'clsx';
import {AppBar, CssBaseline, Drawer, makeStyles, Toolbar, Typography} from '@material-ui/core';
import {Link} from "react-router-dom";
import logo from "../assets/logo.png";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";
import UserService from "../services/UserService";

// code taken from https://material-ui.com/components/drawers/#mini-variant-drawer

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "#DADADA",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        minHeight: 64,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
        color: "black"
    },
    logo: {
        margin: "1em",
        height: "2em"
    }
}));

export default function Navigation(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar disableGutters={true}>
                    <Link to={'/'}>
                        <img
                            className={classes.logo}
                            src={logo}
                            alt="EiDiA Logo"
                        />
                    </Link>
                    <Typography variant="h4" align="center" className={classes.title}>
                        {props.title}
                    </Typography>
                    {UserService.isAuthenticated() ?
                        <UserMenu/> :
                        <div style={{width: '3em'}}/>/*3em als  Ausgleich, damit der Titel noch in der Mitte bleibt*/}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <div className={classes.toolbar}/>
                <Sidebar/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {props.children}
            </main>
        </div>
    );
}
