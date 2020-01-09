import React from "react";
import Router from "next/router";

import { withStyles } from "@material-ui/core/styles";
import { Badge, Avatar, MenuItem, Menu } from "@material-ui/core";

import * as routes from "../../constants/routes";
import { auth } from "../../firebase/firebase";

const StyledProfileIcon = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid #44b700",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

const ProfileIcon = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToProfilePage = () => {
    setAnchorEl(null);
    Router.push(routes.PROFILE);
  };

  return (
    <>
      <StyledProfileIcon
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        variant="dot"
        onClick={handleMenu}
      >
        <Avatar alt="Stock avatar" src="/images/cards/hideout.jpg" />
      </StyledProfileIcon>
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
        <MenuItem onClick={handleGoToProfilePage}>Profile</MenuItem>
        <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileIcon;
