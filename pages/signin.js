import React from "react";
import Router from "next/router";

import Button from "@material-ui/core/Button";
import { AppWithAuthentication } from "../src/components/App";
import { auth, provider } from "../src/firebase/firebase";
import { db } from "../src/firebase";
import * as routes from "../src/constants/routes";

const SignInPage = () => (
  <AppWithAuthentication>
    <h1>Sign In</h1>
    <p>Earning points is just a click away</p>
    <p>This website uses cookies. Please enable cookies in order to sign in</p>
    <SignInForm />
  </AppWithAuthentication>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  user: null,
  error: null
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    if (auth.currentUser) {
      console.log(`already signed in`);
      Router.push(routes.HOME);
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);

        // add them to the db and then redirect
        db.doCreateUser(
          user.uid,
          user.email,
          user.displayName,
          user.photoURL,
          false
        )
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            Router.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName("error", error));
          });
      } else {
        console.log(`No active user found. User must log in`);
      }
    });
  }

  onClick = () => {
    auth.signInWithRedirect(provider);
  };

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.onClick}>
        Sign In with Google
      </Button>
    );
  }
}

export default SignInPage;

export { SignInForm };
