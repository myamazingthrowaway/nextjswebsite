import React from "react";

import { AppWithAuthorisation } from "../src/components/App";
import { Card } from "../src/components";

class EarnPage extends React.Component {
  render() {
    return (
      <AppWithAuthorisation>
        <h1>Earn</h1>
        <Card />
      </AppWithAuthorisation>
    );
  }
}

export default EarnPage;
