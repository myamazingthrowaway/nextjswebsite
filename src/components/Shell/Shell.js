import React from "react";
import Router from "next/router";
import { connect } from "react-redux";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from "@material-ui/core";
import { ProfileIcon } from "../index";

import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import MenuIcon from "@material-ui/icons/Menu";

import { makeStyles } from "@material-ui/core/styles";

import * as routes from "../../constants/routes";
import { auth } from "../../firebase/firebase";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  root: {
    display: "flex"
  },
  container: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  appBar: {
    background: "linear-gradient(45deg,  #FF8E53 30%, #ff4d73 90%)",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  logoContainer: {
    background: "linear-gradient(45deg, #ff4d73 30%, #FF8E53 90%)",
    justifyContent: "center",
    flexDirection: "column",
    height: "15rem"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  rightAlign: {
    marginLeft: "auto",
    marginRight: -12,
    cursor: "pointer"
  },
  hoverCursor: {
    cursor: "pointer"
  }
}));

const Shell = ({ children, authUser }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleGoToEarnPage = () => {
    Router.push(routes.EARN);
    if (mobileOpen) handleDrawerToggle();
  };

  const handleGoToSignInPage = () => {
    Router.push(routes.SIGN_IN);
    if (mobileOpen) handleDrawerToggle();
  };

  const handleGoToWithdrawPage = () => {
    Router.push(routes.WITHDRAW);
    if (mobileOpen) handleDrawerToggle();
  };

  const handleGoToProfilePage = () => {
    Router.push(routes.PROFILE);
    if (mobileOpen) handleDrawerToggle();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleGoToHomePage = () => {
    Router.push(routes.LANDING);
    if (mobileOpen) handleDrawerToggle();
  };

  const handleSignOut = () => {
    auth.signOut();
    if (mobileOpen) handleDrawerToggle();
  };

  const drawer = (
    <>
      <AppBar position="static">
        <Toolbar className={classes.logoContainer}>
          <img
            src="/images/logo/dog.png"
            alt="nextjswebsite logo"
            height="120rem"
            onClick={handleGoToHomePage}
            className={classes.hoverCursor}
          />
        </Toolbar>
      </AppBar>

      <List>
        <ListItem button key="Earn" href="/earn" onClick={handleGoToEarnPage}>
          <ListItemIcon>
            <MonetizationOnOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Earn" />
        </ListItem>

        <ListItem
          button
          key="Withdraw"
          href="/withdraw"
          onClick={handleGoToWithdrawPage}
        >
          <ListItemIcon>
            <AccountBalanceWalletRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Withdraw" />
        </ListItem>

        <Divider variant="middle" />
        {!authUser && (
          <List>
            <ListItem
              button
              key="Sign In"
              href="/signin"
              onClick={handleGoToSignInPage}
            >
              <ListItemIcon>
                <VpnKeyRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          </List>
        )}

        {authUser && (
          <List>
            <ListItem
              button
              key="Profile"
              href="/profile"
              onClick={handleGoToProfilePage}
            >
              <ListItemIcon>
                <AccountBoxRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem button key="Sign Out" onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        )}
      </List>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.rightAlign}>
            {authUser && <ProfileIcon className={classes.hoverCursor} />}
            {!authUser && (
              <Button color="inherit" onClick={handleGoToSignInPage}>
                Sign In
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="sidebar">
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={classes.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Shell);
