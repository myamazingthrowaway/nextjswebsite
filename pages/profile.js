import React from "react";
import { connect } from "react-redux";

import { AppWithAuthorisation } from "../src/components/App";

const ProfilePage = ({ authUser }) => {
  return (
    <AppWithAuthorisation>
      <h1>{authUser ? authUser.displayName : null}</h1>
      {authUser ? (
        <>
          <p>
            Email: <b>{authUser.email}</b>
          </p>
          <p>
            Wallet: <b>10 Credits</b>
          </p>
          <p>
            Total Earned: <b>10 Credits</b>
          </p>
        </>
      ) : null}
    </AppWithAuthorisation>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(ProfilePage);
