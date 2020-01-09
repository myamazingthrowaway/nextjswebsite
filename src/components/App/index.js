import React from "react";
import { compose } from "recompose";

import withAuthentication from "../Session/withAuthentication";
import withAuthorisation from "../Session/withAuthorisation";

const App = ({ children }) => (
  <div className="app">
    {children}
  </div>
);

const AppWithAuthentication = compose(
  withAuthentication,
  withAuthorisation(false)
)(App);

const AppWithAuthorisation = compose(
  withAuthentication,
  withAuthorisation(true)
)(App);

export { AppWithAuthentication, AppWithAuthorisation };
