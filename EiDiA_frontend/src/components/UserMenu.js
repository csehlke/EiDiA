import {IconButton, Menu, MenuItem} from "@material-ui/core";
import React from "react";
import {MdAccountCircle} from "react-icons/all";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <div>
            <IconButton
                onClick={handleMenu}
                color="default"
            >
                <MdAccountCircle/>
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
    );
}

export default UserMenu;
