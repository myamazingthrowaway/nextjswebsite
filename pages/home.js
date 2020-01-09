import React from "react";
import { connect } from "react-redux";

import { AppWithAuthorisation } from "../src/components/App";
class HomePage extends React.Component {
  render() {
    return (
      <AppWithAuthorisation>
        <h1>Home</h1>
        <p>
          Welcome back. Take a look at our offer walls to earn credit points.
        </p>
      </AppWithAuthorisation>
    );
  }
}

export default HomePage;
