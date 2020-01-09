import React from "react";
import { connect } from "react-redux";
import Router from "next/router";

import { Button } from "@material-ui/core";

import * as routes from "../src/constants/routes";
import { AppWithAuthentication } from "../src/components/App";

const LandingPage = ({ authUser }) => (
  <AppWithAuthentication>
    <h1>Welcome</h1>
    <p>
      Points mean prizes here at nextjswebsite, so why not check out some of our
      offer walls.
    </p>
    {!authUser && (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          Router.push(routes.SIGN_IN);
        }}
      >
        Sign in to start earning
      </Button>
    )}

    {authUser && (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          Router.push(routes.EARN);
        }}
      >
        Start earning
      </Button>
    )}
  </AppWithAuthentication>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(LandingPage);
