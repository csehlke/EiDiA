import {IconButton, Menu, MenuItem} from "@material-ui/core";
import React from "react";
import {MdAccountCircle} from "react-icons/all";
import {Link} from "./Link";
import UserService from "../services/UserService";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        UserService.logout().then((response) => {
            console.log(response)
        }).catch((e) => {
            console.error(e);
        });
        setAnchorEl(null);
    };

    return (

        <div>
            <IconButton onClick={handleMenu}
                        color="default">
                <MdAccountCircle color="#FFFFFF"/>
            </IconButton>
            <Menu id="menu-appbar"
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
                  onClose={handleClose}>
                {UserService.isAdmin() ?
                    <Link to={'/admin'}>
                        <MenuItem onClick={handleClose}>User Administration</MenuItem>
                    </Link> :
                    ''}
                <Link to={'/settings'}>
                    <MenuItem onClick={handleClose}>My Account</MenuItem>
                </Link>
                <Link to={'/help'}>
                    <MenuItem onClick={handleClose}>Help</MenuItem>
                </Link>
                <Link to={'/login'}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Link>
            </Menu>
        </div>
    );
}

export default UserMenu;
