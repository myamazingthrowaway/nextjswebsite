import React from "react";
import Router from "next/router";

import { firebase } from "../../firebase";
import * as routes from "../../constants/routes";

const withAuthorisation = needsAuthorization => Component => {
  class withAuthorisation extends React.Component {
    componentDidMount() {
      this.unsubscribeFirebase = firebase.auth.onAuthStateChanged(authUser => {
        if (!authUser && needsAuthorization) {
          Router.push(routes.SIGN_IN);
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribeFirebase();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return withAuthorisation;
};

export default withAuthorisation;
